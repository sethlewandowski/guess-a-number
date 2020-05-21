import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';

import ScreenHeader from '../components/ScreenHeader.js';
import Colors from '../constants/Colors.js';
import MainButton from '../components/MainButton.js';

const GameOverScreen = props => {
	return( 
		<View style={styles.screen}>
			<ScreenHeader>The Game is OVER!!!</ScreenHeader>
			<View style={styles.imageContainer}>
				<Image 
					style={styles.image} 
					source={require('../assets/success.png')} />
			</View>
			<ScreenHeader>
				I needed <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to guess the number <Text style={styles.highlight}>{props.userNumber}</Text>. Not bad, right? 
			</ScreenHeader>
			<MainButton onPress={props.onRestart}>
				Play Again
			</MainButton>
		</View>
	);
};	

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		alignItems: 'center',
	},
	imageContainer: {
		width: '90%',
		height: '60%',
		flex: 1,
		alignItems: 'center',
	},
	image: {
		width: '100%',
		height: '100%',
		borderRadius: 100,
	},
	highlight:{
		color: Colors.primary,
		fontFamily: 'open-sans-bold',
		fontSize: 30,
	}
});

export default GameOverScreen;