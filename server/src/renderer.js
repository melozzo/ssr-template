import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import ServerStore from './server-store'
import RootNavigation from './../../shared/routes';
import {Provider} from 'react-redux';
import {Helmet} from 'react-helmet'


const ServerSideRenderer = (req)=>{

	


 	const helmet = Helmet.renderStatic();
	const content = ReactDOMServer.renderToString(
		<Provider store={ServerStore}>
			<StaticRouter location={req.url} >
				<RootNavigation />
			</StaticRouter>
		</Provider>
			
	);
        // bundle contains everything thats not html
       return `
				<!DOCTYPE html>
                <html>
					<head>
						
						  	${helmet.title.toString()}
        					${helmet.meta.toString()}
					</head>
					<body>
						<div id="app">
							${content}
						</div>
 						<script src="app-bundle.js"></script>
						<script>
          // WARNING: See the following for security issues around embedding JSON in HTML:
          // https://redux.js.org/usage/server-rendering#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(prefetchedData).replace(
            /</g,
            '\\u003c'
          )}
        </script>
                	</body>
				</html>
        `
}

export default ServerSideRenderer