import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colorConfig } from '../configs/color.config';
import { REPLIES } from '../configs/replies.config';
import { sizingConfig } from '../configs/sizing.config';
import { useNextReplyMessages } from '../hooks/messages/reply-utils.hook';
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
  },

  suggestions: {
    borderWidth: 1,
    padding: sizingConfig.xSmall,
    marginVertical: sizingConfig.small,
    borderRadius: sizingConfig.xSmall,
    borderColor: colorConfig.colorPrimary,
  },

  suggestionsTitle: {
    fontWeight: '700',
    paddingVertical: sizingConfig.xSmall,
  },

  suggestionsMoreButton: {
    paddingVertical: sizingConfig.xSmall,
  },

  suggestionsMoreText: {
    fontWeight: '700',
    color: colorConfig.colorLink,
  },
});

function trimSuggestions(suggestions: string[], noTrim: boolean) {
  return (noTrim ? suggestions : suggestions.slice(0, 3)).sort(() => 0.5 - Math.random());
}

export const MessageItem = (
  { index, list, message: { content, date, id, from, replyId } }: 
  { index: number; message: Message; list: Message[] }
) => {
  const time = new Date(date);

  const [seeMore, setSeeMore] = useState(false);

  const nextReplyMessages = useNextReplyMessages();

  const messages = useMemo(
    () => replyId !== undefined && from === 'chatbot' && index === 0
      ? trimSuggestions(nextReplyMessages(replyId === 0 ? (list[2].replyId ?? 0) : replyId), seeMore)
      : [],
    [seeMore]
  );

  return (
    <View style={[styles.container, from === 'user' ? styles.meContainer : null]}>
      <View style={[styles.box, from === 'user' ? styles.meBox : null]}>
        <Text>{ content }</Text>
        { 
          (from === 'chatbot' && index === 0 && messages.length > 0) && (
            <View style={styles.suggestions}>
              <Text style={styles.suggestionsTitle}>Suggestions</Text>

              {
                messages.map((msg, i) => <Text key={i}>{ msg }</Text>)
              }

              <TouchableOpacity 
                activeOpacity={0.6}
                style={styles.suggestionsMoreButton} 
                onPress={() => setSeeMore(!seeMore)}
                >
                  <Text style={styles.suggestionsMoreText}>{ seeMore ? 'See less' : 'See more' }</Text>
              </TouchableOpacity>
            </View>
          )
        }
        <View style={styles.bottom}>
          <Ionicons name={id !== undefined ? 'checkmark' : 'time'} color={colorConfig.colorError} style={styles.status} />
          <Text style={styles.date}>{ time.toLocaleTimeString() }, { time.toDateString() }</Text>
        </View>
      </View>
    </View>
  );
}
