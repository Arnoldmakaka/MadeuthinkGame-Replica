import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

export default (props) => {
	
	const [col, setCol] = useState("")
	useEffect(() => {
		const interval = setInterval(() => {
			setCol((Math.floor(Math.random() * 6)));
		}, 500);

		return () => { clearInterval(interval); }
	}, []);

	return (
		<View style={[styles.wrapper, {backgroundColor: `rgba(${(Math.floor(Math.random()*256))}, ${(Math.floor(Math.random()*256))}, ${(Math.floor(Math.random()*256))}, 0.9)`}]}>
			{props.children}
		</View>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
	},
});