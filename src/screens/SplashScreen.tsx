import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Loading } from '../components/Loading';
import LoadingError from '../components/LoadingError';
import { colorConfig } from '../configs/color.config';
import { sizingConfig } from '../configs/sizing.config';
import { useUserFetch } from '../hooks/users/user-fetch.hook';
import { useUser } from '../hooks/users/user.hook';
import { RootStackParamList } from '../models/navigation.type';

const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: colorConfig.colorSurface,
  },

  nameIconContainer: {
    alignItems: 'center'
  },

  appName: {
    fontSize: 40,
    color: colorConfig.colorPrimary
  },

  appIcon: {
    fontSize: 80,
    color: colorConfig.colorPrimary
  },

  success: {
    fontSize: sizingConfig.large,
    color: colorConfig.colorPrimary
  }
});

export const SplashScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Splash'>>();

  const user = useUser();

  const [fetchUser, loading, success, error, retryFetch] = useUserFetch();

  useEffect(() => {
    if (!success && !loading) {
      return fetchUser();
    }
  }, [success, loading, fetchUser]);

  useEffect(() => {
    if (success && user === null) {
      navigation.reset({ 
        index: 0,
        routes: [{ name: 'SignIn' }]
      });
    } else if (success && user !== null) {
      navigation.reset({ 
        index: 0,
        routes: [{ name: 'Chat' }]
      });
    }
  }, [success, user, navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.nameIconContainer}>
        <Ionicons name="chatbox-ellipses-outline" style={styles.appIcon} />
        <Text style={styles.appName}>Prudibel</Text>
      </View>

      {
        loading && (
          <Loading color={colorConfig.colorPrimary} />
        )
      }

      {
        error !== null && (
          <LoadingError error={error} onReloadPress={retryFetch} />
        )
      }
  </View>
  );
}
