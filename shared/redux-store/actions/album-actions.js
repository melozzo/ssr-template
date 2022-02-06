
import axios from 'axios';
//import { RNS3 } from 'react-native-upload-aws-s3';

const baseURL=    'http://138.68.12.0:8080'  //  'http://localhost:8080'; //

export const SET_PHOTOS = 'SET_PHOTOS';
export const SET_PHOTO = 'SET_PHOTO';
export const PHOTO_UPLOADED = 'PHOTO_UPLOADED';

export const fetchPhotos = (siteId)=>{ 
      if(!siteId)
      return;
      return async dispatch =>{
       try{     
                  const response = await fetch(`${baseURL}/photo/list/${siteId}`,
                  {
                        method:'GET',
                        headers:{'Content-Type':'application/json'},
                  })
                  if(! response.ok){
                        console.log('fetching photos failed for', siteId)
                       // throw new Error(response);
                  }
                  const data = await response.json();
                 
                  dispatch({type:SET_PHOTOS,photos: data})
            }catch(err){
                  throw err;
            }
      }
}


export const uploadPhoto = (objPrefix, photo)=>{
      return async dispatch =>{
            let imageUri = photo.DeviceStorageURL;
            let uriParts = imageUri.split('.');
            let fileType = uriParts[uriParts.length - 1];
            console.log("filetype",fileType)

            const file = {
                  uri: imageUri,
                  name: photo.FileName,
                  type: fileType
            }
            
            const options = {
                  keyPrefix: objPrefix,
                  bucket: 'traveloggia-guests',
                  region: 'us-west-2',
                  accessKey: `AKIAVBGO6MUINRVR2JEJ`,
                  secretKey: `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`,
                  successActionStatus: 201
            }
     
            try{
                 // const response = await RNS3.put(file, options)
const response = {"status":201}
                  if (response.status === 201){
                        console.log("Success: ", response.body)
                        //set photo uploaded true; 
                  } else {
                        console.log("Failed to upload image to S3: ", response)
                  }
            } catch(error){
                  console.log(error)
            }
      }
}

export const createPhoto = (  photo) =>{
      console.log("entered create photo action", photo)
      return async dispatch =>{
            try{
                  const axiosConfig = {
                        method:"POST",
                        url:`${baseURL}/photo/create`,
                        headers:{'Content-Type':'application/json'},
                        data: {
                              DateTaken:photo.DateTaken,
                              SiteID:photo.SiteID,
                              FileName:photo.FileName,
                              StorageURL:photo.StorageURL,
                              DeviceStorageURL:photo.DeviceStorageURL
                        }
                  }
            const createdPhoto = await axios(axiosConfig);
           
            dispatch(fetchPhotos(photo.SiteID));

            }catch(error){
                  console.log("error creating photo record", error.message)
            }
      }
}

export const deletePhoto = ( photo)=>{
      console.log("deleting photo id" , photo.PhotoID)
      return async dispatch =>{
            try{
                  const axiosConfig = {
                        method:"DELETE",
                        url:`${baseURL}/photo/${photo.PhotoID}`,
                        headers:{'Content-Type':'application/json'},
                  }
                  const deletedPhoto = await axios(axiosConfig);
                  console.log('deleted photo')
                  dispatch(fetchPhotos(photo.SiteID));

            }catch(error){
                  console.log("error deleting photo record", error.message)
            }
      }
}

export const updatePhoto = ( caption, photo)=>{
      return async dispatch =>{
                  const url=`${baseURL}/photo/${photo.PhotoID}`
                  console.log('update photo url', url)
                  const data = {
                        SiteID:photo.SiteID,
                        FileName: photo.FileName,
                        dateTaken: photo.DateTaken,
                        StorageURL: photo.StorageURL,
                        DeviceStorageURL: photo.DeviceStorageURL,
                        Caption: caption,
                        IsDeleted: photo.IsDeleted,
                        orientationID: photo.orientationID
                  }      
                  axios.put(url, data)
                  .then(updatedPhoto =>{
                        console.log('caption updated', updatedPhoto);
                        dispatch( fetchPhotos(photo.SiteID));
                  })
                  .catch(error=>{
                        console.log("error updating photo", error)
                  })
           
      }
             
}
