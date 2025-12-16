// import React from 'react';
// import {
//     View,
//     Text,
//     StyleSheet,
//     ScrollView,
//     TouchableOpacity,
//     Image,
//     Dimensions,
//     TextInput,
// } from 'react-native';
// import { COLORS } from '../theme/colors';
// import { SvgXml } from 'react-native-svg';
// import { Notification_SVG, Search_SVG } from '../constants/SVGImages';
// const { width } = Dimensions.get('window');

// const QUICK_SERVICES = [
//     { title: 'Book Puja', icon: '🏠' },
//     { title: 'Festival', icon: '📅' },
//     { title: 'Astrology', icon: '⭐' },
//     { title: 'Kundli', icon: '📖' },
// ];

// export default function HomeScreen() {
//     return (
//         <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
//             {/* 🔶 Header */}
//             <View style={styles.header}>
//                 <View>
//                     <Text style={styles.logo}>🔥 Tathastu</Text>
//                     <Text style={styles.subText}>Namaste, Devotee 🙏</Text>
//                 </View>
//                 <View style={styles.bell}>
//                     <SvgXml xml={Notification_SVG} width={24} height={24} />
//                     <View style={styles.notificationDot} />
//                 </View>
//             </View>

//             {/* 🔍 Search */}
//             <View style={styles.searchBox}>
//                 <SvgXml xml={Search_SVG} width={16} height={16} fill="#888" />
//                 <TextInput
//                     placeholder="Search products..."
//                     style={styles.searchInput}
//                 />
//             </View>

//             {/* ⚡ Quick Services */}
//             <View style={styles.card}>
//                 <Text style={styles.sectionTitle}>Quick Services</Text>
//                 <View style={styles.quickRow}>
//                     {QUICK_SERVICES.map((item, index) => (
//                         <TouchableOpacity key={index} style={styles.quickItem}>
//                             <View style={styles.quickIcon}>
//                                 <Text style={{ fontSize: 20 }}>{item.icon}</Text>
//                             </View>
//                             <Text style={styles.quickText}>{item.title}</Text>
//                         </TouchableOpacity>
//                     ))}
//                 </View>
//             </View>

//             {/* 📅 Panchang */}
//             <View style={styles.panchangCard}>
//                 <View style={styles.panchangHeader}>
//                     <Text style={styles.sectionTitle}>Today’s Panchang</Text>
//                     <Text style={styles.date}>Dec 15, 2025</Text>
//                 </View>

//                 <View style={styles.panchangRow}>
//                     <Text style={styles.panchangText}>Tithi: Ekadashi</Text>
//                     <Text style={styles.panchangText}>Nakshatra: Rohini</Text>
//                 </View>
//                 <View style={styles.panchangRow}>
//                     <Text style={styles.panchangText}>Yoga: Shukla</Text>
//                     <Text style={styles.panchangText}>Karana: Bava</Text>
//                 </View>
//             </View>

//             {/* 🔴 Live Darshan */}
//             <View style={styles.sectionHeader}>
//                 <Text style={styles.sectionTitle}>Live Darshan</Text>
//                 <Text style={styles.link}>View All</Text>
//             </View>

//             <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//                 <DarshanCard
//                     image={require('../assets/bannerImage2.jpg')}
//                     title="Golden Temple, Amritsar"
//                     viewers="2.3K watching"
//                 />
//                 <DarshanCard
//                     image={require('../assets/BannerImage1.jpg')}
//                     title="Tirupati Balaji Temple"
//                     viewers="5.1K watching"
//                 />
//             </ScrollView>

//             <View style={{ height: 30 }} />
//         </ScrollView>
//     );
// }

// /* 🎥 Darshan Card */
// const DarshanCard = ({ image, title, viewers }) => (
//     <View style={styles.darshanCard}>
//         <Image source={image} style={styles.darshanImage} />
//         <View style={styles.liveBadge}>
//             <Text style={styles.liveText}>● LIVE</Text>
//         </View>
//         <View style={styles.playIcon}>
//             <Text style={{ fontSize: 26, color: '#fff' }}>▶</Text>
//         </View>
//         <Text style={styles.darshanTitle}>{title}</Text>
//         <Text style={styles.viewers}>{viewers}</Text>
//     </View>
// );

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff6ee',
//     },

//     /* Header */
//     header: {
//         backgroundColor: COLORS.APP_BACKGROUND,
//         padding: 20,
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         borderBottomLeftRadius: 25,
//         borderBottomRightRadius: 25,
//     },
//     logo: {
//         fontSize: 22,
//         fontWeight: 'bold',
//         color: '#fff',
//     },
//     subText: {
//         color: '#ffe6cc',
//         marginTop: 4,
//     },
//     bell: {
//         position: 'relative',
//     },
//     notificationDot: {
//         position: 'absolute',
//         right: -2,
//         top: -2,
//         width: 8,
//         height: 8,
//         backgroundColor: 'red',
//         borderRadius: 4,
//     },

