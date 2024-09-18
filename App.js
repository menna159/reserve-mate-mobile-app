import React from "react";
import { NavigationContainer } from "@react-navigation/native"; // Missing import for NavigationContainer
import { MyStack } from "./pages/StackNavigator"; // Ensure MyStack is defined and correctly imported

const App = () => {
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    );
};

export default App;
