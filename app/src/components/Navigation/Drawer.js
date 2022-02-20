import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { Text } from 'react-native';
import AuthScreen from '../../screens/AuthScreen';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItems, DrawerItem } from '@react-navigation/drawer';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-native-elements';

import { View } from 'react-native';
import Tabs from './Tabs'
import * as AuthActions from '.././../../../shared/redux-store/actions/auth-actions';
import * as MapActions from '.././../../../shared/redux-store/actions/map-actions'
import * as SiteActions from '.././../../../shared/redux-store/actions/site-actions';
import * as AlbumActions from '.././../../../shared/redux-store/actions/album-actions';





const SiteListDrawer = createDrawerNavigator();
const CustomDrawerContent = (props) => {
	const dispatch = useDispatch();
	const selectedMap = useSelector(state => state.map.selectedMap);
	const siteList = useSelector(state => state.site.siteList);
	const member = useSelector(state => state.auth.authenticatedMember)
	const selectedSite = useSelector(state => state.site.selectedSite)

	useEffect(() => {
		console.log('selected map', selectedMap)
		if (!selectedMap)
			dispatch({ type: SiteActions.SET_SITES, sites: [] })
		else {
			console.log("dispatching fetch sites from drawer")
			dispatch(SiteActions.fetchSites(selectedMap.MapID))
		}

	}, [selectedMap])

	useEffect(() => {
		if (!member)
			props.navigation.navigate("Authentication")
	}, [member])

	return (
		<DrawerContentScrollView {...props} style={{ backgroundColor: '#0E7B83',  paddingRight:8, paddingLeft:8, paddingBottom:8}}>

			<View style={{marginLeft:12}}>
				<Text style={{ textAlign: 'left', fontSize: 18, color: 'white' }}>{`Traveloggia `}</Text>
				<Text style={{ textAlign: 'left', fontSize: 14, color: 'white' }}>{`version ${Constants.manifest.version}`}</Text>
			</View>

			<View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 16, marginBottom: 24 }}>
				<Button
					containerStyle={{ width: 200,  }}
					title="Change User"
					type="outline"
					raised={true}
					onPress={handleAuthorize}
				/>
			</View>

			{siteList?.length > 0 &&
				<View style={{ backgroundColor: 'white',  paddingTop: 6 }}>
					{siteList.map((site, i) => {
						return (
							<View key={Math.random()}>
								<DrawerItem
									activeTintColor='black'
									activeBackgroundColor='#fcfbcf'
									focused={selectedSite ? site.SiteID === selectedSite.SiteID : false}
									label={site.Name ? `${site.Name}` : ''}
									onPress={() => { handleSiteSelected(site) }}
								/>
							</View>
							)
						})
					}
				</View>
			}
		
		</DrawerContentScrollView>
	);


	async function handleAuthorize() {
		// re-initialize to empty everything
		await AsyncStorage.removeItem("@traveloggia.email");
		await AsyncStorage.removeItem("@traveloggia.pwd");
		dispatch({ type: AuthActions.SET_AUTHENTICATED, member: null });
		dispatch({ type: MapActions.SET_MAPS, maps: [] });
		dispatch({ type: MapActions.SET_MAP, selectedMap: null });
		dispatch({ type: AuthActions.SET_READ_ONLY, value: true });
		dispatch({ type: SiteActions.SET_SITES, sites: [] });
		dispatch({ type: SiteActions.SET_SITE, selectedSite: null });
		dispatch({ type: AlbumActions.SET_PHOTOS, photos: [] });
		dispatch({ type: AlbumActions.SET_PHOTO, selectedPhoto: null })
		props.navigation.navigate("Authentication")
	}

	function handleSiteSelected(site) {
		props.navigation.toggleDrawer();
		dispatch({ type: SiteActions.SET_SITE, selectedSite: site })
	}
}


const DrawerTab = ({ route, navigation, styles }) => {

	const authenticatedMember = useSelector(state => state.auth.authenticatedMember);
	let defaultRoute = authenticatedMember === null ? "Authentication" : "Tabs";

	return (
		<SiteListDrawer.Navigator

			className={styles.greenMud}
			initialRouteName={defaultRoute}
			drawerContent={props => <CustomDrawerContent {...props} />}
		>
			<SiteListDrawer.Screen
				name="Tabs"
				component={Tabs}
				options={{ headerShown: false }}
			/>
			<SiteListDrawer.Screen
				name="Authentication"
				component={AuthScreen}
				options={{ headerShown: false }}
			/>

		</SiteListDrawer.Navigator>
	)
}


export default DrawerTab;




