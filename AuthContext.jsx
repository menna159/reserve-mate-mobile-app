import React, { useState, useEffect } from "react";
import { auth, db } from "./firebase"; // Ensure your import paths are correct
import { doc, getDoc } from "firebase/firestore";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserData = async (user) => {
    if (user) {
      setCurrentUser(user);
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
      } else {
        console.log("User document does not exist");
        setUserDetails(null); // Clear userDetails if document doesn't exist
      }
    } else {
      console.log("User is not logged in");
      setUserDetails(null); // Clear userDetails if no user is logged in
    }
    setIsLoading(false); // Set loading to false once the data is fetched
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(fetchUserData);
    return () => unsubscribe(); // Clean up subscription on unmount
  }, []);

  const value = { userDetails, currentUser, isLoading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
