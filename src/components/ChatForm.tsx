import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colorConfig } from '../configs/color.config';
import { sizingConfig } from '../configs/sizing.config';

const styles = StyleSheet.create({
  inputBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: sizingConfig.xSmall,
    backgroundColor: colorConfig.colorSurface
  },

  input: {
    flexGrow: 1,
    borderWidth: 1,
    padding: sizingConfig.xSmall,
    borderRadius: sizingConfig.xSmall,
    borderColor: colorConfig.colorPrimary
  },

  sendButton: {
    borderRadius: 50,
    padding: sizingConfig.xSmall,
    marginLeft: sizingConfig.small,
    backgroundColor: colorConfig.colorPrimary
  },

  icon: {
    textAlign: 'center',
    fontSize: sizingConfig.xxLarge
  }
});

export const ChatForm = ({ onSend }: { onSend: (message: string)=> void }) => {;
  const [message, setMessage] = useState('');

  const send = () => {
    onSend(message);
    setMessage('');
  }

  return (
    <View style={styles.inputBox}>
      <TextInput 
        value={message}
        style={styles.input}
        onChangeText={(text)=> setMessage(text)}
        placeholder="Enter your message"
      />
      <TouchableOpacity 
        style={styles.sendButton} 
        activeOpacity={0.6} 
        disabled={message.trim() === ''}
        onPress={send}
      >
        <Ionicons name='send' color={colorConfig.colorOnPrimary} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
}
