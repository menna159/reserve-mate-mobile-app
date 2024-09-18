import React from "react";
import { NavigationContainer } from "@react-navigation/native"; // Missing import for NavigationContainer
import { MyStack } from "./pages/StackNavigator"; // Ensure MyStack is defined and correctly imported
import { ToastProvider } from "react-native-toast-notifications";

const App = () => {
  return (
    <NavigationContainer>
      <ToastProvider>
        <MyStack />
      </ToastProvider>
    </NavigationContainer>
  );
};

export default App;
