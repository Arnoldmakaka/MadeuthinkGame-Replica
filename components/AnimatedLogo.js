import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';

//---react native reanimated
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

const XMIN = 20;
const XMAX = 280
const YMIN = 50;
const YMAX = 150;

export default () => {

	const returnRandomX = () => (Math.floor(Math.random() * (XMAX-XMIN + 1) + XMIN));
	const returnRandomY = () => (Math.floor(Math.random() * (YMAX-YMIN + 1) + YMIN));

	const offsetX = useSharedValue(returnRandomX());
	const offsetY = useSharedValue(returnRandomY());
	
	useEffect(() => {
		const interval = setInterval(() => {
			offsetX.value=returnRandomX();
			offsetY.value=returnRandomY();
		}, 1000);
		return () => { 
			clearInterval(interval);
		}
	}, []);

	const animatedStyles = useAnimatedStyle(() => {
    	return {
      		transform: [
      			{translateX: withTiming(offsetX.value, {duration: 700}) },
      			{translateY: withTiming(offsetY.value, {duration: 700}) }
      		],
    	};
    });

	return (
		<Animated.View style={[styles.logoWrapper, animatedStyles]}>
			<Image source={{ uri: 'dog'}} style={styles.logo}/>
		</Animated.View>
	);
}

const styles = StyleSheet.create({
	logoWrapper: {
		height: 80,
		width: 80,
		borderRadius: 40,
		position: 'absolute',
	},
	logo: {
		flex: 1,
		borderRadius: 40,
	}
})					