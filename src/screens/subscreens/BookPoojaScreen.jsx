import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    FlatList,
    Image,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { COLORS } from "../../theme/colors";
import { Back_Arrow_SVG } from "../../constants/SVGImages";
import { SvgXml } from "react-native-svg";

const BookPoojaScreen = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState("All Pujas");

    const POOJAS = [
        {
            id: "1",
            title: "Satyanarayan Pooja",
            desc: "For prosperity and blessings",
            price: "₹2100 • 2–3 hours",
            category: "All",
            image: require("../../assets/BannerImage1.jpg"),
        },
        {
            id: "2",
            title: "Ganesh Pooja",
            desc: "Remove obstacles and bring success",
            price: "₹1800 • 1–2 hours",
            category: "Festivals",
            image: require("../../assets/BannerImage1.jpg"),
        },
        {
            id: "3",
            title: "Shani Shanti Pooja",
            desc: "Reduce malefic effects",
            price: "₹2800 • 2–3 hours",
            category: "Graha Shanti",
            image: require("../../assets/BannerImage1.jpg"),
        },
    ];

    const filteredPoojas = POOJAS.filter(pooja =>
        activeTab === "All Pujas" || pooja.category === activeTab
    );

    return (
        <View style={styles.container}>

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <SvgXml xml={Back_Arrow_SVG} />
                </TouchableOpacity>

                <Text style={styles.headerTitle}>Book Pooja</Text>
                <Text style={styles.headerSubtitle}>Choose from various pujas</Text>

                <View style={styles.searchBox}>
                    <TextInput
                        placeholder="Search pujas..."
                        placeholderTextColor="#FFE3CC"
                    />
                </View>
            </View>

            {/* Tabs */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.tabs}
            >
                {["All Pujas", "Festivals", "Graha Shanti", "Occasions"].map(tab => (
                    <TouchableOpacity
                        key={tab}
                        onPress={() => setActiveTab(tab)}
                        activeOpacity={0.8}
                    >
                        <View
                            style={[
                                styles.tab,
                                activeTab === tab && styles.activeTab,
                            ]}
                        >
                            <Text
                                style={[
                                    styles.tabText,
                                    activeTab === tab && styles.activeTabText
                                ]}
                            >
                                {tab}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Pooja List */}
            <FlatList
                data={filteredPoojas}
                keyExtractor={(item) => item.id}
                renderItem={({ item: pooja }) => (
                    <View style={styles.card}>
                        <Image source={pooja.image} style={styles.cardImage} />

                        <View style={styles.cardContent}>
                            <Text style={styles.title}>{pooja.title}</Text>
                            <Text style={styles.desc}>{pooja.desc}</Text>

                            <View style={styles.priceRow}>
                                <Text style={styles.price}>
                                    {pooja.price.split('•')[0].trim()}
                                </Text>
                                <Text style={styles.duration}>
                                    {pooja.price.split('•')[1]?.trim()}
                                </Text>
                            </View>
                        </View>
                    </View>
                )}
                contentContainerStyle={styles.poojaListContainer}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {

        backgroundColor: "#FFF6EC",
    },

    header: {
        backgroundColor: COLORS.APP_BACKGROUND,
        padding: 20,
        paddingBottom: 16,
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

    searchBox: {
        backgroundColor: '#fd7a33',
        borderRadius: 12,
        marginTop: 16,
        paddingHorizontal: 12,
        height: 44,
        justifyContent: "center",
    },

    tabs: {
        paddingHorizontal: 12,
        paddingVertical: 8,
    },

    tab: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        marginRight: 10,
        backgroundColor: "#F2F2F2",
    },

    activeTab: {
        backgroundColor: "#FF6A00",
    },

    tabText: {
        color: "#555",
        fontSize: 14,
        fontWeight: "500",
    },

    activeTabText: {
        color: "#fff",
    },

    poojaListContainer: {

        paddingBottom: 20,
    },

    card: {
        // alignSelf: "stretch",
        flexDirection: "row",
        backgroundColor: "#fff",
        marginHorizontal: 16,
        marginVertical: 8,
        borderRadius: 14,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },

    cardImage: {
        width: 90,
        height: 90,
        borderRadius: 12,
        margin: 12,
    },

    cardContent: {
        flex: 1,
        paddingVertical: 14,
        paddingRight: 14,
    },

    title: {
        fontSize: 16,
        fontWeight: "700",
        color: "#222",
    },

    desc: {
        marginTop: 4,
        color: "#777",
        fontSize: 13,
    },

    priceRow: {
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    price: {
        color: "#FF6A00",
        fontSize: 15,
        fontWeight: "700",
    },

    duration: {
        color: "#999",
        fontSize: 12,
    },
});

export default BookPoojaScreen;