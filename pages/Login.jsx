import React, { useEffect, useState } from "react";
import { View, TextInput, Text, Pressable, StyleSheet } from "react-native";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useToast } from "react-native-toast-notifications";
import { useForm } from "react-hook-form";
import { routes } from "../routes";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation }) => {
  const {
    handleSubmit,
    register,
    setValue,
    trigger,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  // Load saved credentials
  useEffect(() => {
    const loadCredentials = async () => {
      const savedEmail = await AsyncStorage.getItem("email");
      const savedPassword = await AsyncStorage.getItem("password");
      if (savedEmail) {
        setValue("email", savedEmail);
      }
      if (savedPassword) {
        setValue("password", savedPassword);
        setRememberMe(true); // Automatically check remember me if password is loaded
      }
    };
    loadCredentials();
  }, [setValue]);

  useEffect(() => {
    register("email", {
      required: "Email is required!",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Invalid email address!",
      },
    });
    register("password", {
      required: "You must specify a password!",
      minLength: {
        value: 8,
        message: "Password must be more than 8 characters!",
      },
      maxLength: {
        value: 16,
        message: "Password must be less than 17 characters!",
      },
      pattern: {
        value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
        message:
          "Password must contain at least one number, one special character, and one uppercase letter!",
      },
    });
  }, [register]);

  const submitHandler = async ({ email, password }) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);

      // Store credentials if Remember Me is checked
      if (rememberMe) {
        await AsyncStorage.setItem("email", email);
        await AsyncStorage.setItem("password", password);
      } else {
        // Remove credentials if Remember Me is unchecked
        await AsyncStorage.removeItem("email");
        await AsyncStorage.removeItem("password");
      }

      toast.show("Logged in successfully!", { type: "success" });
      setTimeout(() => navigation.navigate(routes.home), 1000);
    } catch (error) {
      console.error(error.message);
      toast.show("Login failed. Please check your credentials.", {
        type: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reserve Mate</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => {
          setValue("email", text);
          trigger("email");
        }}
        onBlur={() => trigger("email")}
        inputMode="email"
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => {
          setValue("password", text);
          trigger("password");
        }}
        onBlur={() => trigger("password")}
        secureTextEntry
      />
      {errors.password && (
        <Text style={styles.error}>{errors.password.message}</Text>
      )}

      <Pressable
        onPress={() => setRememberMe(!rememberMe)}
        style={styles.checkbox}
      >
        <Text>{rememberMe ? "✔️ Remember me" : "🔲 Remember me"}</Text>
      </Pressable>

      <Pressable
        onPress={handleSubmit(submitHandler)}
        style={[
          styles.button,

          !isValid || loading ? styles.disabledButton : {},
        ]}
        disabled={!isValid || loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Loading..." : "Log In"}
        </Text>
      </Pressable>

      <Pressable onPress={() => navigation.navigate(routes.signup)}>
        <Text style={styles.link}>New user?</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 30,
    textAlign: "center",
    marginBottom: 20,
    color: "#dfa974",
    fontWeight: "bold",
  },
  input: {
    height: 50,
    borderColor: "lightgray",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },

  error: {
    color: "red",
    marginBottom: 10,
  },
  checkbox: {
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
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  link: {
    color: "#dfa974",
    textAlign: "center",
    marginTop: 20,
  },
});

export default Login;
