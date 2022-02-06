import React from 'react';
import {renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import Routes from './../../shared/routes';
import {Provider} from 'react-redux';



const Renderer = (req, serverStore)=>{

	const content = renderToString(
		<Provider store={serverStore}>
			<StaticRouter location={req.path} context={{}}>
				<Routes />
			</StaticRouter>
		</Provider>
	);
        // bundle contains everything thats not html
       return `
                <html><head><body><div id="root">${content}</div>
                <script src="app-bundle.js"></script>
                </body></html>
        `
}

export default Renderer