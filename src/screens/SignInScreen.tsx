import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState, useEffect } from 'react';
import { StyleSheet, KeyboardAvoidingView, View, Platform } from 'react-native';
import { AuthSwitch } from '../components/AuthSwitch';
import { UIButton } from '../components/UIButton';
import { UITextInput } from '../components/UITextInput';
import { colorConfig } from '../configs/color.config';
import { sizingConfig } from '../configs/sizing.config';
import { useUserAuthValidation } from '../hooks/users/user-auth-validation.hook';
import { useUserAuth } from '../hooks/users/user-auth.hook';
import { RootStackParamList } from '../models/navigation.type';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    paddingHorizontal: sizingConfig.medium,
  },

  form: {
    padding: sizingConfig.medium,
    borderRadius: sizingConfig.medium,
    backgroundColor: colorConfig.colorSurface,
  }
});

export const SignInScreen = () => {
  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'SignIn'>>();

  const [
    isInvalid,
    validError, 
  ] = useUserAuthValidation();

  const [
    onSubmit, 
    success,
    loading, 
    error
  ] = useUserAuth();

  useEffect(
    ()=> {
      if (success) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Chat' }]
        });
      }
      
      if (error !== null) {
        alert(error);
      }

      if (validError !== null) {
        alert(validError);
      }
    },
    [success, error, validError, navigation]
  );

  const onFormSubmit = () => {
    if (!isInvalid(email, password)) {
      onSubmit(email, password);
    }
  }

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
      <View style={styles.form}>

        <UITextInput 
          label="Email" 
          value={email} 
          disabled={loading}
          keyboardType="email-address"
          onChangeText={setEmail} 
          />

        <UITextInput 
          label="Password" 
          value={password} 
          disabled={loading}
          passwordInput={true}
          onChangeText={setPassword} 
          />

        <UIButton text="Sign In" loading={loading} onClick={onFormSubmit} />

        <AuthSwitch type='signup' onPress={()=> navigation.navigate('SignUp')} />       

      </View>
    </KeyboardAvoidingView>
  );
}
