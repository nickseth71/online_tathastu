import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SvgXml } from 'react-native-svg';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import BlogsScreen from '../screens/BlogScreen';
import StoreScreen from '../screens/StoreScreen';
import BookingsScreen from '../screens/BookingsScreen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { lotusSvg, profileSvg, storeSvg, blogsSvg, BookingSvg } from '../constants/SVGImages';


const Tab = createBottomTabNavigator();

export default function BottomTabs() {
    const insets = useSafeAreaInsets();
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ color }) => {
                    const IconSize = 30;
                    switch (route.name) {
                        case 'होम':
                            return <SvgXml xml={lotusSvg} width={IconSize} height={IconSize} fill={color} />;
                        case 'बुकिंग्स':
                            return <SvgXml xml={BookingSvg} width={IconSize} height={IconSize} fill={color} />;
                        case 'प्रोफाइल':
                            return <SvgXml xml={profileSvg} width={IconSize} height={IconSize} fill={color} />;
                        case 'स्टोर':
                            return <SvgXml xml={storeSvg} width={IconSize} height={IconSize} fill={color} />;
                        case 'ब्लॉग':
                            return <SvgXml xml={blogsSvg} width={IconSize} height={IconSize} fill={color} />;
                        default:
                            return null;
                    }
                },
                tabBarActiveTintColor: '#f97316',
                tabBarInactiveTintColor: '#6a7282',
                tabBarStyle: {
                    position: 'absolute',
                    height: 60 + insets.bottom,
                    borderTopLeftRadius: 16,
                    borderTopRightRadius: 16,
                    paddingBottom: insets.bottom > 0 ? insets.bottom : 10,
                    borderTopWidth: 0,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    marginBottom: 5,
                },
            })}
        >

            <Tab.Screen name="होम" component={HomeScreen} />
            <Tab.Screen name="बुकिंग्स" component={BookingsScreen} />
            <Tab.Screen name="ब्लॉग" component={BlogsScreen} />
            <Tab.Screen name="स्टोर" component={StoreScreen} />
            <Tab.Screen name="प्रोफाइल" component={ProfileScreen} />
        </Tab.Navigator>
    );
}

