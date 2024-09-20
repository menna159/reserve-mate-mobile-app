import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home';
import Login from './Login';
import { routes } from '../routes';
import AboutUsPage from './components/About us/aboutus';
import SliderSection from './components/HomeComponents/SliderSection';
import MyTabs from './components/BottomNavigation/BottomTapNavigation';
const Stack = createStackNavigator();

export function MyStack() {
  return (
    <Stack.Navigator >
       <Stack.Screen name="MyTaps" component={MyTabs} options={{ headerShown:false}}/>
      <Stack.Screen name={routes.login} component={Login} />
      <Stack.Screen name={routes.home} component={Home} options={{ headerShown: false }}/>
      <Stack.Screen name="Slider" component={SliderSection} />
      <Stack.Screen name={routes.aboutUs} component={AboutUsPage} />
    </Stack.Navigator>
  );
}