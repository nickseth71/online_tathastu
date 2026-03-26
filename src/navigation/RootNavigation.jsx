// import React from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { View, ActivityIndicator } from 'react-native';
// import { useUser } from '../context/UserContext';

// import LoginOptions from '../screens/LoginOptionScreen';
// import OTPVerify from '../screens/loginScreens/OTPVerifyScreen';
// import BottomTabs from './BottomTabNavigation';
// import DetailScreen from '../screens/subscreens/DetailScreen';
// import ProductDetailScreen from '../screens/subscreens/ProductDetailScreen';
// import BookPoojaScreen from '../screens/subscreens/BookPoojaScreen';
// import ServiceDetailScreen from '../screens/subscreens/ServiceDetailScreen';
// import NotificationScreen from '../screens/subscreens/NotificationScreen';
// import HelpSupportScreen from '../screens/subscreens/Help&SupportScreen';
// import SettingsScreen from '../screens/subscreens/SettingScreen';
// import PoojaDetailsScreen from '../screens/subscreens/PoojaDetailsScreen';
// import SelectPanditScreen from '../screens/subscreens/SelectPanditScreen';
// import MalaJaapScreen from '../screens/subscreens/MalaJaapScreen';
// import MalaJaapDetail from '../screens/subscreens/MalaJaapDetail';
// import TarotScreen from '../screens/subscreens/TarotScreen';

// const Stack = createNativeStackNavigator();

// export default function RootNavigation() {
//   const { user, loading } = useUser();

//   // ⏳ Wait until AsyncStorage user is loaded
//   if (loading) {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }

//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       {user ? (
//         <>
//           <Stack.Screen name="Main" component={BottomTabs} />
//           <Stack.Screen name="Details" component={DetailScreen} />
//           <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
//           <Stack.Screen name="BookPooja" component={BookPoojaScreen} />
//           <Stack.Screen name="ServiceDetail" component={ServiceDetailScreen} />
//           <Stack.Screen name="Notification" component={NotificationScreen} />
//           <Stack.Screen name="Help&Support" component={HelpSupportScreen} />
//           <Stack.Screen name="Settings" component={SettingsScreen} />
//           <Stack.Screen name="PoojaDetails" component={PoojaDetailsScreen} />
//           <Stack.Screen name="SelectPandit" component={SelectPanditScreen} />
//           <Stack.Screen name="MalaJaap" component={MalaJaapScreen} />
//           <Stack.Screen name="MalaJaapDetail" component={MalaJaapDetail} />
//           <Stack.Screen name="TarotScreen" component={TarotScreen} />




//         </>
//       ) : (
//         <>
//           <Stack.Screen name="LoginOptions" component={LoginOptions} />
//           <Stack.Screen name="OTPVerify" component={OTPVerify} />
//         </>
//       )}
//     </Stack.Navigator>
//   );
// }


import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, ActivityIndicator } from 'react-native';
import { useUser } from '../context/UserContext';

import IntroScreen from '../screens/IntroScreen';
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
import PoojaDetailsScreen from '../screens/subscreens/PoojaDetailsScreen';
import SelectPanditScreen from '../screens/subscreens/SelectPanditScreen';
import MalaJaapScreen from '../screens/subscreens/MalaJaapScreen';
import MalaJaapDetail from '../screens/subscreens/MalaJaapDetail';
import TarotScreen from '../screens/subscreens/TarotScreen';
import SplashScreen from '../screens/SplashScreen';
import StoreScreen from '../screens/StoreScreen';
import BirthDetailScreen from '../screens/ApkeEastKaMandirScreens/BirthDetailScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigation() {
  const { user, loading } = useUser();
  const [showIntro, setShowIntro] = useState(true);
  const [showSplash, setShowSplash] = useState(true);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>

      {showIntro ? (
        <Stack.Screen name="Intro">
          {(props) => (
            <IntroScreen {...props} onFinish={() => setShowIntro(false)} />
          )}
        </Stack.Screen>

      ) : showSplash ? (
        <Stack.Screen name="Splash">
          {(props) => (
            <SplashScreen {...props} onFinish={() => setShowSplash(false)} />
          )}
        </Stack.Screen>

      ) : user ? (
        <>
          <Stack.Screen name="Main" component={BottomTabs} />
          <Stack.Screen name="Details" component={DetailScreen} />
          <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
          <Stack.Screen name="BookPooja" component={BookPoojaScreen} />
          <Stack.Screen name="ServiceDetail" component={ServiceDetailScreen} />
          <Stack.Screen name="Notification" component={NotificationScreen} />
          <Stack.Screen name="Help&Support" component={HelpSupportScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="PoojaDetails" component={PoojaDetailsScreen} />
          <Stack.Screen name="SelectPandit" component={SelectPanditScreen} />
          <Stack.Screen name="MalaJaap" component={MalaJaapScreen} />
          <Stack.Screen name="MalaJaapDetail" component={MalaJaapDetail} />
          <Stack.Screen name="TarotScreen" component={TarotScreen} />
          <Stack.Screen name="StoreScreen" component={StoreScreen} />
          <Stack.Screen name="BirthDetail" component={BirthDetailScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="LoginOptions" component={LoginOptions} />
          <Stack.Screen name="OTPVerify" component={OTPVerify} />
        </>
      )}

    </Stack.Navigator>
  );
}