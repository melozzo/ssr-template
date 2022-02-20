import React from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import RootNavigation from './../../shared/routes'
// import {createStore, applyMiddleware} from 'redux';
// import {Provider} from 'react-redux';
// import thunkMiddlewear from 'redux-thunk'
// import Reducers from './../../shared/redux-store/reducers'

//const store = createStore(Reducers, {}, applyMiddleware(thunkMiddlewear));


ReactDom.hydrate(
	
        <BrowserRouter>
                <RootNavigation />
        </BrowserRouter>

, document.getElementById("app"));