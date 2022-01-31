
// const express = require('express'); // commonjs syntax
// const React = require('react');
// const renderToString = require('react-dom/server').renderToString;
// const Home = require('./client/components/Home').default;
// to make this isomorphic - run same code on server and client
// change to es2015

import express from 'express';
import Renderer from './renderer'

console.log("frontend server bootstrap start")

//const somewhere = path.join(__dirname, "../../app/public/app-bundle.js")
//console.log("somewhere", somewhere)
const frontendServer = express();

frontendServer.use(express.static("app/dist"));

console.log("static dir is app/dist")

const html = Renderer();


frontendServer.get('/', (req, res)=>{
       
        res.send(html);
})

frontendServer.listen(3000, ()=>{
        console.log("FRONTEND SERVER LISTENING ON PORT 3000")
})