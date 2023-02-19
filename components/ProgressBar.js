import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';

//---react-native-reanimated
import Animated, { useSharedValue, withTiming, Easing, useAnimatedStyle, runOnJS } from 'react-native-reanimated';

export default ({ Value, ProgressDone }) => {

	const offset = useSharedValue('0%');

	useEffect(() => {
		offset.value = '100%';
	}, [Value]);

	const animatedStyle = useAnimatedStyle(() => {
    	return {
    		width: withTiming(offset.value, {duration: Value, easing: Easing.bezier(0.25,0.25,0.25,0)}, (finished) => {
    			if(finished){
    				runOnJS(ProgressDone)(finished);
    			}
    		})
    	};
    });

	return <Animated.View style={[styles.box, animatedStyle]} />
}

const styles = StyleSheet.create({
	box: {
		height: 25,
		backgroundColor: '#e00016',
	},
});