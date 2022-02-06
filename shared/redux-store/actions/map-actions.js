import axios from 'axios'

export const SET_MAPS = 'SET_MAPS';
export const SET_MAP = 'SET_MAP';
export const DELETED_MAP='DELETED_MAP';
export const UPDATED_MAP= 'UPDATED_MAP';
export const CREATED_MAP='CREATED_MAP'
export const IS_EMPTY_MAP= 'IS_EMPTY_MAP'


const baseURL=     'http://138.68.12.0:8080' // 'http://localhost:8080'; //

export const fetchMaps = (memberId)=>{ 
      return async dispatch =>{
            //console.log('inside fetch maps for memberID: ', memberId)
            const response = await fetch(`${baseURL}/map/list/${memberId}`,
            {
                  method:'GET',
                  headers:{
                        'Content-Type':'application/json'
                  },
            })
            const data = await response.json();
            dispatch({type:SET_MAPS, maps: data})
      }
}


export const getLastMap = (memberId)=>{ 
      console.log('inside last map')
      return async dispatch =>{
           try{
                  const response = await fetch(`${baseURL}/map/list/46996`);
                  console.log('got response')
                  const data = await response.json();
                  console.log('returning map' ,data)
                  dispatch({
                        type:SET_MAP,
                        selectedMap: data
                  })
      }catch(error){
            console.log("error")
      }
}

}


export const createMap = (memberId, mapName) =>{
      return async dispatch => {
            try {
                  const axiosConfig = {
                        method:"POST",
                        url:`${baseURL}/map/create`,
                        headers:{'Content-Type':'application/json'},
                        data: {
                              MemberID:memberId,
                              MapName:mapName
                        }
                  }
                  const createdMap = await axios(axiosConfig);
			dispatch({type:CREATED_MAP,createdMap: createdMap.data})

            }catch( error ){
                  console.log("error creating map", error)
            }
      }
}


export const updateMap = (map) =>{
	map.LastRevision= new Date();
      return async dispatch =>{
		try{
			const axiosConfig = {
				method:"PUT",
				url:`${baseURL}/map/${map.MapID}`,
				headers:{'Content-Type':'application/json'},
				data: map
			}
		     // I dont understand why the updated map is not returned but
		     // its findOneAndUpdate that doesnt work, and I have worked around elsewhere
			const mel = await axios( axiosConfig)
			console.log("returned from update map",mel.data)
			dispatch({type:UPDATED_MAP, updatedMap: map})

		}catch(error){
			console.log('error updating map', error.message)
		}
      }
}


export const deleteMap = (map)=>{
      return async dispatch =>{
		try{
			const axiosConfig = {
				method:"DELETE",
				url:`${baseURL}/map/${map.MapID}`,
				headers:{'Content-Type':'application/json'},
				
			}
		     
			await axios( axiosConfig)
			dispatch({type:DELETED_MAP, deletedMap:map})

		}catch(error){
			console.log('error deleting map', error.message)
		}
           
      }
}
