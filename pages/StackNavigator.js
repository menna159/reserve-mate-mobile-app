import { createStackNavigator } from '@react-navigation/stack';
import Login from './Login';
import { routes } from '../routes';
import AboutUsPage from './components/About us/aboutus';
import MyTabs from './components/BottomNavigation/BottomTapNavigation';
import Home from "./Home";
import SignUp from "./SignUp";
import HotelsPage from './HotelsPage';
import HotelDetails from './HotelDetails';
const Stack = createStackNavigator();

export function MyStack() {
  return (
    <Stack.Navigator >
       <Stack.Screen name="MyTaps" component={MyTabs} options={{ headerShown:false}}/>
      <Stack.Screen name={routes.login} component={Login} />
      <Stack.Screen name={routes.signup} component={SignUp} />
      <Stack.Screen name={routes.home} component={Home} />
      <Stack.Screen name={routes.hotelsPage} component={HotelsPage} />
      <Stack.Screen name={routes.hotelDetails} component={HotelDetails} />
      <Stack.Screen name={routes.aboutUs} component={AboutUsPage} />
    </Stack.Navigator>
  );
}
