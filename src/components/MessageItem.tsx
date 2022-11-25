import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colorConfig } from '../configs/color.config';
import { sizingConfig } from '../configs/sizing.config';
import Message from '../models/message.model';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: sizingConfig.small,
    marginHorizontal: sizingConfig.small,
  },

  meContainer: {
    justifyContent: 'flex-end',
  },

  box: {
    borderWidth: 1,
    maxWidth: '70%',
    padding: sizingConfig.xSmall,
    borderRadius: sizingConfig.xSmall,
    borderColor: colorConfig.colorPrimary,
    backgroundColor: colorConfig.colorSurface
  },

  meBox: {
    borderColor: colorConfig.colorPrimary,
    backgroundColor: colorConfig.colorPrimary,
  },

  bottom: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },

  status: {
    fontSize: sizingConfig.medium,
    marginRight: sizingConfig.xSmall
  },

  date: {
    color: colorConfig.colorGray
  }
});

export const MessageItem = ({ message: { content, date, id, from } }: { message: Message; }) => {
  return (
    <View style={[styles.container, from === 'user' ? styles.meContainer : null]}>
      <View style={[styles.box, from === 'user' ? styles.meBox : null]}>
        <Text>{ content }</Text>
        <View style={styles.bottom}>
          <Ionicons name={id !== undefined ? 'checkmark' : 'time'} color={colorConfig.colorError} style={styles.status} />
          <Text style={styles.date}>{ (new Date(date)).toDateString() }</Text>
        </View>
      </View>
    </View>
  );
}
