import { createStackNavigator } from "@react-navigation/stack";
import Home from "./Home";
import Login from "./Login";
import SignUp from "./SignUp";
import HotelsPage from "./HotelsPage";
import HotelDetails from "./HotelDetails";
import { routes } from "../routes";
import Reviews from "./Reviews";

const Stack = createStackNavigator();

export function MyStack() {
  return (
    <Stack.Navigator initialRouteName={routes.login}>
      <Stack.Screen name={routes.login} component={Login} />
      <Stack.Screen name={routes.signup} component={SignUp} />
      <Stack.Screen name={routes.home} component={Home} />
      <Stack.Screen name={routes.hotelsPage} component={HotelsPage} />
      <Stack.Screen name={routes.hotelDetails} component={HotelDetails} />
      <Stack.Screen name={routes.reviews} component={Reviews} />
    </Stack.Navigator>
  );
}
