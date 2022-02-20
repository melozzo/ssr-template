import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 
import {Fontisto} from '@expo/vector-icons'
import {FontAwesome} from '@expo/vector-icons'

import AlbumScreen from './../../screens/AlbumScreen';
import MapScreen from './../../screens/MapScreen';
import SiteScreen from './../../screens/SiteScreen';
import SiteEditScreen from './../../screens/SiteEditScreen'
import MapList from './../../screens/MapList';
import Links from './../../screens/Links';




const Stack = createStackNavigator();
const SiteStack = () => {
      return (
            <Stack.Navigator initialRouteName="Site">
                  <Stack.Screen name="SiteEdit" options={{ headerShown: false }} component={SiteEditScreen} />
                  <Stack.Screen name="Site" options={{ headerShown: false }} component={SiteScreen} />
            </Stack.Navigator>
      );
};



const BottomTab = createBottomTabNavigator();
const Tabs = () => {
      return (
            <BottomTab.Navigator initialRouteName="Map"  screenOptions ={({ route }) => ({  
			tabBarStyle: {backgroundColor:'#0E7B83', color:'white', fontSize:16 },
			headerShown:false,
	
			tabBarIcon: ({ focused, color, size }) => {
				let iconColor = focused? '#fcfbcf':'white'

				switch (route.name ) {
					case 'Album':
						return (<Ionicons name="md-images-sharp" size={24} color={iconColor} />)
					case 'Info':
						return (<Entypo name="info-with-circle" size={24} color={iconColor}/>)
					case 'Links':
						return (<Entypo name="add-to-list" size={24} color={iconColor} />)
					case 'Map':
						return (<Fontisto name="map" size={24} color={iconColor}/>)
					case 'MapList':
						return (<FontAwesome name="th-list" size={24} color={iconColor} />)

			    }
			},
			    tabBarActiveTintColor: '#fcfbcf',
			    tabBarInactiveTintColor: 'white',
			})}>
                  <BottomTab.Screen name="MapList" component={MapList} options={{tabBarVisible:false}} />
                  <BottomTab.Screen name="Map" component={MapScreen} />
                  <BottomTab.Screen name="Album" component={AlbumScreen} />
                  <BottomTab.Screen name="Info" component={SiteStack} />
                  <BottomTab.Screen name="Links" component={Links} />
            </BottomTab.Navigator>
      )
}






export default Tabs;




