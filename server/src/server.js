// const express = require('express'); // commonjs syntax
// const React = require('react');
// const renderToString = require('react-dom/server').renderToString;
// const Home = require('./client/components/Home').default;
// to make this isomorphic - run same code on server and client
// change to es2015

import express from 'express'
import Renderer from './renderer'
import ServerStore from './server-store';

console.log('frontend server bootstrap start')

const frontendServer = express()

frontendServer.use(express.static('app/dist'))

console.log('static dir is app/dist')



frontendServer.get('*', (req, res) => {
	const store = ServerStore();
    const allHTML = Renderer(req, store)
	res.send(allHTML)
})

frontendServer.listen(3000, () => {
	console.log('FRONTEND SERVER LISTENING ON PORT 3000')
})
