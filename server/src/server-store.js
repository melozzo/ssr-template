import {createStore, applyMiddleware} from 'redux';
import {thunk} from 'redux-thunk';
import Reducers from './../../shared/redux-store/reducers'


const  ServerStore = ()=>{
	
	const store = createStore(Reducers, {});
	return store;
}

export default ServerStore