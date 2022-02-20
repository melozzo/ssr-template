

import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, ActivityIndicator, Dimensions} from 'react-native';
import { Button, Header} from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons'; 
import {MaterialIcons} from '@expo/vector-icons';
// import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-web-maps';
import * as Location from 'expo-location';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { styles } from '../styles/Styles'
// import ModalPrompt from './../components/Modals/ModalPrompt'
// import LeftButton from '../components/Buttons/LeftButton';
// import CurrentLocation from '../components/Buttons/LocateButton'
import SearchModal from './../components/Modals/SearchModal';
import * as SiteActions from '././../../../shared/redux-store/actions/site-actions';




const MapScreen = ({ route, navigation }) => {

	const dispatch = useDispatch();
	const laCarte = useRef(null);
	const siteList = useSelector(state => state.site.siteList);
	const selectedMap = useSelector(state => state.map.selectedMap);
	const selectedSite = useSelector(state => state.site.selectedSite);
	const authenticatedMember = useSelector(state => state.auth.authenticatedMember);
	const readOnly = useSelector(state => state.auth.readOnly);
	const emptyMap = useSelector(state=>state.map.emptyMap);


	const SPACE = .02;
	const [currentLocation, setCurrentLocation] = useState(null);
	const [currentAddress, setCurrentAddress] = useState('');
	const [currentName, setCurrentName] = useState('');
	const [mapDisplayName, setMapDisplayName] = useState("")
	const [mapType, setMapType] = useState("standard");
	const [mapCoords, setMapCoords] = useState([]);
	const [searchVisible, setSearchVisible] = useState(false)
	const [savePromptVisible, setSavePromptVisible] = useState(false);

	const tabBarHeight = useBottomTabBarHeight();
	const headerHeight = 110;
	const toolBarHeight = 44;
	const insets = useSafeAreaInsets();

	const mapStyle= {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height - headerHeight - toolBarHeight - tabBarHeight,
	}


      useEffect(() => {
		if(! authenticatedMember)
			return;

		if( authenticatedMember.MemberID === 1 && readOnly )
			return;

			Location.installWebGeolocationPolyfill()

            // (async () => {
            //       let { status } = await Location.requestForegroundPermissionsAsync();
            //       if (status !== 'granted') {
            //            console.log('Permission to access location was denied');
            //             return;
            //       }
		// 	Location.installWebGeolocationPolyfill()
            // })();
      }, [authenticatedMember, readOnly]);

	useEffect(()=>{
		if( !emptyMap)
			return;
			getStartLocation()
	},[emptyMap])

      useEffect(() => {
            if (siteList.length === 0){
			console.log('site list is now zero')
			setMapCoords([])
			return;
		}    
            let coords = [];
            for (let i = 0; i < siteList.length; i++) {
                  let marker = siteList[i];
                  coords.push({ latitude: marker.Latitude, longitude: marker.Longitude });
			
            }
		//console.log('site list length', coords).length
           // setMapCoords(coords)
          //  zoomToExtent(coords);
      }, [siteList]);

	

      useEffect(() => {
            if (!selectedMap)
                  setMapDisplayName('');
            else
                  setMapDisplayName(`${selectedMap.MapName}`)
      }, [selectedMap])

      useEffect(() => {
            if (!selectedSite){
                  return;
            }
            const oneList = [{ latitude: selectedSite.Latitude, longitude: selectedSite.Longitude }]
          //  zoomToExtent(oneList)
      }, [selectedSite])

      return (
            <View style={{
			paddingTop: insets.top,
			paddingLeft: insets.left,
			paddingBottom: insets.bottom,
			paddingRight: insets.right,
		    }}>
			
                   <Header
                       // leftComponent={<LeftButton handleClick={toggleDrawer} />}
                        placement="center"
						centerComponent={ <Text style ={{color:'#707c87', textAlign:'center', maxWidth:200}} >{mapDisplayName}</Text>}
                        rightComponent={<CurrentLocation getLocation={getCurrentLocation} />}>
                  </Header> 

                  <View style={{height:44, display:'flex', flexDirection:'row',  justifyContent:'space-evenly', backgroundColor:'#e5ebd8'}}>
                              <Button
                                    iconBottom
                                    icon={<MaterialIcons name="zoom-out-map" size={30} color="black" />}
                                    title="Extent"
                                    onPress={ e=>{ zoomToExtent(mapCoords) }}
                              />
                              <Button
                                    iconBottom
                                    icon={<MaterialIcons name="satellite" size={30} color="black" />}
                                    title="Layer"
                                    onPress={() => { handleToggle() }}
                              />
                              <Button  
                                    style={{}}
                                    title="Search"
                                    iconLeft
                                    icon={<Ionicons name="search-sharp" size={30} color="black" />}
                                    onPress={e=>{setSearchVisible(true)}}
                              /> 
                  </View> 

                  <ModalPrompt
                        visible={savePromptVisible}
                        message={"Save location to map?"}
                        onClickYes={saveCurrentLocation}
                        onDismiss={() => { setSavePromptVisible(false) }}
                  />
                  <SearchModal 
                        visible= {searchVisible}
                        onSubmit = {handleSearch}
                  />
		
      </View>
      )

      function toggleDrawer() {
            navigation.toggleDrawer();
      }

      function handleToggle() {
            if (mapType === "standard")
                  setMapType("hybrid");
            else
                  setMapType("standard")
      }

      function handleMarkerPress(event, site) {
            event.stopPropagation();
            dispatch({ type: SiteActions.SET_SITE, selectedSite: site });
            navigation.navigate("Album")
      }

      function handleExtent(){
            zoomToExtent(mapCoords)
      }

      async function handleSearch(address){
            try{
                  const foundCoords = await Location.geocodeAsync(address)
                  const firstFound = foundCoords[0];
                  zoomToExtent([{ latitude:firstFound.latitude, longitude: firstFound.longitude }])
                  setCurrentLocation({ latitude:firstFound.latitude, longitude: firstFound.longitude })
                  setCurrentAddress(address)
                  setCurrentName(address)
                  setSavePromptVisible(true);
            }catch(error){
                  alert("search is only enabled for an address or place name, coffee near me wont work")
            }
            
            setSearchVisible(false)
      }

	// to do this edge padding must have some logic to it, for now its just guesswork
	function zoomToExtent(coordList) {
            laCarte.current.fitToCoordinates(coordList, {
                  edgePadding: { top: 50, right: 40, bottom: 30, left: 40 },// more padding on top because markers are above the location point
                  animated: false
            });
      }
    
	async function getStartLocation( boolGeocode = true ) {
		console.log('getting start location')
		let { status } = await Location.requestForegroundPermissionsAsync()
			if (status !== 'granted') {
				alert('Permission to access location was denied');
				return;
			}
		
			Location.installWebGeolocationPolyfill()
			await navigator.geolocation.getCurrentPosition(
				position => {
					const latitude = position.coords.latitude;
					const longitude = position.coords.longitude;
					// this is a work around since briliant map view doesnt zoom
					const boundingCoords = generateBoundingRectangle(latitude, longitude)
					laCarte.current.fitToCoordinates(boundingCoords,
					{
						edgePadding: { top: 80, right: 80, bottom: 80, left: 80},
						animated: false
					});
					return true;
				}, 
				error => { 
					console.log("error using navigator start position", error) 
				},
				{ enableHighAccuracy: false, timeout: 2000, maxiumAge: 1000 }
			)
    
      }

	function generateBoundingRectangle(  lat, long, padding=SPACE,){
		const east = {latitude:lat, longitude: long - padding}
		const west = {latitude:lat, longitude: long + padding}
		const north= {latitude: lat + padding, longitude:long}
		const south = {latitude: lat -padding, longitude:long}
		return [north, south,east, west]
	}

      async function getCurrentLocation( ) {
		console.log("getting location")
            let { status } = await Location.requestForegroundPermissionsAsync()
            if (status !== 'granted') {
                  alert('Permission to access location was denied');
                  return;
            }
          //  setSpinning(true)
// this is the fast performing alternative to the expo location which takes a full 10 seconds 
		Location.installWebGeolocationPolyfill()
		await navigator.geolocation.getCurrentPosition(
			position => {
				const latitude = JSON.stringify(position.coords.latitude);
				const longitude = JSON.stringify(position.coords.longitude);
				reverseGeocode(position.coords);
				//setSpinning(false)
				setCurrentLocation({ latitude, longitude })
				return true;
			}, 
			error => { 
				console.log("error using navigator current position") 
			},
			{ enableHighAccuracy: false, timeout: 2000, maxiumAge: 1000 })
      }


      async function reverseGeocode(location) {
            try {
                  const arrayAddress = await Location.reverseGeocodeAsync(location);
                  const objAddress = arrayAddress[0]
                  const strAddress = `${objAddress.street? objAddress.street:''}  ${objAddress.city}, ${objAddress.region} ${objAddress.postalCode}  ${objAddress.country}`
                  console.log('reverse geo', strAddress, objAddress.name)
			setCurrentAddress(strAddress);
                  setCurrentName(objAddress.name)
            } catch (error) {
                  console.log('reverse geocode didnt work', error)
			//setSpinning(false)
            }
            setSavePromptVisible(true);
      }


      function saveCurrentLocation() {
            const site = {
                  MapID: selectedMap.MapID,
                  Longitude: currentLocation.longitude,
                  Latitude: currentLocation.latitude,
                  Name: currentName,
                  Address: currentAddress,
                  IsDeleted: false,
                  Links:[]
            }
            console.log('saving site', site)
		dispatch({type:SiteActions.SET_SITE, selectedSite: null})
            dispatch(SiteActions.createSite(site));
         
            setSavePromptVisible(false);
            setCurrentLocation(null)
            setCurrentAddress('')
            setCurrentName('')
            navigation.navigate("Info", { screen: "SiteEdit" })
            
      }

}

export default MapScreen;


