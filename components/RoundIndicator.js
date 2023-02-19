import React from 'react';
import { View, StyleSheet } from 'react-native';

const IndicatorItems = [1,2,3,4,5,6,7,8];

export default ({ CurrentItem }) => {
	return (
		<View style={styles.wrapper}>
			{
				IndicatorItems.map((item) => {
					return <View 
						key={(`${item}${Date.now()}`).toString()}
						style={[styles.container, {backgroundColor: CurrentItem === item ? '#ff2e17' : '#fff'}]}
					/>
				})
			}
		</View>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		flexDirection: 'row',
		justifyContent: 'center',
	},
	container: {
		height: 16,
		width: 16,
		borderRadius: 8,
		marginHorizontal: 6,
		borderColor: '#000000',
		borderWidth: 1,
	},
});