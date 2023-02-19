import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default React.memo(({PlayGame}) => {
	return (
		<View style={styles.wrapper}>
			<View style={{flex: 1}}>
				<Image source={{uri: 'banner'}} resizeMode={"contain"} style={styles.imageContainer} />
				<Text style={styles.mainText}>Five levels. Increasing distractions.</Text>
				<Text style={styles.mainText}>Against the clock.</Text>
				<Text style={styles.mainText}>All you have to do: click the <Text style={styles.spanText}>color</Text> and <Text style={styles.spanText}>not the word</Text>.</Text>
			</View>
			
			<TouchableOpacity style={styles.btn} onPress={PlayGame}>
				<Text style={styles.btnText}>Play</Text>
			</TouchableOpacity>
		</View>
	)
});

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		paddingVertical: 10,
	},
	imageContainer: {
		height: 120,
	},
	mainText: {
		paddingHorizontal: 20,
		fontSize: 17,
		color: '#000000',
	},
	spanText: {
		fontWeight: '700', 
	},
	btn: {
		backgroundColor: '#fff',
		marginHorizontal: 20,
		borderRadius: 5,
		paddingVertical: 10,
		borderWidth: 1,
		borderColor: '#000000'
	},
	btnText: {
		textAlign: 'center',
		fontSize: 20,
		color: '#000000', 
	}
});