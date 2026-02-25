import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, ActivityIndicator } from 'react-native';
import { useUser } from '../context/UserContext';

import LoginOptions from '../screens/LoginOptionScreen';
import OTPVerify from '../screens/loginScreens/OTPVerifyScreen';
import BottomTabs from './BottomTabNavigation';
import DetailScreen from '../screens/subscreens/DetailScreen';
import ProductDetailScreen from '../screens/subscreens/ProductDetailScreen';
import BookPoojaScreen from '../screens/subscreens/BookPoojaScreen';
import ServiceDetailScreen from '../screens/subscreens/ServiceDetailScreen';
import NotificationScreen from '../screens/subscreens/NotificationScreen';
import HelpSupportScreen from '../screens/subscreens/Help&SupportScreen';
import SettingsScreen from '../screens/subscreens/SettingScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigation() {
  const { user, loading } = useUser();

  // ⏳ Wait until AsyncStorage user is loaded
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        // ✅ USER LOGGED IN → NO LOGIN SCREENS AT ALL
        <>
          <Stack.Screen name="Main" component={BottomTabs} />
          <Stack.Screen name="Details" component={DetailScreen} />
          <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
          <Stack.Screen name="BookPooja" component={BookPoojaScreen} />
          <Stack.Screen name="ServiceDetail" component={ServiceDetailScreen} />
          <Stack.Screen name="Notification" component={NotificationScreen} />
          <Stack.Screen name="Help&Support" component={HelpSupportScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />

        </>
      ) : (
        // ❌ USER NOT LOGGED IN
        <>
          <Stack.Screen name="LoginOptions" component={LoginOptions} />
          <Stack.Screen name="OTPVerify" component={OTPVerify} />
        </>
      )}
    </Stack.Navigator>
  );
}
