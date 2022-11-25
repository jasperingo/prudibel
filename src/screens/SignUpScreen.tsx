import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState, useEffect } from 'react';
import { StyleSheet, KeyboardAvoidingView, View, Platform } from 'react-native';
import { AuthSwitch } from '../components/AuthSwitch';
import { UIButton } from '../components/UIButton';
import { UITextInput } from '../components/UITextInput';
import { colorConfig } from '../configs/color.config';
import { sizingConfig } from '../configs/sizing.config';
import { useUserCreateValidation } from '../hooks/users/user-create-validation.hook';
import { useUserCreate } from '../hooks/users/user-create.hook';
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

export const SignUpScreen = () => {
  const [email, setEmail] = useState('');

  const [fullName, setFullName] = useState('');

  const [password, setPassword] = useState('');

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'SignUp'>>();

  const [
    isInvalid,
    nameError, 
    emailError, 
    passwordError
  ] = useUserCreateValidation();

  const [
    onSubmit, 
    success,
    loading, 
    error
  ] = useUserCreate();

  const onFormSubmit = () => {
    if (!isInvalid(fullName, email, password)) {
      onSubmit(fullName, email, password);
    }
  }

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
    },
    [success, error, navigation]
  );

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
      <View style={styles.form}>

      <UITextInput 
          label="Full name" 
          value={fullName} 
          disabled={loading}
          error={nameError}
          onChangeText={setFullName} 
          />

        <UITextInput 
          label="Email" 
          value={email} 
          disabled={loading}
          error={emailError}
          keyboardType="email-address"
          onChangeText={setEmail} 
          />

        <UITextInput 
          label="Password" 
          value={password} 
          disabled={loading}
          error={passwordError}
          passwordInput={true}
          onChangeText={setPassword} 
          />

        <UIButton text="Sign In" loading={loading} onClick={onFormSubmit} />

        <AuthSwitch type='signin' onPress={()=> navigation.navigate('SignIn')} />       

      </View>
    </KeyboardAvoidingView>
  );
}
