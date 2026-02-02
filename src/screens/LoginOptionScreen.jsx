import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
  TextInput,
  Dimensions,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Config from 'react-native-config';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { SvgXml } from 'react-native-svg';
import { googleSvg } from '../constants/SVGImages';

const WEB_CLIENT_ID = Config.WEB_CLIENT_ID;
const SHOPIFY_STORE_URL = Config.SHOPIFY_STORE_URL;
const SHOPIFY_ADMIN_TOKEN = Config.SHOPIFY_API_KEY;

// console.log('Environment Variables:', {
//   WEB_CLIENT_ID,
//   SHOPIFY_STORE_URL,
//   SHOPIFY_ADMIN_TOKEN,
// });
const { width, height } = Dimensions.get('window');

export default function LoginOptions({ navigation }) {
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: WEB_CLIENT_ID,
    });
  }, []);

  // --- NEW: SEARCH FOR CUSTOMER BY PHONE ---
  const checkCustomerExists = async formattedPhone => {
    try {
      const response = await fetch(
        `https://${SHOPIFY_STORE_URL}/admin/api/2024-01/customers/search.json?query=phone:${formattedPhone}`,
        {
          method: 'GET',
          headers: { 'X-Shopify-Access-Token': SHOPIFY_ADMIN_TOKEN },
        },
      );
      const data = await response.json();
      return data.customers.length > 0 ? data.customers[0] : null;
    } catch (error) {
      console.error('Search Error:', error);
      return null;
    }
  };

  // --- NEW: CREATE CUSTOMER WITH PHONE ---
  const createShopifyCustomerByPhone = async formattedPhone => {
    const payload = {
      customer: {
        phone: formattedPhone,
        verified_email: false,
        tags: 'Mobile-App-User',
      },
    };

    try {
      const response = await fetch(
        `https://${SHOPIFY_STORE_URL}/admin/api/2024-01/customers.json`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': SHOPIFY_ADMIN_TOKEN,
          },
          body: JSON.stringify(payload),
        },
      );
      const data = await response.json();
      return data.customer;
    } catch (error) {
      console.error('Create Phone Customer Error:', error);
      return null;
    }
  };

  // --- UPDATED MOBILE LOGIN HANDLER ---
  const handleMobileLogin = async () => {
    if (mobile.length !== 10) {
      return Alert.alert('Invalid', 'Please enter a 10-digit mobile number');
    }

    setLoading(true);
    const formattedPhone = `+91${mobile}`;

    try {
      // 1. Check if user exists in Shopify
      const existingUser = await checkCustomerExists(formattedPhone);

      // 2. Trigger Firebase Phone Auth (Sends SMS)
      const confirmation = await auth().signInWithPhoneNumber(formattedPhone);

      navigation.navigate('OTPVerify', {
        mobile: formattedPhone,
        confirmation: confirmation,
        isNewUser: !existingUser,
      });
    } catch (error) {
      console.error('Firebase Auth Error:', error);
      Alert.alert('Error', 'Unable to send SMS. Please check your number.');
    } finally {
      setLoading(false);
    }
  };
  // --- SHOPIFY HELPER ---
  const createShopifyCustomer = async googleUser => {
    const customerPayload = {
      customer: {
        first_name: googleUser.givenName || '',
        last_name: googleUser.familyName || '',
        email: googleUser.email,
        verified_email: true,
        password: `Google_${googleUser.id}`,
        password_confirmation: `Google_${googleUser.id}`,
        send_email_welcome: true,
        tags: 'Google-App-User',
      },
    };

    try {
      const response = await fetch(
        `https://${SHOPIFY_STORE_URL}/admin/api/2024-01/customers.json`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': SHOPIFY_ADMIN_TOKEN,
          },
          body: JSON.stringify(customerPayload),
        },
      );

      const data = await response.json();

      if (response.status === 201) {
        console.log('Shopify: Customer created successfully');
      } else if (response.status === 422) {
        console.log('Shopify: Customer already exists or invalid data.');
      } else {
        console.log('Shopify API Error:', data);
      }
    } catch (error) {
      console.error('Network Error calling Shopify:', error);
    }
  };

  // --- GOOGLE SIGN IN LOGIC ---
  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      const response = await GoogleSignin.signIn();
      const userInfo = response.data;

      if (!userInfo || !userInfo.user) {
        throw new Error('Google Sign-In failed. User info not received.');
      }

      // 🔥 CREATE CUSTOMER IN SHOPIFY
      await createShopifyCustomer(userInfo.user);

      const name = userInfo.user.name || userInfo.user.email;
      setLoading(false);

      Alert.alert('Login Success', `Welcome, ${name}`, [
        { text: 'OK', onPress: () => navigation.replace('Main') },
      ]);
    } catch (error) {
      setLoading(false);
      console.log('Google Sign-In Error:', error);

      if (error.code === statusCodes.SIGN_IN_CANCELLED) return;
      if (error.code === statusCodes.IN_PROGRESS) return;
      if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE)
        return Alert.alert('Error', 'Google Play Services outdated');

      Alert.alert('Error', error.message);
    }
  };

  const handleSkip = () => navigation.replace('Main');

  return (
    <LinearGradient colors={['#ffe8d3', '#fff']} style={{ flex: 1 }}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <Image
            source={require('../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={styles.title}>
            Welcome to <Text style={{ color: '#f4850f' }}>Online Tathastu</Text>
          </Text>

          <View style={styles.card}>
            <Text style={styles.label}>Login with Mobile</Text>

            <TextInput
              style={styles.mobileInput}
              placeholder="Enter Mobile Number"
              placeholderTextColor={'#a49999ff'}
              keyboardType="number-pad"
              maxLength={10}
              value={mobile}
              onChangeText={setMobile}
            />

            <TouchableOpacity
              style={[
                styles.mobileButton,
                mobile.length === 10 ? {} : { opacity: 0.5 },
              ]}
              onPress={handleMobileLogin}
              disabled={mobile.length !== 10}
            >
              <Text style={styles.mobileText}>Submit</Text>
            </TouchableOpacity>

            <View style={styles.separatorContainer}>
              <View style={styles.separatorLine} />
              <Text style={styles.separatorText}>OR</Text>
              <View style={styles.separatorLine} />
            </View>

            <TouchableOpacity
              style={styles.googleButton}
              onPress={handleGoogleSignIn}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#f4850f" />
              ) : (
                <>
                  <SvgXml xml={googleSvg} width={22} height={22} />
                  <Text style={styles.googleText}>Continue with Google</Text>
                </>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.bottomArea}>
            <TouchableOpacity onPress={handleSkip} style={styles.skip}>
              <Text style={styles.skipText}>Skip for now →</Text>
            </TouchableOpacity>

            <Text style={styles.termsText}>
              By continuing, you agree to our
              <Text style={styles.linkText}> Terms </Text>
              and
              <Text style={styles.linkText}> Privacy Policy</Text>.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    padding: width * 0.05,
  },
  logo: {
    width: width * 0.5,
    height: height * 0.15,
    alignSelf: 'center',
    marginTop: height * 0.05,
  },
  title: {
    fontSize: width * 0.07,
    fontWeight: '800',
    color: '#222',
    textAlign: 'center',
    lineHeight: width * 0.09,
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: width * 0.05,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 15,
      },
      android: { elevation: 8 },
    }),
  },
  label: {
    fontSize: width * 0.045,
    fontWeight: '600',
    marginBottom: 10,
    color: '#444',
  },
  mobileInput: {
    height: height * 0.065,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: width * 0.045,
  },
  mobileButton: {
    height: height * 0.065,
    backgroundColor: '#f4850f',
    borderRadius: 10,
    justifyContent: 'center',
    marginBottom: 20,
  },
  mobileText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: width * 0.045,
    fontWeight: '600',
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  separatorLine: { flex: 1, height: 1, backgroundColor: '#ddd' },
  separatorText: {
    marginHorizontal: 10,
    color: '#999',
    fontWeight: '600',
    fontSize: width * 0.035,
  },
  googleButton: {
    flexDirection: 'row',
    height: height * 0.065,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  googleText: { fontSize: width * 0.045, fontWeight: '500', color: '#333' },
  bottomArea: { alignItems: 'center', marginBottom: height * 0.03 },
  skip: { marginTop: 10 },
  skipText: {
    color: '#555',
    fontSize: width * 0.04,
    textDecorationLine: 'underline',
  },
  termsText: {
    marginTop: height * 0.05,
    fontSize: width * 0.03,
    textAlign: 'center',
    color: '#666',
  },
  linkText: { color: '#f4850f', fontWeight: '700' },
});
