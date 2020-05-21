import React from 'react';
import { Text, StyleSheet } from 'react-native';

const ScreenHeader = props => 
	<Text style={styles.header}>{props.children}</Text>
	;

const styles = StyleSheet.create({
	header: {
		fontSize: 24,
		marginVertical: 10,
		textAlign: 'center',
		margin: 20,
		padding: 20,
		color: 'grey',
		fontFamily: 'open-sans-bold',
	}
});

export default ScreenHeader;