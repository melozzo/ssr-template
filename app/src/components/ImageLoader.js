import React , {useEffect, useState} from 'react'
import {View, Image,Text, TouchableOpacity} from 'react-native'
import * as WebBrowser from 'expo-web-browser';
import Moment from 'moment'
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import {  useDispatch } from 'react-redux'
import * as AlbumActions from '././../../../shared/redux-store/actions/album-actions';
import EditDeleteButton from './Buttons/EditDeleteButton'


//<TouchableOpacity   onPress={e=>{handleLink(`${photo.StorageURL}${photo.FileName}`)}} >

const ImageLoader = ( props ) =>{
      const {onEdit, photo, MapID, MemberID} = props
      const [isLocal, setIsLocal]= useState(true);
      const dispatch = useDispatch();
	const [photoPath, setPhotoPath] = useState('')
	const legacyStorageURL=`https://traveloggia-guests.s3.us-west-2.amazonaws.com/${MemberID}/${MapID}/`


	useEffect(()=>{
		if(!photo.DeviceStorageURL)
			setIsLocal(false)
	}, [photo])

	useEffect(()=>{
		if(!photo.StorageURL)
			return;
		else {
			if( photo.StorageURL.indexOf(MapID) === -1 )
				setPhotoPath(legacyStorageURL)
			else
				setPhotoPath(photo.StorageURL)

		}
	},[photo.StorageURL])


      return (
                  <View style={{marginBottom:24}}> 
                        <View style={{display:'flex', flexDirection:'row'}}>
                                {
                              isLocal &&  <TouchableOpacity onPress={e=>{handleLink(`${photo.StorageURL? photoPath:legacyStorageURL}${photo.FileName}`)}} >
                                   <Image 
                                          source={{ uri: photo.DeviceStorageURL} } 
                                          style={{
                                                position:'relative',
                                                top:0,
                                                width:200,
                                                height:200
                                          }}
                                         
                                          /> 
                                    </TouchableOpacity>

                              }                       
                              {
                                    !isLocal &&   
                                     <TouchableOpacity  onPress={e=>{handleLink(`${photo.StorageURL? photoPath:legacyStorageURL}${photo.FileName}`)}} >
                                          <Image 
                                                source={{ uri: `${photo.StorageURL? photoPath:legacyStorageURL}${photo.FileName}` } } 
                                               
                                                style={{
                                                      position:'relative',
                                                      top:0,
                                                      width:200,
                                                      height:200
                                                }} /> 
                                    </TouchableOpacity>  
                               }   
                              <Text style={{width:140, marginLeft:20}}>
                                    {photo.Caption? photo.Caption:''}
                              </Text>
                        </View>                       
                        <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                              <Text >
                                    {photo.DateTaken? `${ Moment(photo.DateTaken).format('MM/DD/YY hh:mm a')}` :'' }
                              </Text> 

					<EditDeleteButton
						item={photo}
					 	onDelete={handleDeletePhoto}
					 	onEdit = {onEdit}

					/>


                        </View>
                  </View>
      )

      function lastOne(){
            if(isLocal)
                  return;
            else {
                  setIsLocal(false)
            }
      }

      function localOn(){
            //console.log("load succeeded")
            setIsLocal(true)
      }

      function localOffRemoteOn(){
            console.log("load completed")
            if(isLocal)
                  return;
            else {
                  setShowLocal(false)
                 setIsRemote(true)
            
            }
      }

      function handleLink(url){
            WebBrowser.openBrowserAsync(url)
      }


	function handleDeletePhoto(photo) {
		console.log("handling delete photo")
		dispatch(AlbumActions.deletePhoto(photo))
	}

      


}

export default ImageLoader