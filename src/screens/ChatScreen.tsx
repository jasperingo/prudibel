import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useLayoutEffect } from 'react';
import { Text, TouchableOpacity, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colorConfig } from '../configs/color.config';
import { sizingConfig } from '../configs/sizing.config';
import { useUserSignOut } from '../hooks/users/user-sign-out.hook';
import { RootStackParamList } from '../models/navigation.type';

export const ChatScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Chat'>>();

  const [
    onSignOut, 
    signOutSuccess, 
    signOutError, 
  ] = useUserSignOut();

  useEffect(
    ()=> {
      
      if (signOutSuccess) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'SignIn' }]
        });
      }

      if (signOutError !== null) {
        alert(signOutError);
      }
    },
    [signOutSuccess, signOutError, navigation]
  );

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

  return (
    <Text>Chat screen</Text>
  );
}
