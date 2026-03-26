import React, { useEffect, useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import RootNavigation from './src/navigation/RootNavigation';
import SplashScreen from './src/screens/SplashScreen';
import { configureGoogleSignIn } from './src/config/GoogleConfig';
import { StatusBar } from 'react-native';
import { COLORS } from './src/theme/colors';
import { navigationRef } from './src/services/NavigationService';
import { UserProvider } from './src/context/UserContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  useEffect(() => {
    configureGoogleSignIn();
  }, []);

  return (
    <SafeAreaProvider>
      <UserProvider>
        <NavigationContainer ref={navigationRef}>
          <StatusBar
            barStyle="light-content"
            backgroundColor={COLORS.APP_BACKGROUND}
          />
          <RootNavigation />
        </NavigationContainer>
      </UserProvider>
    </SafeAreaProvider>
  );
}
