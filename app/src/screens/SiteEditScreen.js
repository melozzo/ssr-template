import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, ScrollView, Dimensions} from 'react-native';
import { Input, Card, Header, Button } from 'react-native-elements'
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/EvilIcons'
import moment from 'moment';
import {Formik} from 'formik'

import AlbumButton from '../components/Buttons/AlbumButton'
import LeftButton from '../components/Buttons/LeftButton';
import SaveCancelButton from './../components/Buttons/SaveCancelButton'
import * as SiteActions from './../../../shared/redux-store/actions/site-actions';





const SiteEditScreen = ({ route, navigation }) => {
      const selectedSite = useSelector(state => state.site.selectedSite);
      const { width, height } = Dimensions.get('window');
      const [siteDisplayName, setSiteDisplayName] = useState("");
      const [arrivalDatePickerVisible, setArrivalDatePickerVisible] = useState(false);
      const [departureDatePickerVisible, setDepartureDatePickerVisible] = useState(false);
      const [arrivalDate, setArrivalDate] = useState(new Date())
      const [departureDate, setDepartureDate] = useState(new Date())

      const dispatch = useDispatch();

      useEffect(()=>{
            if(! selectedSite)
                  return;
            if(selectedSite.Arrival)
                  setArrivalDate(selectedSite.Arrival)

            if(selectedSite.Departure)
                  setDepartureDate(selectedSite.Departure)
      },[selectedSite])
      
      function onSubmit(data) {
            try{
                  if(data.Arrival)
                  data.Arrival = moment( data.Arrival).utc()
                  if(data.Departure)
                  data.Departure = moment(data.Departure).utc()
                  dispatch(SiteActions.updateSite(data));
            }catch ( error){
                  alert(error)
            }
         
		navigation.navigate("Info", { screen: "Site" })
      }

      function handleErrors(errors) {
            console.log('form went wrong', errors)
      }

   
      return (
            <View>
                  <Header
                        leftComponent={<LeftButton handleClick={toggleDrawer} />}
                        placement="center"
                        centerComponent={{ text: siteDisplayName, style: { color: '#fff' } }}
                        rightComponent={<AlbumButton handleClick={handleAlbumButton} />}
                  />
			{selectedSite && <ScrollView>
                        <Card>
                              <Formik
                                    initialValues={selectedSite}
                                    onSubmit={onSubmit}>
                                    {({ handleChange, handleBlur, handleSubmit, values , setFieldValue, dirty}) => (
                              <View>
                                    <Input
                                          label="Name"
                                          value={values.Name}
                                          onChangeText={handleChange('Name')}
                                    />
                              
                                    <Input
                                          label="Address"
                                          value={values.Address}
                                          onChangeText={handleChange('Address')}
                                    />
                                
                                    <React.Fragment>
                                          <Input
                                                htmlType="date"
                                                label="Arrival"
                                                value={ values.Arrival? moment(values.Arrival).format('MMM DD YYYY  hh:mm a') : ''}
                                                rightIcon={<Icon
                                                      name='calendar'
                                                      size={36}
                                                      onPress={e => { 
                                                            const toggled = !arrivalDatePickerVisible; 
                                                            setArrivalDatePickerVisible(toggled) 
                                                            if( ! values.Arrival){
                                                                  setArrivalDate(new Date())
                                                                  setFieldValue('Arrival', new Date())
                                                            }
                                                           
                                                      }}
                                                />}
                                          />
                                          {arrivalDatePickerVisible && <DateTimePicker
                                                testID="dateTimePicker"
                                                value={arrivalDate}
                                                mode={'date'}
                                                is24Hour={false}
                                                display="default"
                                                onChange={(e, d)=>{setArrivalDate(d); setFieldValue('Arrival',d)}}
                                          />
                                          }
                                          {arrivalDatePickerVisible && <DateTimePicker
                                                testID="dateTimePicker"
                                                value={arrivalDate}
                                                mode={'time'}
                                                is24Hour={false}
                                                display="default"
                                                onChange={(e, d)=>{setArrivalDate(d); setFieldValue('Arrival',d)}}
                                          />
                                          }
                                    </React.Fragment> 

                                    <React.Fragment>
                                          <Input
                                                htmlType="date"
                                                label="Departure"
                                                value={ values.Departure ? moment(values.Departure).format('MMM DD YYYY  hh:mm a') : ''}
                                                
                                                rightIcon={<Icon
                                                      name='calendar'
                                                      size={36}
                                                      onPress={e => { const toggled = !departureDatePickerVisible; 
                                                                  setDepartureDatePickerVisible(toggled);
                                                                  if(! values.Departure){
                                                                  setDepartureDate(new Date()); 
                                                                 setFieldValue('Departure', new Date())
                                                                  }
                                                             }}
                                                />}
                                          />
                                          {departureDatePickerVisible && 
                                          <React.Fragment>
                                                <DateTimePicker
                                                      value={departureDate}
                                                      mode={'date'}
                                                      is24Hour={false}
                                                      display="default"
                                                      onChange={(e, d)=>{setDepartureDate(d); setFieldValue('Departure',d)}}
                                                />
                                                <DateTimePicker
                                                      value={departureDate}
                                                      mode={'time'}
                                                      is24Hour={false}
                                                      display="default"
                                                      onChange={(e, d)=>{setDepartureDate(d); setFieldValue('Departure',d)}}
                                                    
                                                />
                                          </React.Fragment>
                                          }
                                    </React.Fragment>
                  
                                    <Input
                                          label="Description"
                                          value={values.Description}
                                          onChangeText={handleChange('Description')}
                                    /> 

						<View style={{display:'flex',marginTop:20,marginBottom:40, flexDirection:'row',justifyContent:'center' }}>
							<SaveCancelButton   
								saveDisabled={!dirty}
								onSave={handleSubmit}
								onCancel={()=> navigation.navigate("Info",{screen:"Site"})}
							
							/>
						</View>
                                       

                                    </View>   
                                    )}
                              </Formik>
                        </Card>
                  </ScrollView> }
            </View>

      );


// to do submit button should be disabled if not dirty - but this crapy component doesnt work in RN - needs to be replaced


      function toggleDrawer() {
            navigation.toggleDrawer();
      }

      function handleAlbumButton() {
            navigation.navigate("Album")
      }

      function handleArrivalDateChange(event, selectedDate) {
            setArrivalDate(selectedDate)
          
      };

      function handleDepartureDateChange(selectedDate) {
            setDepartureDate(selectedDate)
      };

      function handleCancel() {
            setAddLinkVisible(false)
      }

     

     



}

export default SiteEditScreen;