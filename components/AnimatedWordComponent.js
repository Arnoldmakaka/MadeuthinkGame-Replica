import React, { useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';

import Animated, { useSharedValue, useAnimatedStyle, withSpring, withRepeat  } from 'react-native-reanimated';

export default ({ CustomWord, CustomWordColor, CustomValue }) => {

	const animatedStyles = useAnimatedStyle(() => {
    	return {
      		transform: [{ translateX: withRepeat(
      			withSpring(Math.floor(Math.random() * (200 - 20) + 20 ), {
      				damping: 15,
      				stiffness: 90,
      			})
      			, -1, true)
      		}],
    	};
    });

	return <Animated.Text style={[styles.mainWord, {color: CustomWordColor}, animatedStyles]}>{CustomWord}</Animated.Text>
}

const styles = StyleSheet.create({
	mainWord: {
		fontSize: 65,
		fontWeight: '800',
		//textAlign: 'center',
		marginBottom: 10,
	},
});