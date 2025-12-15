import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView, TouchableOpacity } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default function ProfileScreen() {
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.profileHeader}>
                <Image
                    source={require('../assets/BannerImage1.jpg')}
                    style={styles.profileImage}
                />
                <Text style={styles.name}>John Doe</Text>
                <Text style={styles.email}>johndoe@example.com</Text>
            </View>

            <View style={styles.statsContainer}>
                <View style={styles.statBox}>
                    <Text style={styles.statNumber}>24</Text>
                    <Text style={styles.statLabel}>Posts</Text>
                </View>
                <View style={styles.statBox}>
                    <Text style={styles.statNumber}>102</Text>
                    <Text style={styles.statLabel}>Followers</Text>
                </View>
                <View style={styles.statBox}>
                    <Text style={styles.statNumber}>87</Text>
                    <Text style={styles.statLabel}>Following</Text>
                </View>
            </View>

            <TouchableOpacity style={styles.editButton}>
                <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>

            <View style={styles.infoContainer}>
                <Text style={styles.infoTitle}>Bio</Text>
                <Text style={styles.infoText}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vel risus eget eros volutpat commodo.
                </Text>

                <Text style={styles.infoTitle}>Location</Text>
                <Text style={styles.infoText}>New York, USA</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 15,
    },
    profileHeader: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: screenWidth * 0.3,
        height: screenWidth * 0.3,
        borderRadius: (screenWidth * 0.3) / 2,
        marginBottom: 10,
    },
    name: {
        fontSize: 22,
        fontWeight: '700',
        color: '#333',
    },
    email: {
        fontSize: 16,
        color: '#666',
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 20,
    },
    statBox: {
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 18,
        fontWeight: '700',
        color: '#333',
    },
    statLabel: {
        fontSize: 14,
        color: '#666',
    },
    editButton: {
        backgroundColor: '#f4850fff',
        paddingVertical: 10,
        paddingHorizontal: 40,
        borderRadius: 25,
        marginBottom: 20,
    },
    editButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    infoContainer: {
        width: '100%',
    },
    infoTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#333',
        marginTop: 10,
    },
    infoText: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
        lineHeight: 20,
    },
});