//     /* Search */
//     searchBox: {
//         backgroundColor: '#fff',
//         margin: 16,
//         padding: 14,
//         borderRadius: 30,
//         elevation: 3,
//     },
//     searchText: {
//         color: '#999',
//     },
//     searchInput: {
//         flex: 1,
//         paddingVertical: 8,
//         paddingLeft: 8,
//     },
//     /* Cards */
//     card: {
//         backgroundColor: '#fff',
//         marginHorizontal: 16,
//         padding: 16,
//         borderRadius: 16,
//         elevation: 2,
//     },

//     sectionTitle: {
//         fontSize: 16,
//         fontWeight: '700',
//         marginBottom: 12,
//     },

//     /* Quick Services */
//     quickRow: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//     },
//     quickItem: {
//         alignItems: 'center',
//         width: '23%',
//     },
//     quickIcon: {
//         width: 50,
//         height: 50,
//         borderRadius: 12,
//         backgroundColor: '#fff2e6',
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginBottom: 6,
//     },
//     quickText: {
//         fontSize: 12,
//         fontWeight: '600',
//     },

//     /* Panchang */
//     panchangCard: {
//         backgroundColor: '#fff',
//         margin: 16,
//         padding: 16,
//         borderRadius: 16,
//         elevation: 2,
//     },
//     panchangHeader: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//     },
//     date: {
//         color: '#ff7a00',
//         fontWeight: '600',
//     },
//     panchangRow: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         marginTop: 8,
//     },
//     panchangText: {
//         color: '#444',
//     },

//     /* Live Darshan */
//     sectionHeader: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         marginHorizontal: 16,
//         marginBottom: 10,
//     },
//     link: {
//         color: '#ff7a00',
//         fontWeight: '600',
//     },
//     darshanCard: {
//         width: width * 0.7,
//         marginLeft: 16,
//     },
//     darshanImage: {
//         width: '100%',
//         height: 160,
//         borderRadius: 16,
//     },
//     liveBadge: {
//         position: 'absolute',
//         top: 10,
//         left: 10,
//         backgroundColor: 'red',
//         paddingHorizontal: 8,
//         paddingVertical: 4,
//         borderRadius: 6,
//     },
//     liveText: {
//         color: '#fff',
//         fontSize: 12,
//         fontWeight: '700',
//     },
//     playIcon: {
//         position: 'absolute',
//         top: '40%',
//         left: '45%',
//     },
//     darshanTitle: {
//         marginTop: 8,
//         fontWeight: '700',
//     },
//     viewers: {
//         color: '#777',
//         fontSize: 12,
//     },
// });

import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    Dimensions,
    TextInput,
} from 'react-native';

import { SvgXml } from 'react-native-svg';
import { COLORS } from '../theme/colors';
import { Notification_SVG, Search_SVG } from '../constants/SVGImages';


const { width } = Dimensions.get('window');





const QUICK_SERVICES = [
    { title: 'Book Puja', icon: '🏠' },
    { title: 'Festival', icon: '📅' },
    { title: 'Astrology', icon: '⭐' },
    { title: 'Kundli', icon: '📖' },
];

const DarshanCard = ({ image, title, viewers }) => (
    <View style={styles.darshanCard}>
        {/* Placeholder for actual image source */}
        <Image source={{ uri: 'https://via.placeholder.com/300x160.png?text=Golden+Temple' }} style={styles.darshanImage} />
        <View style={styles.liveBadge}>
            <Text style={styles.liveText}>● LIVE</Text>
        </View>
        <View style={styles.playIcon}>
            <Text style={{ fontSize: 26, color: COLORS.WHITE }}>▶</Text>
        </View>
        <Text style={styles.darshanTitle}>{title}</Text>
        <Text style={styles.viewers}>{viewers}</Text>
    </View>
);

