import { StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colorConfig } from '../configs/color.config';
import { sizingConfig } from '../configs/sizing.config';

const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: colorConfig.colorPrimary,
  },

  nameIconContainer: {
    alignItems: 'center'
  },

  appName: {
    fontSize: 40,
    color: colorConfig.colorOnPrimary
  },

  appIcon: {
    fontSize: 80,
    color: colorConfig.colorOnPrimary
  },

  success: {
    fontSize: sizingConfig.large,
    color: colorConfig.colorOnPrimary
  }
});

export const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.nameIconContainer}>
        <Ionicons name="chatbox-ellipses-outline" style={styles.appIcon} />
        <Text style={styles.appName}>Prudibel</Text>
      </View>
      {/* {
        loading &&
        <Loading color={AppColors.colorOnPrimary} />
      }
      {
        error !== null &&
        <LoadingError error={errorMessage(error ?? '')} onReloadPress={retryFetch} />
      }
      {
        success && 
        <Text style={styles.success}>{ t('All_set_let_s_go') }</Text>
      } */}
  </View>
  );
}
