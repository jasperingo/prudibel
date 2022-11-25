
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colorConfig } from '../configs/color.config';
import { sizingConfig } from '../configs/sizing.config';

const styles = StyleSheet.create({ 
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: sizingConfig.small
  },
  button: {
    color: colorConfig.colorPrimary
  }
});

interface Props {
  type: 'signin' | 'signup';
  onPress: ()=> void;
}

export const AuthSwitch = ({ type, onPress }: Props) => {
  return (
    <View style={styles.container}>
      <Text>
        { type === 'signup' && 'Don\'t have an account? ' } 
        { type === 'signin' && 'Already have an account? ' } 
      </Text>
      <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
        <Text style={styles.button}>
          { type === 'signup' && 'Sign up.' }
          { type === 'signin' && 'Sign in.' }
        </Text>
      </TouchableOpacity>
    </View>
  );
}
