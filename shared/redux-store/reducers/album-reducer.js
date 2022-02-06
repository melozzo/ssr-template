import {SET_PHOTOS, SET_PHOTO, PHOTO_UPLOADED} from './../actions/album-actions';

const initialState={
      photoList:[],
      selectedPhoto:null,
      uploadState:null,
      needsReload:false // used by add and delete even update
};

function albumReducer(state = initialState, action){

      switch(action.type){
            case SET_PHOTOS:
                  return {
                        photoList:action.photos,
                        selectedPhoto:state.selectedPhoto
                  }
            case SET_PHOTO:
                  return{
                        photoList:state.photoList,
                        selectedPhoto: action.selectedPhoto
                  }
            case PHOTO_UPLOADED:
                  return{
                        photoList:state.photoList,
                        selectedPhoto: action.selectedPhoto,
                        uploadState:"uploaded"
                  }
            default:
                  return state;
      }
}
export default albumReducer;




