import React from 'react';
import { Text, TextInput, StyleSheet } from 'react-native';
import { white } from '../utils/colors';

export default function TestBox({ style, value, onChangeText, placeholder }) {
  return (
    <TextInput
      style={[ styles.defaultTextInput ,{style}]}
      onChangeText={onChangeText}
      value={value}
      placeholder={placeholder}
    />
  );
}

const styles = StyleSheet.create({
  defaultTextInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius:5
  },
});
