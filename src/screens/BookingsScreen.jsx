import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    StatusBar,
    Pressable,
} from "react-native";
import { COLORS } from "../theme/colors";
import { navigate } from "../services/NavigationService";
import { SafeAreaView } from "react-native-safe-area-context";

// Reusable Booking Card Component
const BookingCard = ({ title, pandit, date, location, status, image }) => {
    const isConfirmed = status === "Confirmed";

    return (
        <View style={styles.card}>
            <Image source={image} style={styles.cardImage} />
            {/* Soft Status Badge */}
            <View style={[styles.statusBadge, isConfirmed ? styles.bgSuccess : styles.bgWarning]}>
                <Text style={[styles.statusText, isConfirmed ? styles.textSuccess : styles.textWarning]}>
                    ● {status}
                </Text>
            </View>

            <View style={styles.cardContent}>
                <Text style={styles.poojaTitle}>{title}</Text>

                <View style={styles.infoRow}>
                    <Text style={styles.infoIcon}>👤</Text>
                    <Text style={styles.cardText}>{pandit}</Text>
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.infoIcon}>🕒</Text>
                    <Text style={styles.cardText}>{date}</Text>
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.infoIcon}>📍</Text>
                    <Text style={styles.cardText}>{location}</Text>
                </View>

                <TouchableOpacity
                    style={styles.detailsButton}
                    onPress={() => navigate("Details")}
                    activeOpacity={0.7}
                >
                    <Text style={styles.detailsButtonText}>View Details</Text>
                    <Text style={styles.arrowIcon}>→</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const BookingsScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.APP_BACKGROUND} />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollPadding}
            >
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>My Bookings</Text>
                    <Text style={styles.headerSubtitle}>Manage your spiritual journey</Text>

                    <Pressable
                        style={styles.bookButton}
                        onPress={() => navigate("BookPooja")}
                        activeOpacity={0.9}
                    >
                        <Text style={styles.bookButtonText}>＋ Book New Pooja</Text>
                    </Pressable>
                </View>

                <View style={styles.contentBody}>
                    <Text style={styles.sectionTitle}>Active Bookings</Text>

                    <BookingCard
                        title="Satyanarayan Pooja"
                        pandit="Pandit Rajesh Sharma"
                        date="Dec 20, 2025 • 10:00 AM"
                        location="Home Service"
                        status="Confirmed"
                        image={require("../assets/BannerImage1.jpg")}
                    />

                    <BookingCard
                        title="Griha Pravesh Pooja"
                        pandit="Pandit Vijay Kumar"
                        date="Dec 25, 2025 • 08:00 AM"
                        location="New Home, Sector 45"
                        status="Pending"
                        image={require("../assets/BannerImage1.jpg")}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default BookingsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF6EC",
    },
    scrollPadding: {
        paddingBottom: 100,
    },
    header: {
        backgroundColor: COLORS.APP_BACKGROUND,
        padding: 24,
        paddingBottom: 60,
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
    },
    headerTitle: {
        color: "#fff",
        fontSize: 28,
        fontWeight: "800",
        letterSpacing: -0.5,
    },
    headerSubtitle: {
        color: "rgba(255,255,255,0.7)",
        marginTop: 4,
        fontSize: 15,
    },
    bookButton: {
        backgroundColor: "#fff",
        position: "absolute",
        bottom: -25,
        left: 24,
        right: 24,
        height: 55,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        // Shadow for Button
        elevation: 8,
        shadowColor: COLORS.APP_BACKGROUND,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    bookButtonText: {
        color: COLORS.APP_BACKGROUND,
        fontSize: 16,
        fontWeight: "700",
    },
    contentBody: {
        marginTop: 40,
    },
    sectionTitle: {
        marginHorizontal: 24,
        marginBottom: 16,
        fontSize: 18,
        fontWeight: "700",
        color: "#1A1A1A",
    },
    card: {
        backgroundColor: "#fff",
        marginHorizontal: 20,
        marginBottom: 20,
        borderRadius: 24,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#F0F0F0",
        // Premium Shadow
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
    },
    cardImage: {
        width: "100%",
        height: 140,
    },
    statusBadge: {
        position: "absolute",
        top: 12,
        right: 12,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    bgSuccess: { backgroundColor: "#E8F8EF" },
    bgWarning: { backgroundColor: "#FEF9E7" },
    textSuccess: { color: "#27AE60", fontWeight: "700", fontSize: 12 },
    textWarning: { color: "#F39C12", fontWeight: "700", fontSize: 12 },

    cardContent: {
        padding: 20,
    },
    poojaTitle: {
        fontSize: 20,
        fontWeight: "800",
        marginBottom: 12,
        color: "#1A1A1A",
    },
    infoRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    infoIcon: {
        fontSize: 14,
        marginRight: 8,
        width: 20,
    },
    cardText: {
        fontSize: 14,
        color: "#666",
        fontWeight: "500",
    },
    detailsButton: {
        backgroundColor: "#F5F5F5",
        marginTop: 16,
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 14,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    detailsButtonText: {
        color: "#333",
        fontWeight: "700",
        fontSize: 15,
    },
    arrowIcon: {
        color: "#333",
        fontSize: 18,
    }
});