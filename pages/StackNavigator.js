import { createStackNavigator } from "@react-navigation/stack";
import Home from "./Home";
import Login from "./Login";
import { routes } from "../routes";
import SignUp from "./SignUp";
const Stack = createStackNavigator();

export function MyStack() {
  return (
    <Stack.Navigator initialRouteName={routes.login}>
      <Stack.Screen name={routes.login} component={Login} />
      <Stack.Screen name={routes.signup} component={SignUp} />
      <Stack.Screen name={routes.home} component={Home} />
    </Stack.Navigator>
  );
}
