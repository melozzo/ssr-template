import React from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import Routes from '../../shared/routes'
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {thunk} from 'redux-thunk'
import Reducers from './../../shared/redux-store/reducers'

const store = createStore(Reducers, {}, applyMiddleware(thunk));


ReactDom.hydrate(
	<Provider store={store}>
        <BrowserRouter>
                <Routes />
        </BrowserRouter>
	</Provider>
, document.querySelector("#root"));