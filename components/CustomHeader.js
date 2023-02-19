import React from 'react';
import { Text } from 'react-native';

export default React.memo(({Title, Color}) => {
	return <Text style={{
		color: Color,
		fontSize: 60,
		fontWeight: '800',
		textAlign: 'center',
		marginVertical: 10, 
	}}>{Title}</Text>
})