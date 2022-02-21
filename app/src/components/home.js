import React from 'react' 
import Helmet from 'react-helmet'


const Home = () => {
	return (
		<div>
	 <Helmet>
        <title>home component</title>
        <meta name="description" content="child component overwritting" />
        <meta name="theme-color" content="#008f68" />
      </Helmet>
			<div>Welcome to the sucky home component</div>
			<button onClick={() => console.log('hi shorty')}>press me </button>
		</div>
	)
}

export default Home
