import React from "react";
import { NavigationContainer } from "@react-navigation/native"; // Missing import for NavigationContainer
import { MyStack } from "./pages/StackNavigator"; // Ensure MyStack is defined and correctly imported
import { ToastProvider } from "react-native-toast-notifications";
// import { createStackNavigator } from "@react-navigation/stack";
import { AuthProvider } from "./AuthContext";
 

const App = () => {
  return (
   
    <NavigationContainer>
      <ToastProvider>
        <AuthProvider>
          <MyStack />
        </AuthProvider>
      </ToastProvider>
    </NavigationContainer>
     
  );
};

export default App;
