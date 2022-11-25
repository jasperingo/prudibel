import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { colorConfig } from '../configs/color.config';

export const Loading = ({ color = colorConfig.colorPrimary, size = 'large' }: { color?: string, size?: 'large' | 'small' }) => {
  return (
    <View>
      <ActivityIndicator color={color} size={size} />
    </View>
  );
}
