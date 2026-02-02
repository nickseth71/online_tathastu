import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import auth from '@react-native-firebase/auth';

export default function MobileLogin({ navigation }) {

  const [mobile, setMobile] = useState("");

  const sendOTP = async () => {
    const confirmation = await auth().signInWithPhoneNumber("+91" + mobile);
    navigation.navigate("OTPVerify", { confirmation });
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>

      <TextInput
        style={{
          borderWidth: 1, borderRadius: 10, padding: 15, fontSize: 18
        }}
        placeholder="Enter Mobile Number"
        keyboardType="phone-pad"
        onChangeText={setMobile}
        value={mobile}
      />

      <TouchableOpacity
        style={{ marginTop: 20, padding: 15, backgroundColor: "#f4850f", borderRadius: 10 }}
        onPress={sendOTP}
      >
        <Text style={{ color: "#fff", textAlign: "center", fontSize: 18 }}>Send OTP</Text>
      </TouchableOpacity>

    </View>
  );
}
