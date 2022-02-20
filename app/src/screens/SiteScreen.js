import React , {useState, useEffect} from 'react';
import {useSelector , useDispatch} from 'react-redux';
import {  View, Text, ScrollView} from 'react-native';
import { Card, ListItem, Header, Tile} from 'react-native-elements'
import * as SiteActions from '././../../../shared/redux-store/actions/site-actions';
import AlbumButton from './../components/Buttons/AlbumButton'
import LeftButton from './../components/Buttons/LeftButton';
import Moment from 'moment'
const  _ = require('lodash');
import EditDeleteButton  from './../components/Buttons/EditDeleteButton'



const SiteScreen = ( {route, navigation })=>{
      const selectedSite = useSelector( state=> state.site.selectedSite);
      const [siteDisplayName, setSiteDisplayName]=useState("");
      const dispatch = useDispatch();
      const readOnly = useSelector(state =>state.auth.readOnly);


      useEffect(() => {
            if(!selectedSite){
                  setSiteDisplayName("")
            }else{
                  setSiteDisplayName(`${selectedSite.Name}`)
            }      
      },[selectedSite] );

      return (
            <View>
                  <Header
                        leftComponent={<LeftButton  handleClick={toggleDrawer} />}
                       placement="center"
                        centerComponent={ <Text style ={{color: '#707c87', textAlign:'center', maxWidth:200}} >{selectedSite? selectedSite.Name: ''}</Text>}
                        rightComponent={<AlbumButton handleClick={handleAlbumButton}/> }
                  />

                  {!selectedSite &&
                        <View>
                              <Card style={{padding:10}}>
                                    <Text style={{fontSize:20, color:'#a7427c',  fontStyle:'italic'}}>
                                          {`Select a site from the left burger menu or by clicking on a map location, to view detailed information`}
                                    </Text>

                              </Card>

                        </View>
                  }


                  {selectedSite &&
                  <ScrollView  >
                      
                        <Card key={"1"}>
                              <ListItem  >
                                    <ListItem.Subtitle style={{color:'gray'}}>{'Name: '}</ListItem.Subtitle>
                                    <ListItem.Title style={{maxWidth:230}}>{ !selectedSite.Name? "" : selectedSite.Name}</ListItem.Title>
                              </ListItem>  
                        </Card>
                        <Card key={"2"} >
                              <ListItem >
                                    <ListItem.Subtitle style={{color:'gray'}}>{'Address: '}</ListItem.Subtitle>
                                    <ListItem.Title style={{maxWidth:230}}>{ selectedSite.Address}</ListItem.Title>
                              </ListItem>  

                        </Card>
                        <Card key={"3"} >
                              <ListItem >
                                    <ListItem.Subtitle style={{color:'gray'}}>{'Arrival: '}</ListItem.Subtitle>
                                    <ListItem.Title>{ !selectedSite.Arrival ? "" : Moment(selectedSite.Arrival).format('MMM DD YYYY  hh:mm a' )}</ListItem.Title>
                              </ListItem>  

                        </Card>
                        <Card key={"4"}>
                              <ListItem  >
                                    <ListItem.Subtitle style={{color:'gray'}}>{'Departure: '}</ListItem.Subtitle>
                                    <ListItem.Title>{ !selectedSite.Departure? "" : Moment(selectedSite.Departure).format('MMM DD YYYY  hh:mm a' )}</ListItem.Title>
                              </ListItem>  
                        </Card>
                        <Card key={"5"}>
                              <ListItem  >
                                    <ListItem.Subtitle style={{color:'gray'}}>{'Description: '}</ListItem.Subtitle>
                                    <ListItem.Title style={{maxWidth:200}}>{ !selectedSite.Description? "" : selectedSite.Description}</ListItem.Title>
                              </ListItem>  
                        </Card>     
                    
                  
                              { !readOnly &&
                                    <View style={{display:'flex', flexDirection:'row', justifyContent:'center', marginTop:26, marginBottom:200}}>
                                          <EditDeleteButton 
                                                large={true}
                                                item = {selectedSite}
                                                onDelete={handleDeleteSite}
                                                onEdit={handleEditSite}/>
                                    </View> 
                              }
                  </ScrollView>   
      } 
            </View>
            
      );


      function toggleDrawer(){
            navigation.toggleDrawer();
      }

      function handleAlbumButton(){
            navigation.navigate("Album")
      }

      function handleDeleteSite(){
            dispatch(SiteActions.deleteSite(selectedSite));
            navigation.navigate("Map")
      }

      function handleEditSite(){
            navigation.navigate( "SiteEdit")
      }

     
 

}

export default SiteScreen;