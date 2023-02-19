import React from 'react'
import { View, Text, StyleSheet } from 'react-native';

//components
import ProgressBar from './ProgressBar';
import CustomHeader from './CustomHeader';
import ColorButtons from './ColorButtons';
import RoundIndicator from './RoundIndicator';
import ChangingBackground from './ChangingBackground';

export default ({ ButtonColors, GetColor, Colors, Word, TimeBar, IndicatorCount, Timer }) => {
	return (
		<ChangingBackground>
			<ProgressBar Value={Timer} ProgressDone={TimeBar} />
			<CustomHeader Title={Word.Title} Color={Colors.code} />
			<View style={{marginVertical: 10}}>
				<ColorButtons Buttons={ButtonColors} SelectedColor={GetColor}/>
			</View>
			<RoundIndicator CurrentItem={IndicatorCount} />
		</ChangingBackground>
	)
}