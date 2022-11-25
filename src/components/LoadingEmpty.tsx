import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colorConfig } from '../configs/color.config';
import { sizingConfig } from '../configs/sizing.config';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorConfig.colorSurface,
    paddingVertical: sizingConfig.xxLarge,
    marginHorizontal: sizingConfig.medium
  },
  
  text: {
    textAlign: 'center',
    fontSize: sizingConfig.xLarge
  }
});

export const LoadingEmpty = ({ text }: { text: string }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{ text }</Text>
    </View>
  );
}
