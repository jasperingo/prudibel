import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useLayoutEffect } from 'react';
import { View, TouchableOpacity, Alert, StyleSheet, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ChatForm } from '../components/ChatForm';
import { Loading } from '../components/Loading';
import { LoadingEmpty } from '../components/LoadingEmpty';
import LoadingError from '../components/LoadingError';
import { MessageItem } from '../components/MessageItem';
import { colorConfig } from '../configs/color.config';
import { sizingConfig } from '../configs/sizing.config';
import { useMessageCreate } from '../hooks/messages/message-create.hook';
import { useMessageReply } from '../hooks/messages/message-reply.hook';
import { useMessageList } from '../hooks/messages/messages-fetch.hook';
import { useUserSignOut } from '../hooks/users/user-sign-out.hook';
import { useUser } from '../hooks/users/user.hook';
import { useRenderListFooter } from '../hooks/utils/render-list-footer.hook';
import { RootStackParamList } from '../models/navigation.type';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  list: {
    marginBottom: sizingConfig.xSmall
  }
});

export const ChatScreen = () => {
  const user = useUser();

  const renderFooter = useRenderListFooter();

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Chat'>>();

  const createMessage = useMessageCreate();

  const replyMessage = useMessageReply();

  const [
    onSignOut, 
    signOutSuccess, 
    signOutError, 
  ] = useUserSignOut();

  const [
    fetchMessages, 
    list, 
    loading, 
    loaded, 
    error, 
    retryFetch
  ] = useMessageList();

  useEffect(() => {
    if (signOutSuccess) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'SignIn' }]
      });
    }

    if (signOutError !== null) {
      alert(signOutError);
    }
  }, [signOutSuccess, signOutError, navigation]);

  useEffect(() => {  
    if (user !== null) {
      return fetchMessages(user.uid);
    }
  }, [user, loading, error, fetchMessages]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity activeOpacity={0.6} onPress={onSignOutClicked}>
          <Ionicons name='log-out-outline' size={sizingConfig.xxLarge} color={colorConfig.colorOnPrimary} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const onSignOutClicked = () => {
    Alert.alert(
      'Confirm',
      'Are you sure you want to sign out?',
      [
        {
          text: 'No',
          style: "cancel"
        },
        { 
          text: 'Yes', 
          onPress: onSignOut
        }
      ]
    );
  }

  useEffect(() => {  
    if (list.length > 0 && list[0].from === 'user') {
      replyMessage(list);
    } else if (loaded && list.length === 0) {
      replyMessage([{ content: 'Hi', date: Date.now(), from: 'user' }]);
    }
  }, [list, loaded, replyMessage]);

  const sendMessage = (content: string) => {
    createMessage({
      content,
      date: Date.now(),
      from: 'user',
    });
  }

  return (
    <View style={styles.container}>

      <FlatList 
        data={list}
        style={styles.list}
        keyExtractor={(item)=> `message-${item.id}-${item.date}`}
        inverted={true}
        renderItem={({ item })=> (
          <MessageItem message={item} />
        )}
        ListFooterComponent={renderFooter([
          {
            canRender: loading,
            render: ()=> <Loading />
          },
          {
            canRender: list.length === 0,
            render: ()=> <LoadingEmpty text="Start chatting with prudibel" />
          },
          {
            canRender: error !== null,
            render: ()=> <LoadingError error={error ?? ''} onReloadPress={retryFetch} />
          }
        ])}
        />

      <ChatForm onSend={sendMessage} />
    </View>
  );
}
