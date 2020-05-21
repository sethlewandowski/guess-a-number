import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const GameOverScreen = props => {
	return( 
		<View style={styles.screen}>
			<Text>The Game is OVER!!!</Text>
			<Text>Number of Rounds: {props.roundsNumber}</Text>
			<Text> Number was: {props.userNumber}</Text>
			<Button title="NEW GAME" onPress={props.onRestart}></Button>
		</View>
	);
};	

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'space-between',
		alignItems: 'center',
	}
});

export default GameOverScreen;