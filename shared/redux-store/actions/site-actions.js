import axios from 'axios';
import moment from 'moment'
import { SET_PHOTOS } from './album-actions';

export const SET_SITES ='SET_SITES';
export const SET_SITE ='SET_SITE';
export const DELETE_SITE ='DELETE_SITE';
export const SET_EVENTS='SET_EVENTS';
export const UPDATED_SITE = 'UPDATED_SITE'
export const CREATED_SITE = 'SITE_CREATED'
export const DELETED_SITE = 'DELETED_SITE'

console.log('env is local:', process.env.EXPO_LOCAL)

const baseURL=   'http://138.68.12.0:8080'   //'http://localhost:8080';      //
console.log('baseURL',baseURL)

export const fetchSites = (mapId)=>{ 
      if( ! mapId)
            return;
      return async dispatch =>{
       try{     
                  const response = await fetch(`${baseURL}/site/list/${mapId}`,
                  {
                        method:'GET',
                        headers:{ 'Content-Type':'application/json'},
                  })
                  if(! response.ok){
                        throw new Error('fetching sites failed');
                  }
                  const data = await response.json();
                  dispatch({type:SET_SITES,sites: data});
                  
            }catch(err){
                 // throw err;
                 console.log('web service not available', err);
                 alert('traveloggia cloud offline')// todo make initial check
            }
      }
}

export function createSite ( site ){
     return async dispatch => {
            try{
                  const axiosConfig = {
                        method:'POST',
                        url:`${baseURL}/site/create`,
                        headers:{'Content-Type':'application/json'},
                        data: {
                              MapID:site.MapID,
                              Longitude:site.Longitude,
                              Latitude:site.Latitude,
                              Name:site.Name,
                              Address:site.Address,
                              DateAdded: new Date(),
                              Links:site.Links
                        }
                  }
                  
			 const createdSite = await axios(axiosConfig)
			 dispatch({type: CREATED_SITE, createdSite: createdSite.data})
            }catch(error){
                  console.log('error creating site', error.message)
            }
      
	}
}

export const updateSite = ( site ) =>{
      return async dispatch => {
            try{
                  const url =`${baseURL}/site/${site.SiteID}`;
                  const data= {
                        MapID: site.MapID,
                        Longitude: site.Longitude,
                        Latitude: site.Latitude,
                        Name: site.Name,
                        Arrival: site.Arrival? site.Arrival:null,
                        Departure : site.Departure? site.Departure:null,
                        IsDeleted: site.IsDeleted,
                        Description: site.Description,
                        Address: site.Address,
                        Links: site.Links
                  }
                  console.log('sending data to api' , data)
                  axios.put( url, data)
                  .then( updatedSite =>{
                        dispatch({type:UPDATED_SITE, updatedSite: updatedSite.data})
                  });
                  
            }catch(error){
                  console.log('error updating site', JSON.stringify(error))
            }
      }
}


export const deleteSite = ( site) =>{
      console.log('in delete site', site.SiteID)
      return async dispatch => {
            const response = await fetch(`${baseURL}/site/${site.SiteID}`,
            {
                  method:'DELETE',
                  headers:{'Content-Type':'application/json'}
            });
            if(! response.ok)
                  console.log('deleting site failed');

            dispatch({type: DELETED_SITE, deletedSite: site});
      }

}



