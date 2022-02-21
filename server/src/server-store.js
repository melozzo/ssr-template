//import {createStore, applyMiddleware} from 'redux';
//import {thunk} from 'redux-thunk';
import Reducers from './../../shared/redux-store/reducers'
import { configureStore } from '@reduxjs/toolkit'

//alternate syntax //const store = createStore(Reducers, applyMiddleware(thunk));

const  ServerStore = configureStore({
		reducer: Reducers 
})

export default ServerStore