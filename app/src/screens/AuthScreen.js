import React, { useState, useEffect } from 'react';
import { styles } from '../styles/Styles';
import { View, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ModalPrompt from './../components/Modals/ModalPrompt'
import { ButtonGroup, Input, Header, Button } from 'react-native-elements';
import RightButton from './../components/Buttons/RightButton'
import { Fontisto } from '@expo/vector-icons';
import * as AuthActions from '././../../../shared/redux-store/actions/auth-actions'
import * as MapActions from '././../../../shared/redux-store/actions/map-actions';
import * as CalendarActions from '././../../../shared/redux-store/actions/calendar-actions'
//import AsyncStorage from '@react-native-async-storage/async-storage';




const AuthScreen = ({ route, navigation }) => {

      const authenticatedMember = useSelector(state => state.auth.authenticatedMember);
      const buttonNames = ['Login', 'Create Account']
      const dispatch = useDispatch();
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const siteList = useSelector(state => state.site.siteList);
      const [savePromptVisible, setSavePromptVisible] = useState(false);
      const mapList = useSelector(state => state.map.mapList)

      useEffect(() => {
            navigation.navigate("Tabs", { screen: "MapList" })
      }, [mapList])

      useEffect(() => {
             if (!authenticatedMember) {
                  console.log("authenticated member is not truthy")
                  setEmail("");
                  setPassword("");
                  checkAlreadySaved();
            } else {
                  dispatch(MapActions.fetchMaps(authenticatedMember.MemberID))
                  navigation.navigate("Tabs", { screen: "MapList" })
            }
      }, [authenticatedMember]);

      async function checkAlreadySaved() {
            console.log("entered check already saved")
            const foundEmail = await AsyncStorage.getItem("@traveloggia.email");
            const foundPwd = await AsyncStorage.getItem("@traveloggia.pwd");
            //console.log("found", foundEmail, foundPwd)
            if (!foundEmail || !foundPwd) {
                  console.log("nothing saved to local storage ")
                  return;
            }
            console.log('loggin in with saved creds', foundEmail, foundPwd)
            dispatch(AuthActions.login({ email: foundEmail, password: foundPwd }));
      }

      async function checkSaveCredentials() {
            let alreadySaved = true;
            const foundEmail = await AsyncStorage.getItem("@traveloggia.email");
            const foundPwd = await AsyncStorage.getItem("@traveloggia.pwd");
            console.log('email', foundEmail)
            console.log('pwd', foundPwd)
            if (!foundEmail || !foundPwd || authenticatedMember.Email !== foundEmail || authenticatedMember.Password !== foundPwd)
                  alreadySaved = false;
            console.log('already saved', alreadySaved)
            if (alreadySaved === false)
                  setSavePromptVisible(true);
      }

      return (
            <View style={styles.screen}>
                  <ModalPrompt
                        visible={savePromptVisible}
                        message={"Remember login?"}
                        onClickYes={saveCredentials}
                        onDismiss={() => { setSavePromptVisible(false);  }} //dispatch(CalendarActions.requestCalendarPermission());
                  />
                  <Header
                        backgroundColor='#0E7B83'
                        placement="center"
				
                        centerComponent={{ text: 'Traveloggia Sign In', style: { color: '#fff', fontSize: 16 } }}
                        rightComponent={<RightButton handleClick={skipSignIn} />}>
                  </Header>
                  <View style={{ display: 'flex', flexDirection: 'row', marginTop: 25 }}>
                        <Input
                              autoCapitalize='none'
                              label="email"
                              rightIcon={
                                    <Fontisto
                                          name='email'
                                          size={24}
                                          color='black'
                                          style={{ marginRight: 10 }}
                                    />
                              }
                              value={email}
                              onChange={syntheticEvent => setEmail(syntheticEvent.nativeEvent.text)}
                        />
                  </View>
                  <View style={{ display: 'flex', flexDirection: 'row' }}>
                        <Input
                              autoCapitalize='none'
                              label='password'
                              secureTextEntry={true}
                              rightIcon={
                                    <Fontisto
                                          name='locked'
                                          size={24}
                                          color='black'
                                          style={{ marginRight: 10 }}
                                    />
                              }
                              value={password}
                              onChange={syntheticEvent => setPassword(syntheticEvent.nativeEvent.text)}
                        />
                  </View>
                  <ButtonGroup
                        onPress={handleButtonClick}
                        buttons={buttonNames}
                        containerStyle={{ height: 45 }}
                  />

            </View>
      )


      function handleButtonClick(index) {
            switch (index) {
                  case 0:// sign in
                        if (email === "" || password === "") {
                              alert("email and password are required");
                              return;
                        }
                        console.log('email', email)
                        console.log('password', password)
                        dispatch(AuthActions.login({ email, password }));
                        checkSaveCredentials();
                        break;
                  case 1: // create account
                        if (!email || !password) {
                              alert('email and password are required');
                              return;
                        }
                        console.log('email', email)
                        console.log('password', password)
                        dispatch(AuthActions.createAccount({ email: email, password: password }));
                        checkSaveCredentials();
                        break;

            }
      }

      function skipSignIn() {
            dispatch({ type: AuthActions.SET_AUTHENTICATED, member: { MemberID: 1 } })
            dispatch({ type: AuthActions.SET_READ_ONLY, value: true })
            dispatch(MapActions.fetchMaps(1))
            navigation.navigate("Tabs", { screen: "MapList" })
      }

      async function saveCredentials() {
            try {
                  await AsyncStorage.setItem("@traveloggia.email", email);
                  await AsyncStorage.setItem("@traveloggia.pwd", password);
                  setSavePromptVisible(false);
                //  dispatch(CalendarActions.getCalendar());
            } catch (error) {
                  console.log(error.message)
            }
      }




}
export default AuthScreen;