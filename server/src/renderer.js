import React from 'react';
import ReactDOM from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';

import RootNavigation from './../../shared/routes';
import {Provider} from 'react-redux';



const Renderer = (req)=>{

	const content = ReactDOM.renderToString(
			<StaticRouter location={req.url} >
				<RootNavigation />
			</StaticRouter>
	);
        // bundle contains everything thats not html
       return `
				<!DOCTYPE html>
                <html>
					<head>
						
						<title>Very Excellent Server Side Rendering SPA</title>
					</head>
					<body>
						<div id="app">
							${content}
						</div>
 <script src="app-bundle.js"></script>
                	</body>
				</html>
        `
}

export default Renderer