import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SvgXml } from 'react-native-svg';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import BlogsScreen from '../screens/BlogScreen';
import StoreScreen from '../screens/StoreScreen';

import { lotusSvg, profileSvg, storeSvg, blogsSvg } from '../constants/SVGImages';


const Tab = createBottomTabNavigator();

export default function BottomTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ color }) => {
                    const IconSize = 30;
                    switch (route.name) {
                        case 'Home':
                            return <SvgXml xml={lotusSvg} width={IconSize} height={IconSize} fill={color} />;
                        case 'Profile':
                            return <SvgXml xml={profileSvg} width={IconSize} height={IconSize} fill={color} />;
                        case 'Store':
                            return <SvgXml xml={storeSvg} width={IconSize} height={IconSize} fill={color} />;
                        case 'Blogs':
                            return <SvgXml xml={blogsSvg} width={IconSize} height={IconSize} fill={color} />;
                        default:
                            return null;
                    }
                },
                tabBarActiveTintColor: '#ffffff',
                tabBarInactiveTintColor: '#000',
                tabBarStyle: {
                    backgroundColor: '#f4850fff',
                    position: 'absolute',
                    height: 60,
                    borderTopLeftRadius: 16,
                    borderTopRightRadius: 16,
                    paddingBottom: 10,
                    borderTopWidth: 0,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    marginBottom: 5,
                },
            })}
        >

            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Blogs" component={BlogsScreen} />
            <Tab.Screen name="Store" component={StoreScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
}

