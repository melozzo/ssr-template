import React from 'react' // es2015 module syntax

const Home = () => {
	return (
		<div>
			<div>Welcome to the sucky home component</div>
			<button onClick={() => console.log('hi shorty')}>press me </button>
		</div>
	)
}

export default Home
