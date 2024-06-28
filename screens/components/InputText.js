
import React, { forwardRef } from 'react';
import { TextInput, StyleSheet } from 'react-native';

//forwardRef component for customizable text input
const InputText = forwardRef(({ placeholder, value, onChangeText, onSubmitEditing, returnKeyType }, ref) => {
  return (
    <TextInput
      ref={ref} // Ref forwarding to allow parent components to reference this input
      style={styles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      onSubmitEditing={onSubmitEditing}
      returnKeyType={returnKeyType} // Keyboard return key type
    />
  );
});

// StyleSheet for defining the input style
const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
});

export default InputText;
