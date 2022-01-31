
// const express = require('express'); // commonjs syntax
// const React = require('react');
// const renderToString = require('react-dom/server').renderToString;
// const Home = require('./client/components/Home').default;
// to make this isomorphic - run same code on server and client
// change to es2015

import express from 'express';
import React from 'react';
import {renderToString } from 'react-dom/server';
import Home from './app/src/components/home'
import path from 'path'

console.log("server bootstrap")
console.log("dirname", __dirname)

//const somewhere = path.join(__dirname, "../../app/public/app-bundle.js")
//console.log("somewhere", somewhere)
const frontendServer = express();

frontendServer.use(express.static("public"));


frontendServer.get('/', (req, res)=>{
        const content = renderToString(<Home />);
// bundle contains everything thats not html
        const html = `
                <html><head><body><div id="root">${content}</div>
                <script src="app-bundle.js"></script>
                </body></html>
        `
        res.send(html);
})

frontendServer.listen(3000, ()=>{
        console.log("frontend server listening on port 3000")
})