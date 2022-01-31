import React from 'react';
import {renderToString } from 'react-dom/server';
import Home from './../../app/src/components/home';


const Renderer = ()=>{

        const content = renderToString(<Home />);
        // bundle contains everything thats not html
       return `
                <html><head><body><div id="root">${content}</div>
                <script src="app-bundle.js"></script>
                </body></html>
        `
}

export default Renderer