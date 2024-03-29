import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { sizingConfig } from '../configs/sizing.config';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: sizingConfig.large,
  },

  text: {
    textAlign: 'center',
    fontWeight: '700',
    marginRight: sizingConfig.large,
  }
});

interface Props {
  error: string;
  onReloadPress: ()=> void
}

const LoadingError = ({ error, onReloadPress }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{ error }</Text>
      <TouchableOpacity 
        activeOpacity={0.6} 
        onPress={onReloadPress} 
        accessibilityLabel="Retry load of data"
        > 
        <Ionicons name="reload" size={sizingConfig.xLarge} />
      </TouchableOpacity>
    </View>
  );
}

export default LoadingError;
