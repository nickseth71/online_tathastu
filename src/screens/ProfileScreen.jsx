import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const screenWidth = Dimensions.get('window').width;

export default function ProfileScreen() {
    const insets = useSafeAreaInsets();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [dob, setDob] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [timeOfBirth, setTimeOfBirth] = useState(new Date());
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [birthPlace, setBirthPlace] = useState('');
    const [gender, setGender] = useState('male');
    const [bio, setBio] = useState('');
    const [location, setLocation] = useState('');

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
            <ScrollView
                contentContainerStyle={{
                    paddingBottom: insets.bottom + 40,
                }}
                showsVerticalScrollIndicator={false}
            >
                {/* Banner */}
                <View style={styles.bannerContainer}>
                    <Image
                        source={require('../assets/BannerImage1.jpg')}
                        style={styles.bannerImage}
                    />
                    <View style={styles.profileImageContainer}>
                        <Image
                            source={require('../assets/BannerImage1.jpg')}
                            style={styles.profileImage}
                        />
                    </View>
                </View>

                {/* User Info Inputs */}
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Full Name</Text>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                        placeholder="John Doe"
                    />

                    <Text style={styles.inputLabel}>Email</Text>
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        placeholder="johndoe@example.com"
                        keyboardType="email-address"
                    />

                    <Text style={styles.inputLabel}>Phone</Text>
                    <TextInput
                        style={styles.input}
                        value={phone}
                        onChangeText={setPhone}
                        placeholder="+1 234 567 890"
                        keyboardType="phone-pad"
                    />

                    <Text style={styles.inputLabel}>Date of Birth</Text>
                    <TouchableOpacity
                        style={styles.input}
                        onPress={() => setShowDatePicker(true)}
                    >
                        <Text>{dob.toDateString()}</Text>
                    </TouchableOpacity>
                    {showDatePicker && (
                        <DateTimePicker
                            value={dob}
                            mode="date"
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            onChange={(event, selectedDate) => {
                                setShowDatePicker(Platform.OS === 'ios');
                                if (selectedDate) setDob(selectedDate);
                            }}
                        />
                    )}

                    <Text style={styles.inputLabel}>Time of Birth</Text>
                    <TouchableOpacity
                        style={styles.input}
                        onPress={() => setShowTimePicker(true)}
                    >
                        <Text>{timeOfBirth.toLocaleTimeString()}</Text>
                    </TouchableOpacity>
                    {showTimePicker && (
                        <DateTimePicker
                            value={timeOfBirth}
                            mode="time"
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            onChange={(event, selectedTime) => {
                                setShowTimePicker(Platform.OS === 'ios');
                                if (selectedTime) setTimeOfBirth(selectedTime);
                            }}
                        />
                    )}

                    <Text style={styles.inputLabel}>Place of Birth</Text>
                    <TextInput
                        style={styles.input}
                        value={birthPlace}
                        onChangeText={setBirthPlace}
                        placeholder="New York, USA"
                    />

                    <Text style={styles.inputLabel}>Gender</Text>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={gender}
                            onValueChange={itemValue => setGender(itemValue)}
                            style={{ width: '100%' }}
                        >
                            <Picker.Item label="Male" value="male" />
                            <Picker.Item label="Female" value="female" />
                            <Picker.Item label="Other" value="other" />
                        </Picker>
                    </View>

                    <Text style={styles.inputLabel}>Bio</Text>
                    <TextInput
                        style={[styles.input, { height: 80 }]}
                        value={bio}
                        onChangeText={setBio}
                        placeholder="Tell something about yourself"
                        multiline
                    />

                    <Text style={styles.inputLabel}>Current Location</Text>
                    <TextInput
                        style={styles.input}
                        value={location}
                        onChangeText={setLocation}
                        placeholder="City, Country"
                    />
                </View>

                {/* Save Button */}
                <TouchableOpacity style={styles.saveButton}>
                    <Text style={styles.saveButtonText}>Save Profile</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    bannerContainer: { position: 'relative', width: '100%', height: 150 },
    bannerImage: { width: '100%', height: '100%' },
    profileImageContainer: {
        position: 'absolute',
        bottom: -50,
        left: screenWidth / 2 - 50,
        width: 100,
        height: 100,
        borderRadius: 50,
        overflow: 'hidden',
        borderWidth: 3,
        borderColor: '#fff',
    },
    profileImage: { width: '100%', height: '100%' },
    inputContainer: { width: '90%', alignSelf: 'center', marginTop: 60 },
    inputLabel: { fontSize: 14, fontWeight: '600', color: '#333', marginTop: 15 },
    input: {
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginTop: 5,
        fontSize: 14,
        color: '#333',
    },
    pickerContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginTop: 5,
        overflow: 'hidden',
    },
    saveButton: {
        backgroundColor: '#f4850fff',
        paddingVertical: 15,
        borderRadius: 25,
        width: '90%',
        alignSelf: 'center',
        marginVertical: 30,
        alignItems: 'center',
    },
    saveButtonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
