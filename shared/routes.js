import React from 'react';
import { Route, Routes } from 'react-router-dom'
import {Helmet} from 'react-helmet'
// import AuthScreen from './../app/src/screens/AuthScreen';
// import  AlbumScreen from './../app/src/screens/AlbumScreen';
// import MapScreen from './../app/src/screens/MapScreen';
// import SiteScreen from './../app/src/screens/SiteScreen';
// import SiteEditScreen from './../app/src/screens/SiteEdit';
// import Links from './../app/src/screens/Links';
//import MapList from '../app/src/screens/MapList';
import Home from './../app/src/components/home';

const RootNavigation = ()=>{

	return (
		<React.Fragment>
 <Helmet>
        <title>App Title</title>
        <meta name="description" content="not dynamic who cares" />
        <meta name="theme-color" content="#008f68" />
      </Helmet>

		<Routes>
			{/* <Route exact path="/" component = {MapScreen} />
			<Route exact path="/Map" component = {MapScreen} />
			<Route exact path="/Authenticate" component = {AuthScreen} />
			<Route exact path="/Album" component = {AlbumScreen} />
			<Route exact path="/Site" component = {SiteScreen} />
			<Route exact path="/SiteEdit" component = {SiteEditScreen} />
			<Route exact path="/Links" component = {Links} /> */}
			<Route  path="/" element={<Home />} >
			
			</Route>
		</Routes>
</React.Fragment>
	)
}

export default RootNavigation;