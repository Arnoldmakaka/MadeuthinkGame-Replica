import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity, Text, View } from 'react-native';

const BtnComponent = ({ Title, OnPress }) => (
	<TouchableOpacity
		style={styles.item}
		onPress={OnPress}
	>
		<Text style={styles.title}>{Title}</Text>
	</TouchableOpacity>
);

export default ({ Buttons, SelectedColor }) => {

	const renderItem = ({ item, index }) => (
		<BtnComponent
			key={(`${index}${Date.now()}`).toString()}
			Title={item.Title}
			OnPress={() => SelectedColor(item)}
		/>
	);

	return (
		<FlatList
        	data={Buttons}
        	renderItem={renderItem}
        	keyExtractor={(item, index) => (`${index}${Date.now()}`).toString()}
          	numColumns={3}
          	horizontal={false}
          	columnWrapperStyle={styles.columnWrapperStyles}
          	ListFooterComponent={<View />}
          	ListFooterComponentStyle={{marginBottom: 10,}}
      	/>
	)
}

const styles = StyleSheet.create({
	columnWrapperStyles: {
		flex: 1,
		paddingHorizontal: 20,
	},
	item: {
		flex: 1,
		borderWidth: 1,
		borderColor: '#000',
		backgroundColor: '#fff',
		borderRadius: 5,
		//marginHorizontal: 5,
	},
	title: {
		textAlign: 'center',
		paddingVertical: 10,
		fontSize: 24,
		color: '#000',
		paddingHorizontal: 5,
		fontWeight: '600', 
	},
});