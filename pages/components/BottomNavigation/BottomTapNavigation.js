import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { routes } from '../../../routes';
import Home from '../../Home';
const Tab = createBottomTabNavigator();
import { Ionicons } from '@expo/vector-icons';
import AboutUsPage from '../About us/aboutus';
import { styles } from './BottomNavigation.module';
function MyTabs() {
  return (
    <Tab.Navigator initialRouteName={routes.home} screenOptions={{headerShown:false,
      tabBarStyle: styles.tabBar,
      tabBarLabelStyle:{
        fontSize:10,
        fontWeight:'bold',
      },
    }}>
      <Tab.Screen name={routes.home} component={Home}   options={{
      tabBarLabel: 'Home',
     
      tabBarIcon: ({  color,size }) => (
        <Ionicons name="home-outline" color={color} size={size} />
      ),
      tabBarActiveTintColor:"#dfa974"
    }}/>
      <Tab.Screen name={routes.hotels} component={Home} 
      options={{
      tabBarLabel: 'Hotels',
      tabBarIcon: ({ color,size }) => (
        <Ionicons name="business" color={color} size={size}/>
      ),
      tabBarActiveTintColor:"#dfa974"
    }}
      />
      <Tab.Screen name={routes.contactUs} component={Home}
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