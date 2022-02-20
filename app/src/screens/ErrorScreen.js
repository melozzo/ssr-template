import React from 'react'
import {View, Text} from 'react-native'
import { Header , Card} from 'react-native-elements';

const ErrorScreen = ()=>{


	return (
		<View>
			<Header
			height={90}
			 placement="center"
			></Header>
			<Card>
				<Text>{"its all your fault"}</Text>
			</Card>
			
		</View>
	)



}

export default ErrorScreen