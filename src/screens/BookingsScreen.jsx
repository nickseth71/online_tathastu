import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    Pressable,
} from "react-native";
import { COLORS } from "../theme/colors";
import { navigate } from "../services/NavigationService";

const BookingsScreen = () => {
    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 200 }} showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>My Bookings</Text>
                <Text style={styles.headerSubtitle}>
                    Manage your pooja bookings
                </Text>

                <Pressable
                    style={styles.bookButton}
                    onPress={() => navigate("BookPooja")}
                >
                    <Text style={styles.bookButtonText}>＋ Book New Pooja</Text>
                </Pressable>
            </View>

            {/* Active Bookings */}
            <Text style={styles.sectionTitle}>Active Bookings</Text>

            {/* Booking Card - Confirmed */}
            <View style={styles.card}>

                <Image
                    source={require("../assets/BannerImage1.jpg")}
                    style={styles.cardImage}
                />


                <View style={styles.statusConfirmed}>
                    <Text style={styles.statusText}>Confirmed</Text>
                </View>

                <View style={styles.cardContent}>
                    <Text style={styles.poojaTitle}>Satyanarayan Pooja</Text>

                    <Text style={styles.cardText}>👤 Pandit Rajesh Sharma</Text>
                    <Text style={styles.cardText}>🕒 Dec 20, 2025 at 10:00 AM</Text>
                    <Text style={styles.cardText}>📍 Home Service</Text>

                    <TouchableOpacity style={styles.detailsButton}>
                        <Text style={styles.detailsButtonText}>View Details →</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Booking Card - Pending */}
            <View style={styles.card}>
                <Image
                    source={require("../assets/BannerImage1.jpg")}
                    style={styles.cardImage}
                />

                <View style={styles.statusPending}>
                    <Text style={styles.statusText}>Pending</Text>
                </View>

                <View style={styles.cardContent}>
                    <Text style={styles.poojaTitle}>Griha Pravesh Pooja</Text>

                    <Text style={styles.cardText}>👤 Pandit Vijay Kumar</Text>
                    <Text style={styles.cardText}>🕒 Dec 25, 2025 at 8:00 AM</Text>
                    <Text style={styles.cardText}>📍 New Home</Text>

                    <TouchableOpacity style={styles.detailsButton}>
                        <Text style={styles.detailsButtonText}>View Details →</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

export default BookingsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF6EC",
    },
    header: {
        backgroundColor: COLORS.APP_BACKGROUND,
        padding: 20,
        paddingBottom: 10,
    },
    headerTitle: {
        color: "#fff",
        fontSize: 26,
        fontWeight: "700",
    },
    headerSubtitle: {
        color: "#FFE3CC",
        marginTop: 4,
        fontSize: 14,
    },
    bookButton: {
        backgroundColor: "#fff",
        marginTop: 15,
        marginBottom: -30,
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center",
    },
    bookButtonText: {
        color: "#FF6A00",
        fontSize: 16,
        fontWeight: "600",
    },
    sectionTitle: {
        margin: 20,
        fontSize: 18,
        fontWeight: "600",
        color: "#333",
    },
    card: {
        backgroundColor: "#fff",
        marginHorizontal: 20,
        marginBottom: 20,
        borderRadius: 16,
        overflow: "hidden",
        elevation: 4,
    },
    cardImage: {
        width: "100%",
        height: 150,
    },
    statusConfirmed: {
        position: "absolute",
        top: 12,
        right: 12,
        backgroundColor: "#2ECC71",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
    },
    statusPending: {
        position: "absolute",
        top: 12,
        right: 12,
        backgroundColor: "#F1C40F",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
    },
    statusText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "600",
    },
    cardContent: {
        padding: 16,
    },
    poojaTitle: {
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 8,
        color: "#222",
    },
    cardText: {
        fontSize: 14,
        color: "#555",
        marginBottom: 4,
    },
    detailsButton: {
        backgroundColor: "#FF6A00",
        marginTop: 14,
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: "center",
    },
    detailsButtonText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 15,
    },
});
