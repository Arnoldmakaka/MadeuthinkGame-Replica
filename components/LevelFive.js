import React from 'react'
import { View, Text, StyleSheet } from 'react-native';

//components
import ProgressBar from './ProgressBar';
import AnimatedWordComponent from './AnimatedWordComponent.js';
import ColorButtons from './ColorButtons';
import RoundIndicator from './RoundIndicator';
import ChangingBackground from './ChangingBackground';
import AnimatedLogo from './AnimatedLogo';

export default ({ ButtonColors, GetColor, Colors, Word, TimeBar, IndicatorCount, Timer }) => {
	return (
		<ChangingBackground>
			<ProgressBar Value={Timer} ProgressDone={TimeBar} />
			<AnimatedWordComponent CustomWord={Word.Title} CustomWordColor={Colors.code} />
			<View style={{marginVertical: 10}}>
				<ColorButtons Buttons={ButtonColors} SelectedColor={GetColor}/>
			</View>
			<RoundIndicator CurrentItem={IndicatorCount} />
			<AnimatedLogo />
		</ChangingBackground>
	)
}