export default function HomeScreen() {
    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 200 }} showsVerticalScrollIndicator={false}>
            {/* 🔶 Header */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.logo}>🔥 Tathastu</Text>
                    <Text style={styles.subText}>Namaste, Devotee 🙏</Text>
                </View>
                <View style={styles.bell}>

                    <SvgXml xml={Notification_SVG} width={24} height={24} />

                </View>
            </View>

            {/* 🔍 Search - Positioned over the header's curve */}
            <View style={styles.searchBoxContainer}>
                <View style={styles.searchBox}>
                    <SvgXml xml={Search_SVG} width={16} height={16} fill="#fff" />
                    <TextInput
                        placeholder="Search poojas, temples, astrologers..."
                        placeholderTextColor="#fff"
                        style={styles.searchInput}
                    />
                </View>
            </View>

            {/* ⚡ Quick Services */}
            <View style={styles.quickServicesCard}>
                <Text style={styles.sectionTitle}>Quick Services</Text>
                <View style={styles.quickRow}>
                    {QUICK_SERVICES.map((item, index) => (
                        <TouchableOpacity key={index} style={styles.quickItem}>
                            <View style={styles.quickIcon}>
                                <Text style={{ fontSize: 24 }}>{item.icon === '🏠' ? '🏡' : item.icon}</Text>
                            </View>
                            <Text style={styles.quickText}>{item.title}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* 📅 Panchang */}
            <View style={styles.panchangCard}>
                <View style={styles.panchangHeader}>
                    <Text style={styles.sectionTitle}>Today’s Panchang</Text>
                    <Text style={styles.date}>Dec 15, 2025</Text>
                </View>
                <View style={styles.panchangGrid}>
                    <View style={styles.panchangItem}>
                        <Text style={styles.panchangLabel}>Tithi:</Text>
                        <Text style={styles.panchangValue}>Ekadashi</Text>
                    </View>
                    <View style={styles.panchangItem}>
                        <Text style={styles.panchangLabel}>Nakshatra:</Text>
                        <Text style={styles.panchangValue}>Rohini</Text>
                    </View>
                    <View style={styles.panchangItem}>
                        <Text style={styles.panchangLabel}>Yoga:</Text>
                        <Text style={styles.panchangValue}>Shukla</Text>
                    </View>
                    <View style={styles.panchangItem}>
                        <Text style={styles.panchangLabel}>Karana:</Text>
                        <Text style={styles.panchangValue}>Bava</Text>
                    </View>
                </View>
            </View>

            {/* 🔴 Live Darshan */}
            <View style={styles.sectionHeader}>
                <Text style={[styles.sectionTitle, styles.liveDarshanTitle]}>Live Darshan <Text style={styles.liveDarshanDot}>🔴</Text></Text>
                <TouchableOpacity>
                    <Text style={styles.link}>View All</Text>
                </TouchableOpacity>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScrollPadding}>
                <DarshanCard
                    title="Golden Temple, Amritsar"
                    viewers="2.3K watching"
                />
                <DarshanCard
                    title="Tirupati Balaji Temple"
                    viewers="5.1K watching"
                />
            </ScrollView>

            <View style={{ height: 30 }} />
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff6ee',
    },

    /* Header */
    header: {
        backgroundColor: COLORS.APP_BACKGROUND,
        padding: 20,
        paddingBottom: 80,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
    },
    logo: {
        fontSize: 22,
        fontWeight: 'bold',
        color: COLORS.WHITE,
    },
    subText: {
        color: '#ffe6cc',
        marginTop: 4,
    },
    bell: {
        position: 'relative',
        padding: 4,
    },
    notificationDot: {
        position: 'absolute',
        right: -5,
        top: -5,
        width: 20,
        height: 20,
        backgroundColor: 'red',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    notificationCount: {
        color: COLORS.WHITE,
        fontSize: 10,
        fontWeight: 'bold',
    },

    /* Search */
    searchBoxContainer: {
        marginTop: -70,
        paddingHorizontal: 16,
    },
    searchBox: {
        backgroundColor: '#fd7a33',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 30,

        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
    },
    searchIcon: {
        fontSize: 16,
        color: '#888',
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 15,
        padding: 0,
    },

    /* Cards */
    quickServicesCard: {
        backgroundColor: COLORS.WHITE,
        marginHorizontal: 16,
        marginTop: 10,
        padding: 16,
        borderRadius: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 1.41,
    },

    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 12,
        color: '#333',
    },

    /* Quick Services */
    quickRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    quickItem: {
        alignItems: 'center',
        width: '20%',
    },
    quickIcon: {
        width: 55,
        height: 55,
        borderRadius: 15,
        backgroundColor: COLORS.LIGHT_ORANGE_BG,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 6,
    },
    quickText: {
        fontSize: 12,
        fontWeight: '600',
        textAlign: 'center',
        color: '#555',
    },

    /* Panchang */
    panchangCard: {
        backgroundColor: COLORS.WHITE,
        margin: 16,
        padding: 16,
        borderRadius: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 1.41,
    },
    panchangHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    date: {
        color: COLORS.ACCENT_ORANGE,
        fontWeight: '600',
    },
    panchangGrid: {
        marginTop: 8,
    },
    panchangItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 4,
    },
    panchangLabel: {
        fontWeight: 'normal',
        color: '#444',
        minWidth: 80,
    },
    panchangValue: {
        fontWeight: '600',
        color: '#333',
    },

    /* Live Darshan */
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 16,
        marginBottom: 10,
    },
    liveDarshanTitle: {
        marginBottom: 0,
    },
    liveDarshanDot: {
        fontSize: 12,
    },
    link: {
        color: COLORS.ACCENT_ORANGE,
        fontWeight: '600',
    },
    horizontalScrollPadding: {
        paddingRight: 16,
    },
    darshanCard: {
        width: width * 0.75,
        marginLeft: 16,
        marginBottom: 10,
    },
    darshanImage: {
        width: '100%',
        height: 160,
        borderRadius: 16,
        resizeMode: 'cover',
    },
    liveBadge: {
        position: 'absolute',
        top: 10,
        left: 10,
        backgroundColor: 'red',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    liveText: {
        color: COLORS.WHITE,
        fontSize: 12,
        fontWeight: '700',
    },
    playIcon: {
        position: 'absolute',
        top: 60, // ~40% of 160
        left: '50%',
        marginLeft: -15, // Center it properly
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    darshanTitle: {
        marginTop: 8,
        fontWeight: '700',
        color: '#333',
    },
    viewers: {
        color: '#777',
        fontSize: 12,
    },
});