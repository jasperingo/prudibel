import React from 'react';
import { KeyboardTypeOptions, StyleSheet, Text, TextInput, View } from 'react-native';
import { colorConfig } from '../configs/color.config';
import { sizingConfig } from '../configs/sizing.config';

const styles = StyleSheet.create({
  container: {
    padding: sizingConfig.xSmall,
    marginBottom: sizingConfig.xSmall,
    borderRadius: sizingConfig.xSmall,
    backgroundColor: colorConfig.colorSurface
  },

  label: {
    marginBottom: 2,
  },

  input: {
    borderWidth: 1,
    padding: sizingConfig.small,
    borderRadius: sizingConfig.xSmall,
    borderColor: colorConfig.colorPrimary
  },

  error: {
    color: colorConfig.colorError
  }
});

interface Props {
  label: string;
  value: string;
  error?: string | null;
  maxLength?: number;
  disabled?: boolean;
  placeholder?: string;
  passwordInput?: boolean;
  keyboardType?: KeyboardTypeOptions; 
  onChangeText: (value: string)=> void
}

export const UITextInput = (
  { 
    label,
    value,
    error = '', 
    maxLength,
    placeholder,
    disabled = false, 
    passwordInput = false, 
    keyboardType = 'default', 
    onChangeText
  }: Props
) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{ label }</Text>
      <TextInput 
        value={value}
        editable={!disabled}
        maxLength={maxLength}
        placeholder={placeholder}
        keyboardType={keyboardType}
        secureTextEntry={passwordInput}
        onChangeText={(text)=> onChangeText(text)}
        style={[styles.input, error ? { borderColor: colorConfig.colorError } : null]} 
        />
      {
        error && (
          <Text style={styles.error}>{ error }</Text>
        )
      }
    </View>
  );
}
