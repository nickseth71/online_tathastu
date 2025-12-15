import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';

export default function OTPVerify({ route, navigation }) {

  const { confirmation } = route.params;
  const [otp, setOtp] = useState("");

  const confirmCode = async () => {
    try {
      await confirmation.confirm(otp);
      navigation.replace("Home");
    } catch (e) {
      alert("Invalid OTP!");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      
      <TextInput
        style={{
          borderWidth: 1, borderRadius: 10, padding: 15, fontSize: 18
        }}
        placeholder="Enter OTP"
        keyboardType="number-pad"
        onChangeText={setOtp}
        value={otp}
      />

      <TouchableOpacity
        style={{ marginTop: 20, padding: 15, backgroundColor: "#f4850f", borderRadius: 10 }}
        onPress={confirmCode}
      >
        <Text style={{ color: "#fff", textAlign: "center", fontSize: 18 }}>Verify OTP</Text>
      </TouchableOpacity>

    </View>
  );
}
