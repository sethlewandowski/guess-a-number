import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = props => {
	return(
		<View style={{...styles.card, ...props.style}}>{props.children}</View>
		) 
};

const styles = StyleSheet.create({
	card: {
		width: 300,
		maxWidth: '80%',
		alignItems: 'center',
		shadowColor: 'black', //ios
		shadowOffset: { width: 0, height: 2}, //ios
		shadowRadius: 6, //ios
		shadowOpacity: 0.26, //ios
		elevation: 3, //only works on android
		backgroundColor: 'white',
		padding: 10,
		borderRadius: 10,
	}
});
export default Card; 