import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { white } from '../utils/colors';

export default function TextButton({ children, onPress, style = {},disabled}) {

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <Text style={[ 
        disabled? styles.androidBtnDisable : styles.androidBtn 
        , style]}>{children}
      </Text>
    </TouchableOpacity>
  );
}
 
const styles = StyleSheet.create({
  androidBtn: {
    textAlign: 'center',
    color: white,
    margin: 5,
    padding: 10,
    borderRadius: 5
  },
  androidBtnDisable: {
    textAlign: 'center',
    color: white,
    margin: 5,
    padding: 10,
    borderRadius: 2,
    opacity: 0.5
  },
});
