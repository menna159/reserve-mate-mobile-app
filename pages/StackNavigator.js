import { createStackNavigator } from "@react-navigation/stack";
import Login from "./Login";
import AboutUsPage from "./components/About us/aboutus";
import MyTabs from "./components/BottomNavigation/BottomTapNavigation";
import Home from "./Home";
import SignUp from "./SignUp";
import HotelsPage from "./HotelsPage";
import HotelDetails from "./HotelDetails";
import { routes } from "../routes";
import Reviews from "./Reviews";
import Profile from "./Profile";
import RoomsPage from './RoomsPage';

const Stack = createStackNavigator();

export function MyStack() {
  return (
    <Stack.Navigator initialRouteName={routes.login}>
      {/* Login and Signup screens */}
      <Stack.Screen
        name={routes.login}
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen name={routes.signup} component={SignUp} />

      {/* Home and other pages */}
      <Stack.Screen
        name={routes.home}
        component={MyTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen name={routes.hotelsPage} component={HotelsPage} />
      <Stack.Screen name={routes.hotelDetails} component={HotelDetails} />
      <Stack.Screen name={routes.reviews} component={Reviews} />
      <Stack.Screen name={routes.aboutUs} component={AboutUsPage} />
      <Stack.Screen name={routes.profile} component={Profile} />
      <Stack.Screen name={routes.roomsPage} component={RoomsPage} />
    </Stack.Navigator>
  );
}
