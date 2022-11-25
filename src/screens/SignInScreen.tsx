import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import { StyleSheet, KeyboardAvoidingView, View, Platform } from 'react-native';
// import { useNetInfo } from "@react-native-community/netinfo";
import { AuthSwitch } from '../components/AuthSwitch';
import { UIButton } from '../components/UIButton';
import { UITextInput } from '../components/UITextInput';
import { colorConfig } from '../configs/color.config';
import { sizingConfig } from '../configs/sizing.config';
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

  const loading = false;

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'SignIn'>>();

  const onFormSubmit = () => {}

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
