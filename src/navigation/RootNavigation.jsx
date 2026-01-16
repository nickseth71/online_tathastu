import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginOptions from '../screens/LoginOptionScreen';
// import MobileLogin from '../screens/MobileLogin';
import OTPVerify from '../screens/loginScreens/OTPVerifyScreen';
import BottomTabs from './BottomTabNavigation'
import DetailScreen from '../screens/subscreens/DetailScreen';
import ProductDetailScreen from '../screens/subscreens/ProductDetailScreen';
import BookPoojaScreen from '../screens/subscreens/BookPoojaScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigation() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="LoginOptions" component={LoginOptions} />
            {/* <Stack.Screen name="MobileLogin" component={MobileLogin} /> */}
            <Stack.Screen name="OTPVerify" component={OTPVerify} />
            <Stack.Screen name="Main" component={BottomTabs} />
            <Stack.Screen name="Details" component={DetailScreen} />
            <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
            <Stack.Screen name="BookPooja" component={BookPoojaScreen} />
        </Stack.Navigator>
    );
}
