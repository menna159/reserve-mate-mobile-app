import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { routes } from '../../../routes';
import Home from '../../Home';
const Tab = createBottomTabNavigator();
import { Ionicons } from '@expo/vector-icons';
import AboutUsPage from '../About us/aboutus';
import { styles } from './BottomNavigation.module';
import HotelsPage from '../../HotelsPage';
import Profile from '../../Profile';
import ContactUsPage from '../../Contact-us/ContactUs';
import MyBooking from '../../myBooking';
function MyTabs() {
  return (
    <Tab.Navigator initialRouteName={routes.login} screenOptions={{headerShown:false,
      tabBarStyle: styles.tabBar,
      tabBarLabelStyle:{
        fontSize:10,
        fontWeight:'bold',
      },
    }}>
      <Tab.Screen name="HomeTap"component={Home}   options={{
      tabBarLabel: 'Home',
     
      tabBarIcon: ({  color,size }) => (
        <Ionicons name="home-outline" color={color} size={size} />
      ),
      tabBarActiveTintColor:"#dfa974"
    }}/>
      <Tab.Screen name={routes.profile} component={Profile} 
      
      options={{
       tabBarLabel: 'Profile',
       tabBarIcon: ({  color,size }) => (
           <Ionicons name="person-outline" color={color} size={size} />
       ),
       tabBarActiveTintColor:"#dfa974"
     }}
     />
     <Tab.Screen name={routes.myBooking} component={MyBooking} 
      
      options={{
       tabBarLabel: 'Bookings',
       tabBarIcon: ({  color,size }) => (
           <Ionicons name="calendar-outline" color={color} size={size} />
       ),
       tabBarActiveTintColor:"#dfa974"
     }}
     />
      <Tab.Screen name={routes.hotelsPage} component={HotelsPage} 
      options={{
      tabBarLabel: 'Hotels',
      tabBarIcon: ({ color,size }) => (
        <Ionicons name="business" color={color} size={size}/>
      ),
      tabBarActiveTintColor:"#dfa974"
    }}
      />
      <Tab.Screen name={routes.contactUs} component={ContactUsPage}
      options={{
        tabBarLabel: 'Contact Us',
        tabBarIcon: ({  color,size }) => (
          <Ionicons name="chatbubble-ellipses-outline" color={color} size={size} />
        ),
        tabBarActiveTintColor:"#dfa974"
      }}/>
      <Tab.Screen name={routes.aboutUs} component={AboutUsPage} 
      
       options={{
        tabBarLabel: 'About Us',
        tabBarIcon: ({  color,size }) => (
            <Ionicons name="information-circle-outline" color={color} size={size} />
        ),
        tabBarActiveTintColor:"#dfa974"
      }}
      />
     
    </Tab.Navigator>
  );
}

export default MyTabs;