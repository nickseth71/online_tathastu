import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigation from './src/navigation/RootNavigation';
import SplashScreen from './src/screens/SplashScreen';
import { configureGoogleSignIn } from './src/config/GoogleConfig';
import { StatusBar } from 'react-native';
import { COLORS } from './src/theme/colors';
import { navigationRef } from './src/services/NavigationService';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    configureGoogleSignIn();
    setTimeout(() => setLoading(false), 2000);
  }, []);

  if (loading) return <SplashScreen />;

  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.APP_BACKGROUND}
      />

      <RootNavigation />
    </NavigationContainer>
  );
}
