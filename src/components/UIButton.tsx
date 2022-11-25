import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colorConfig } from '../configs/color.config';
import { sizingConfig } from '../configs/sizing.config';

const styles = StyleSheet.create({
  container: {
    marginVertical: sizingConfig.small,
    marginHorizontal: sizingConfig.xSmall,
  },

  button: {
    padding: sizingConfig.small,
    borderRadius: sizingConfig.xSmall,
    backgroundColor: colorConfig.colorPrimary
  },

  dangerButton: {
    backgroundColor: colorConfig.colorError
  },

  text: {
    fontWeight: '700',
    textAlign: 'center',
    color: colorConfig.colorOnPrimary,
  }
});

interface Props {
  text: string;
  danger?: boolean;
  loading: boolean;
  onClick: ()=> void
}

export const UIButton = ({ text, loading, danger = false, onClick }: Props) => {

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[styles.button, danger ? styles.dangerButton : null]} 
        activeOpacity={0.6}
        onPress={onClick}
        >
         { 
        loading ?
          <ActivityIndicator color={colorConfig.colorOnPrimary} size="small" />
          :
          <Text style={styles.text}>{ text }</Text>
        }
      </TouchableOpacity>
    </View>
  );
}
