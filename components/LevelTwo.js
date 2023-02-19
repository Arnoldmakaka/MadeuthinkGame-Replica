import React from 'react'
import { View, Text, StyleSheet } from 'react-native';

//components
import ProgressBar from './ProgressBar';
import AnimatedWordComponent from './AnimatedWordComponent.js';
import ColorButtons from './ColorButtons';
import RoundIndicator from './RoundIndicator';

export default ({ ButtonColors, GetColor, Colors, Word, TimeBar, IndicatorCount, Timer }) => {
	return (
		<View>
			<ProgressBar Value={Timer} ProgressDone={TimeBar} />
			<AnimatedWordComponent CustomWord={Word.Title} CustomWordColor={Colors.code} />
			<View style={{marginVertical: 10}}>
				<ColorButtons Buttons={ButtonColors} SelectedColor={GetColor}/>
			</View>
			<RoundIndicator CurrentItem={IndicatorCount} />
		</View>
	)
}