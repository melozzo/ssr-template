
import { combineReducers} from 'redux';
import mapReducer from './map-reducer';
import siteReducer from './site-reducer';
import authReducer from './auth-reducer';
import albumReducer from './album-reducer';

const Reducers = ()=>{
	return combineReducers({map:mapReducer, site:siteReducer, auth: authReducer, album: albumReducer})
}

export default Reducers;