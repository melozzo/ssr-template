// const express = require('express'); // commonjs syntax
// const React = require('react');
// const renderToString = require('react-dom/server').renderToString;
// const Home = require('./client/components/Home').default;
// to make this isomorphic - run same code on server and client
// change to es2015


import Express from 'express';
import ServerSideRenderer from './renderer'


console.log('frontend server bootstrap start')
const frontendServer = Express()

frontendServer.use(Express.static('app/dist'))


frontendServer.get('*', (req, res) => {
	//const store = ServerStore();
    const allHTML = ServerSideRenderer(req)

	res.send(allHTML)
})

frontendServer.listen(3000, () => {
	console.log('FRONTEND SERVER LISTENING ON PORT 3000')
})
