import React, { useState, useRef } from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useForm, Controller } from "react-hook-form";
import { auth, db } from "../firebase";
import {
  collection,
  getDocs,
  query,
  setDoc,
  where,
  doc,
} from "firebase/firestore";
import Toast from "react-native-toast-notifications";
import { routes } from "../routes";

const SignUp = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setError,
    getValues,
    clearErrors,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
  });

  const toast = useRef(null);

  const checkUsernameExists = async (username) => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("username", "==", username));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  };

  const validateUsername = async (username) => {
    if (username) {
      const exists = await checkUsernameExists(username);
      setError("name", {
        type: "manual",
        message: exists ? "Username is already taken." : undefined,
      });
    }
  };

  const onHandleSubmit = async (data) => {
    setLoading(true);

    // Check for validation errors
    const hasErrors = Object.keys(errors).length > 0;
    if (hasErrors) {
      toast.current.show("Please fill in all fields correctly!", {
        type: "danger",
      });
      setLoading(false);
      return;
    }

    try {
      const usernameExists = await checkUsernameExists(data.name);
      if (usernameExists) {
        toast.current.show("Username is already taken.", { type: "danger" });
        setLoading(false);
        return;
      }

      await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = auth.currentUser;
      if (user) {
        await setDoc(doc(db, "users", user.uid), {
          username: data.name,
          phoneNum: data.phoneNumber,
          userEmail: data.email,
        });
      }

      toast.current.show("User Registered Successfully!", { type: "success" });
      setTimeout(() => navigation.navigate(routes.login), 1000);
    } catch (error) {
      const errorMessage =
        error.code === "auth/email-already-in-use"
          ? "This email is already registered. Please log in instead."
          : error.message;

      toast.current.show(errorMessage, { type: "danger" });
    } finally {
      setLoading(false);
    }
  };

  const renderTextInput = (
    name,
    placeholder,
    rules,
    secureTextEntry = false
  ) => (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, onBlur, value } }) => (
        <>
          <TextInput
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            style={styles.input}
            onChangeText={(text) => {
              onChange(text);
              clearErrors(name); // Clear previous error messages

              // Custom validation logic
              if (rules?.required && !text.trim()) {
                setError(name, { type: "manual", message: rules.required });
              }

              if (rules?.minLength && text.length < rules.minLength.value) {
                setError(name, {
                  type: "manual",
                  message: rules.minLength.message,
                });
              }

              if (rules?.pattern) {
                const patternValid = rules.pattern.value.test(text);
                setError(name, {
                  type: "manual",
                  message: patternValid ? undefined : rules.pattern.message,
                });
              }

              if (name === "confirmPassword") {
                setError(name, {
                  type: "manual",
                  message:
                    text === getValues("password")
                      ? undefined
                      : "Passwords do not match!",
                });
              }
            }}
            onBlur={() => {
              if (rules?.required && !value.trim()) {
                setError(name, { type: "manual", message: rules.required });
              }
              if (name === "name") {
                validateUsername(value);
              }
              onBlur();
            }}
            value={value || ""}
          />
          {errors[name] && (
            <Text style={styles.error}>{errors[name].message}</Text>
          )}
        </>
      )}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reserve Mate</Text>

      {renderTextInput("name", "Name", {
        required: "Name is required!",
        minLength: {
          value: 3,
          message: "Name must contain 3 or more characters!",
        },
      })}
      {renderTextInput("email", "Email", {
        required: "Email is required!",
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: "Invalid email address!",
        },
      })}
      {renderTextInput("phoneNumber", "Phone", {
        required: "Phone number is required!",
        pattern: {
          value: /^01[0-5]\d{1,8}$/,
          message:
            "Phone number must start with '01' followed by a digit from 0 to 5!",
        },
      })}
      {renderTextInput(
        "password",
        "Password",
        {
          required: "You must specify a password!",
          pattern: {
            value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
            message:
              "Password must contain at least one number, one special character and one uppercase character!",
          },
          minLength: {
            value: 8,
            message: "Password must be at least 8 characters!",
          },
          maxLength: {
            value: 16,
            message: "Password must be less than 17 characters!",
          },
        },
        true
      )}
      {renderTextInput(
        "confirmPassword",
        "Confirm Password",
        {
          validate: (value) =>
            value === getValues("password") || "Passwords do not match!",
        },
        true
      )}

      <Pressable
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: pressed ? "#ddd" : "#2196F3" },
          isValid && !loading
            ? { pointerEvents: "auto" }
            : { pointerEvents: "none", backgroundColor: "#ccc" },
        ]}
        onPress={isValid && !loading ? handleSubmit(onHandleSubmit) : null}
      >
        <Text style={styles.buttonText}>
          {loading ? "Signing Up..." : "Sign Up"}
        </Text>
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate(routes.login)}
        // style={({ pressed }) => [styles.link, { opacity: pressed ? 0.7 : 1 }]}
      >
        <Text style={styles.link}>Already have an account?</Text>
      </Pressable>

      <Toast ref={toast} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    textAlign: "center",
    marginBottom: 20,
    color: "#dfa974",
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: "lightgray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  button: {
    // backgroundColor: "#007BFF",
    backgroundColor: "#dfa974",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  link: {
    color: "#dfa974",
    textAlign: "center",
    marginTop: 20,
  },
});

export default SignUp;
