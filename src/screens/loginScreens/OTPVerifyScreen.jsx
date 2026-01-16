import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SvgXml } from 'react-native-svg';
import { OtpInput } from 'react-native-otp-entry';
import { Back_Arrow_SVG_dark } from '../../constants/SVGImages';

export default function OTPVerify({ route, navigation }) {
  const { confirmation } = route.params;
  const [otp, setOtp] = useState('');

  const confirmCode = async () => {
    try {
      await confirmation.confirm(otp);
      navigation.replace('Home');
    } catch (e) {
      alert('Invalid OTP!');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 🔙 HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <SvgXml xml={Back_Arrow_SVG_dark} width={34} height={34} />
        </TouchableOpacity>
      </View>

      {/* 📱 CONTENT */}
      <View style={styles.content}>
        <Text style={styles.title}>Enter OTP</Text>

        <OtpInput
          numberOfDigits={6}
          onTextChange={text => setOtp(text)}
          focusColor="#f4850f"
          focusStickBlinkingDuration={500}
          theme={{
            pinCodeContainerStyle: styles.otpBox,
            pinCodeTextStyle: styles.otpText,
            focusedPinCodeContainerStyle: styles.otpFocused,
          }}
        />

        <TouchableOpacity
          style={[styles.button, { opacity: otp.length === 6 ? 1 : 0.5 }]}
          onPress={confirmCode}
          disabled={otp.length !== 6}
        >
          <Text style={styles.buttonText}>Verify OTP</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'flex-start',
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
  },

  otpBox: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ddd',
    width: 50,
    height: 55,
  },

  otpFocused: {
    borderColor: '#f4850f',
  },

  otpText: {
    fontSize: 20,
    color: '#000',
    fontWeight: '600',
  },

  button: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#f4850f',
    borderRadius: 10,
  },

  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
  },
});
