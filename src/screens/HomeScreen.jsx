// import React, { useState, useEffect } from 'react';
// import {
//     View,
//     Text,
//     StyleSheet,
//     ScrollView,
//     TouchableOpacity,
//     Dimensions,
//     TextInput,
//     Image,
//     ActivityIndicator,
//     Modal,
//     FlatList,
// } from 'react-native';

// import { SvgXml } from 'react-native-svg';
// import { COLORS } from '../theme/colors';
// import { Back_Arrow_SVG, Notification_SVG, Search_SVG } from '../constants/SVGImages';
// import Video from 'react-native-video';
// import { navigate } from '../services/NavigationService';

// const { width, height } = Dimensions.get('window');
// const ICON_CONTAINER_SIZE = width * 0.18;

// const QUICK_SERVICES = [
//     { title: 'Dharma', icon: require('../assets/Dharma.png') },
//     { title: 'Karam Kand', icon: require('../assets/Karamkand.png') },
//     { title: 'Jyotish', icon: require('../assets/jyotish.png') },
//     { title: 'Vastu', icon: require('../assets/Vastu.png') },
//     { title: 'Jyotish Sikhe', icon: require('../assets/JyotishSikhen.png') },
//     { title: 'Kundali', icon: require('../assets/Vastu.png') },
// ];

// const ALL_LIVE_VIDEOS = [
//     { id: '1', title: "Golden Temple, Amritsar", viewers: "2.3K watching", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
//     { id: '2', title: "Tirupati Balaji Temple", viewers: "5.1K watching", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" },
//     { id: '3', title: "Kashi Vishwanath", viewers: "1.2K watching", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
//     { id: '4', title: "Somnath Temple", viewers: "800 watching", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" },
// ];

// // Reusable Panchang Row Component
// const PanchangRow = ({ label, value }) => (
//     <View style={styles.panchangItem}>
//         <Text style={styles.panchangLabel}>{label}:</Text>
//         <Text style={styles.panchangValue}>{value}</Text>
//     </View>
// );

// const DarshanCard = ({ videoUrl, title, viewers, onPress, isGrid }) => (
//     <TouchableOpacity
//         style={[
//             styles.darshanCard,
//             isGrid && styles.gridCard
//         ]}
//         onPress={onPress}
//     >
//         <View style={styles.videoWrapper}>
//             <Video
//                 source={{ uri: videoUrl }}
//                 style={styles.darshanVideo}
//                 resizeMode="cover"
//                 repeat
//                 muted
//                 paused={false}
//             />
//             <View style={styles.liveBadge}>
//                 <Text style={styles.liveText}>● LIVE</Text>
//             </View>
//             <View style={styles.playIcon}>
//                 <Text style={{ fontSize: 20, color: COLORS.WHITE }}>▶</Text>
//             </View>
//         </View>
//         <Text style={styles.darshanTitle} numberOfLines={1}>
//             {title}
//         </Text>
//         <Text style={styles.viewers}>{viewers}</Text>
//     </TouchableOpacity>
// );

// export default function HomeScreen() {
//     // --- Dynamic Panchang State ---
//     const [panchang, setPanchang] = useState({
//         tithi: '',
//         nakshatra: '',
//         yoga: '',
//         karana: '',
//         displayDate: ''
//     });
//     const [isLoadingPanchang, setIsLoadingPanchang] = useState(true);

//     // --- Modal States ---
//     const [allVideosVisible, setAllVideosVisible] = useState(false);
//     const [modalVisible, setModalVisible] = useState(false);
//     const [selectedVideo, setSelectedVideo] = useState(null);

//     useEffect(() => {
//         getTodayPanchang();
//     }, []);

//     const getTodayPanchang = async () => {
//         try {
//             const today = new Date();
//             const formattedDate = today.toLocaleDateString('en-US', {
//                 month: 'short',
//                 day: 'numeric',
//                 year: 'numeric',
//             });

//             setTimeout(() => {
//                 setPanchang({
//                     tithi: 'Ekadashi',
//                     nakshatra: 'Rohini',
//                     yoga: 'Shukla',
//                     karana: 'Bava',
//                     displayDate: formattedDate
//                 });
//                 setIsLoadingPanchang(false);
//             }, 1000);
//         } catch (error) {
//             console.error("Error fetching panchang:", error);
//             setIsLoadingPanchang(false);
//         }
//     };

//     const handleNotificationPress = () => {
//         navigate('Notification');
//     };

//     const handleVideoPress = (url) => {
//         setSelectedVideo(url);
//         setModalVisible(true);
//     };

//     return (
//         <View style={{ flex: 1 }}>
//             <ScrollView
//                 style={styles.container}
//                 contentContainerStyle={{ paddingBottom: 100 }}
//                 showsVerticalScrollIndicator={false}
//             >
//                 {/* 🔶 Header */}
//                 <View style={styles.header}>
//                     <View>
//                         <Text style={styles.logo}>🔥 Tathastu</Text>
//                         <Text style={styles.subText}>Namaste, Devotee 🙏</Text>
//                     </View>
//                     <View style={styles.bell}>
//                         <TouchableOpacity onPress={handleNotificationPress}>
//                             <SvgXml xml={Notification_SVG} width={24} height={24} />
//                         </TouchableOpacity>
//                     </View>
//                 </View>

//                 {/* 🔍 Search */}
//                 {/* <View style={styles.searchBoxContainer}>
//                     <View style={styles.searchBox}>
//                         <SvgXml xml={Search_SVG} width={16} height={16} fill="#fff" />
//                         <TextInput
//                             placeholder="Search poojas, temples, astrologers..."
//                             placeholderTextColor="#fff"
//                             style={styles.searchInput}
//                         />
//                     </View>
//                 </View> */}

//                 {/* ⚡ Quick Services */}
//                 <View style={styles.quickServicesCard}>
//                     <Text style={styles.sectionTitle}>Quick Services</Text>
//                     <View style={styles.quickGrid}>
//                         {QUICK_SERVICES.map((item, index) => (
//                             <TouchableOpacity
//                                 key={index}
//                                 style={styles.quickBlock}
//                                 onPress={() => navigate('ServiceDetail', { title: item.title })}
//                             >
//                                 <View style={styles.quickIcon}>
//                                     <Image
//                                         source={item.icon}
//                                         style={styles.quickIconImage}
//                                         resizeMode="contain"
//                                     />
//                                 </View>
//                                 <Text style={styles.quickText}>{item.title}</Text>
//                             </TouchableOpacity>
//                         ))}
//                     </View>
//                 </View>

//                 {/* 📅 Dynamic Panchang */}
//                 <View style={styles.panchangCard}>
//                     <View style={styles.panchangHeader}>
//                         <Text style={styles.sectionTitle}>Today’s Panchang</Text>
//                         <Text style={styles.date}>{panchang.displayDate || 'Loading...'}</Text>
//                     </View>

//                     {isLoadingPanchang ? (
//                         <ActivityIndicator size="small" color={COLORS.ACCENT_ORANGE} style={{ marginVertical: 20 }} />
//                     ) : (
//                         <View style={styles.panchangGrid}>
//                             <PanchangRow label="Tithi" value={panchang.tithi} />
//                             <PanchangRow label="Nakshatra" value={panchang.nakshatra} />
//                             <PanchangRow label="Yoga" value={panchang.yoga} />
//                             <PanchangRow label="Karana" value={panchang.karana} />
//                         </View>
//                     )}
//                 </View>

//                 {/* 🔴 Live Darshan */}
//                 <View style={styles.sectionHeader}>
//                     <Text style={styles.sectionTitle}>Live Darshan 🔴</Text>
//                     <TouchableOpacity onPress={() => setAllVideosVisible(true)}>
//                         <Text style={styles.link}>View All</Text>
//                     </TouchableOpacity>
//                 </View>

//                 <ScrollView
//                     horizontal
//                     showsHorizontalScrollIndicator={false}
//                     contentContainerStyle={styles.horizontalScrollPadding}
//                 >
//                     <DarshanCard
//                         title="Golden Temple, Amritsar"
//                         viewers="2.3K watching"
//                         videoUrl="https://www.w3schools.com/html/mov_bbb.mp4"
//                         onPress={() => handleVideoPress("https://www.w3schools.com/html/mov_bbb.mp4")}
//                     />
//                     <DarshanCard
//                         title="Tirupati Balaji Temple"
//                         viewers="5.1K watching"
//                         videoUrl="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
//                         onPress={() => handleVideoPress("https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4")}
//                     />
//                 </ScrollView>
//             </ScrollView>

//             {/* 📺 Video Popup Modal */}
//             <Modal
//                 animationType="fade"
//                 transparent={true}
//                 visible={modalVisible}
//                 onRequestClose={() => setModalVisible(false)}
//             >
//                 <View style={styles.modalOverlay}>
//                     <View style={styles.modalContent}>
//                         <TouchableOpacity
//                             style={styles.closeButton}
//                             onPress={() => setModalVisible(false)}
//                         >
//                             <Text style={styles.closeText}>✕</Text>
//                         </TouchableOpacity>
//                         <Video
//                             source={{ uri: selectedVideo }}
//                             style={styles.popupVideo}
//                             resizeMode="contain"
//                             controls={true}
//                         />
//                     </View>
//                 </View>
//             </Modal>
//             <Modal animationType="slide" visible={allVideosVisible} onRequestClose={() => setAllVideosVisible(false)}>
//                 <View style={styles.fullListContainer}>
//                     <View style={styles.listHeader}>
//                         <TouchableOpacity onPress={() => setAllVideosVisible(false)}>
//                             <SvgXml xml={Back_Arrow_SVG} width={28} height={28} fill="#fff" />
//                         </TouchableOpacity>
//                         <Text style={styles.listHeaderTitle}>All Live Darshans</Text>
//                         <View style={{ width: 50 }} />
//                     </View>
//                     <FlatList
//                         data={ALL_LIVE_VIDEOS}
//                         keyExtractor={(item) => item.id}
//                         numColumns={2}
//                         columnWrapperStyle={{ justifyContent: 'space-between' }}
//                         contentContainerStyle={{ padding: 16 }}
//                         renderItem={({ item }) => (
//                             <DarshanCard
//                                 title={item.title}
//                                 viewers={item.viewers}
//                                 videoUrl={item.videoUrl}
//                                 onPress={() => handleVideoPress(item.videoUrl)}
//                                 isGrid
//                             />
//                         )}
//                     />
//                 </View>
//             </Modal>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: { flex: 1, backgroundColor: '#fff6ee' },
//     header: {
//         backgroundColor: COLORS.APP_BACKGROUND,
//         padding: 20,
//         paddingBottom: 80,
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'flex-start',
//         borderBottomLeftRadius: 24,
//         borderBottomRightRadius: 24,
//     },
//     logo: { fontSize: 22, fontWeight: 'bold', color: COLORS.WHITE },
//     subText: { color: '#ffe6cc', marginTop: 4 },
//     bell: { padding: 6, backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: 20 },
//     searchBoxContainer: { marginTop: -35, paddingHorizontal: 16 },
//     searchBox: {
//         backgroundColor: '#fd7a33',
//         flexDirection: 'row',
//         alignItems: 'center',
//         paddingHorizontal: 16,
//         height: 50,
//         borderRadius: 30,
//         elevation: 5,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 3.84,
//     },
//     searchInput: { flex: 1, fontSize: 15, color: '#fff', marginLeft: 10 },
//     quickServicesCard: {
//         backgroundColor: COLORS.WHITE,
//         marginHorizontal: 16,
//         marginTop: 20,
//         padding: 16,
//         borderRadius: 16,
//         elevation: 2,
//     },
//     quickGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
//     quickBlock: {
//         width: '48%',
//         backgroundColor: COLORS.PRIMARY,
//         borderRadius: 18,
//         paddingVertical: 15,
//         marginBottom: 15,
//         alignItems: 'center',
//     },
//     quickIcon: { width: ICON_CONTAINER_SIZE, height: ICON_CONTAINER_SIZE, marginBottom: 5 },
//     quickIconImage: { width: '100%', height: '100%' },
//     quickText: { fontSize: 13, fontWeight: '700', color: '#fff' },
//     sectionTitle: { fontSize: 16, fontWeight: '700', color: '#333', marginBottom: 10 },
//     panchangCard: {
//         backgroundColor: COLORS.WHITE,
//         margin: 16,
//         padding: 16,
//         borderRadius: 16,
//         elevation: 2,
//     },
//     panchangHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
//     date: { color: COLORS.ACCENT_ORANGE, fontWeight: '600' },
//     panchangItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 },
//     panchangLabel: { color: '#666' },
//     panchangValue: { fontWeight: '600', color: '#333' },
//     sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 16, marginTop: 10 },
//     liveDarshanTitle: { marginBottom: 10 },
//     liveDarshanDot: { fontSize: 12 },
//     link: { color: COLORS.ACCENT_ORANGE, fontWeight: '600' },
//     horizontalScrollPadding: { paddingRight: 16 },
//     darshanCard: {
//         width: width * 0.75,
//         marginLeft: 16,
//         marginBottom: 16,
//     },
//     gridCard: {
//         width: (width - 48) / 2,
//         marginLeft: 0,
//     },
//     videoWrapper: { width: '100%', height: 160, borderRadius: 16, overflow: 'hidden' },
//     darshanVideo: { width: '100%', height: '100%' },
//     liveBadge: { position: 'absolute', top: 10, left: 10, backgroundColor: 'red', padding: 4, borderRadius: 4 },
//     liveText: { color: '#fff', fontSize: 10, fontWeight: '700' },
//     playIcon: { position: 'absolute', top: '40%', left: '45%', backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 20, padding: 5 },
//     darshanTitle: { marginTop: 8, fontWeight: '700' },
//     viewers: { color: '#777', fontSize: 12 },
//     // --- New Modal Styles ---
//     modalOverlay: {
//         flex: 1,
//         backgroundColor: 'rgba(0,0,0,0.9)',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     modalContent: {
//         width: '90%',
//         height: height * 0.4,
//         backgroundColor: '#000',
//         borderRadius: 20,
//         justifyContent: 'center',
//     },
//     popupVideo: {
//         width: '100%',
//         height: '100%',
//     },
//     closeButton: {
//         position: 'absolute',
//         top: -40,
//         right: 0,
//         padding: 10,
//     },
//     closeText: {
//         color: '#fff',
//         fontSize: 24,
//         fontWeight: 'bold',
//     },
//     fullListContainer: { flex: 1, backgroundColor: '#fff6ee' },
//     listHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, backgroundColor: COLORS.APP_BACKGROUND },
//     listHeaderTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
//     backButton: { color: '#fff', fontSize: 16 },
// });


import React, { useState, useEffect, useCallback, memo } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    Image,
    ActivityIndicator,
    Modal,
    FlatList,
    StatusBar,
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import Video from 'react-native-video';

// Assets & Services
import { COLORS } from '../theme/colors';
import { Back_Arrow_SVG, Notification_SVG } from '../constants/SVGImages';
import { navigate } from '../services/NavigationService';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');
const GRID_SPACING = 16;
const CARD_WIDTH = (width - (GRID_SPACING * 3)) / 2;

// --- Constants ---
const QUICK_SERVICES = [
    { id: '1', title: 'Dharma', icon: require('../assets/Dharma.png') },
    { id: '2', title: 'Karam Kand', icon: require('../assets/Karamkand.png') },
    { id: '3', title: 'Jyotish', icon: require('../assets/jyotish.png') },
    { id: '4', title: 'Vastu', icon: require('../assets/Vastu.png') },
    { id: '5', title: 'Jyotish Sikhe', icon: require('../assets/JyotishSikhen.png') },
    { id: '6', title: 'Kundali', icon: require('../assets/Vastu.png') },
];

const ALL_LIVE_VIDEOS = [
    { id: '1', title: "Golden Temple, Amritsar", viewers: "2.3K watching", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
    { id: '2', title: "Tirupati Balaji Temple", viewers: "5.1K watching", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" },
    { id: '3', title: "Kashi Vishwanath", viewers: "1.2K watching", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
    { id: '4', title: "Somnath Temple", viewers: "800 watching", videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" },
];

// --- Memoized Sub-Components ---

const PanchangRow = memo(({ label, value }) => (
    <View style={styles.panchangItem}>
        <Text style={styles.panchangLabel}>{label}</Text>
        <Text style={styles.panchangValue}>{value}</Text>
    </View>
));

const DarshanCard = memo(({ videoUrl, title, viewers, onPress, isGrid }) => (
    <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.darshanCard, isGrid ? styles.gridCard : styles.horizontalCard]}
        onPress={() => onPress(videoUrl)}
    >
        <View style={styles.videoWrapper}>
            <Video
                source={{ uri: videoUrl }}
                style={styles.darshanVideo}
                resizeMode="cover"
                repeat
                muted
                paused={false}
            />
            <View style={styles.liveBadge}>
                <Text style={styles.liveText}>● LIVE</Text>
            </View>
            <View style={styles.playOverlay}>
                <Text style={styles.playIconText}>▶</Text>
            </View>
        </View>
        <View style={styles.cardInfo}>
            <Text style={styles.darshanTitle} numberOfLines={1}>{title}</Text>
            <Text style={styles.viewers}>{viewers}</Text>
        </View>
    </TouchableOpacity>
));

// --- Main Screen ---

export default function HomeScreen() {
    const [panchang, setPanchang] = useState({ tithi: '', nakshatra: '', yoga: '', karana: '', displayDate: '' });
    const [isLoadingPanchang, setIsLoadingPanchang] = useState(true);
    const [allVideosVisible, setAllVideosVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(null);

    useEffect(() => {
        fetchPanchangData();
    }, []);

    const fetchPanchangData = async () => {
        // Simulating API Call
        try {
            const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            setTimeout(() => {
                setPanchang({
                    tithi: 'Ekadashi',
                    nakshatra: 'Rohini',
                    yoga: 'Shukla',
                    karana: 'Bava',
                    displayDate: today
                });
                setIsLoadingPanchang(false);
            }, 800);
        } catch (e) {
            setIsLoadingPanchang(false);
        }
    };

    const handleVideoPress = useCallback((url) => {
        setSelectedVideo(url);
        setModalVisible(true);
    }, []);

    const renderHeader = () => (
        <View style={styles.header}>
            <View>
                <Text style={styles.logo}>🔥 Tathastu</Text>
                <Text style={styles.subText}>Namaste, Devotee 🙏</Text>
            </View>
            <TouchableOpacity
                style={styles.bell}
                onPress={() => navigate('Notification')}
                activeOpacity={0.7}
            >
                <SvgXml xml={Notification_SVG} width={24} height={24} />
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.root}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.APP_BACKGROUND} />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {renderHeader()}

                
                {/* Quick Services Section */}
                <View style={styles.sectionCard}>
                    <Text style={styles.sectionTitle}>Quick Services</Text>
                    <View style={styles.quickGrid}>
                        {QUICK_SERVICES.map((item) => (
                            <TouchableOpacity
                                key={item.id}
                                style={styles.quickBlock}
                                onPress={() => navigate('ServiceDetail', { title: item.title })}
                                activeOpacity={0.7}
                            >
                                <View style={styles.iconCircle}>
                                    <Image source={item.icon} style={styles.quickIconImage} resizeMode="contain" />
                                </View>
                                <Text style={styles.quickText}>{item.title}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Panchang */}
                <View style={styles.sectionCard}>
                    <View style={styles.rowBetween}>
                        <Text style={styles.sectionTitle}>Today’s Panchang</Text>
                        <Text style={styles.dateText}>{panchang.displayDate}</Text>
                    </View>
                    {isLoadingPanchang ? (
                        <ActivityIndicator size="small" color={COLORS.ACCENT_ORANGE} style={styles.loader} />
                    ) : (
                        <View style={styles.panchangGrid}>
                            <PanchangRow label="Tithi" value={panchang.tithi} />
                            <PanchangRow label="Nakshatra" value={panchang.nakshatra} />
                            <PanchangRow label="Yoga" value={panchang.yoga} />
                            <PanchangRow label="Karana" value={panchang.karana} />
                        </View>
                    )}
                </View>

                {/* Live Darshan Section */}
                <View style={[styles.rowBetween, styles.sectionHeader]}>
                    <Text style={styles.sectionTitle}>Live Darshan 🔴</Text>
                    <TouchableOpacity onPress={() => setAllVideosVisible(true)}>
                        <Text style={styles.linkText}>View All</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.horizontalListPadding}
                >
                    {ALL_LIVE_VIDEOS.slice(0, 3).map((item) => (
                        <DarshanCard
                            key={item.id}
                            title={item.title}
                            viewers={item.viewers}
                            videoUrl={item.videoUrl}
                            onPress={handleVideoPress}
                        />
                    ))}
                </ScrollView>
            </ScrollView>

            {/* Video Player Modal */}
            <Modal transparent visible={modalVisible} animationType="fade" onRequestClose={() => setModalVisible(false)}>
                <View style={styles.modalOverlay}>
                    <TouchableOpacity style={styles.closeArea} onPress={() => setModalVisible(false)} />
                    <View style={styles.modalContent}>
                        <TouchableOpacity style={styles.modalCloseBtn} onPress={() => setModalVisible(false)}>
                            <Text style={styles.closeText}>✕</Text>
                        </TouchableOpacity>
                        <Video
                            source={{ uri: selectedVideo }}
                            style={styles.fullVideo}
                            resizeMode="contain"
                            controls
                        />
                    </View>
                </View>
            </Modal>

            {/* View All Modal */}
            <Modal visible={allVideosVisible} animationType="slide" presentationStyle="pageSheet">
                <SafeAreaView style={styles.fullListContainer}>
                    <View style={styles.listHeader}>
                        <TouchableOpacity onPress={() => setAllVideosVisible(false)}>
                            <SvgXml xml={Back_Arrow_SVG} width={34} height={34} fill="#fff" />
                        </TouchableOpacity>
                        <Text style={styles.listHeaderTitle}>All Live Darshans</Text>
                        <View style={{ width: 24 }} />
                    </View>
                    <FlatList
                        data={ALL_LIVE_VIDEOS}
                        keyExtractor={(item) => item.id}
                        numColumns={2}
                        columnWrapperStyle={styles.flatListColumnWrapper}
                        contentContainerStyle={styles.flatListContent}
                        renderItem={({ item }) => (
                            <DarshanCard
                                title={item.title}
                                viewers={item.viewers}
                                videoUrl={item.videoUrl}
                                onPress={handleVideoPress}
                                isGrid
                            />
                        )}
                    />
                </SafeAreaView>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    root: { flex: 1, backgroundColor: '#FFF6EE' },
    scrollContent: { paddingBottom: 100 },
    header: {
        backgroundColor: COLORS.APP_BACKGROUND,
        padding: 20,
        paddingBottom: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    logo: { fontSize: 24, fontWeight: '800', color: COLORS.WHITE },
    subText: { color: 'rgba(255,255,255,0.8)', marginTop: 4, fontSize: 14 },
    bell: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },

    sectionCard: {
        backgroundColor: COLORS.WHITE,
        marginHorizontal: 16,
        marginTop: 20,
        padding: 16,
        borderRadius: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
    },
    sectionTitle: { fontSize: 18, fontWeight: '700', color: '#1A1A1A' },
    rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },

    quickGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 15
    },
    quickBlock: {
        width: '48%',
        backgroundColor: '#FDF0E6',
        borderRadius: 20,
        paddingVertical: 20,
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#FFE0CC',
    },
    iconCircle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        elevation: 2,
    },
    quickIconImage: {
        width: 42,
        height: 42
    },
    quickText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#444'
    },

    panchangGrid: { marginTop: 10 },
    panchangItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6, borderBottomWidth: 0.5, borderBottomColor: '#F0F0F0' },
    panchangLabel: { color: '#777', fontSize: 14 },
    panchangValue: { fontWeight: '600', color: '#333', fontSize: 14 },
    dateText: { color: COLORS.ACCENT_ORANGE, fontWeight: '700', fontSize: 12 },
    loader: { marginVertical: 20 },

    sectionHeader: { marginTop: 25, paddingHorizontal: 16 },
    linkText: { color: COLORS.ACCENT_ORANGE, fontWeight: '700' },
    horizontalListPadding: { paddingLeft: 16, paddingRight: 8, marginTop: 15 },

    darshanCard: { backgroundColor: '#FFF', borderRadius: 16, overflow: 'hidden', elevation: 2 },
    horizontalCard: { width: width * 0.7, marginRight: 12 },
    gridCard: { width: CARD_WIDTH, marginBottom: 16 },
    videoWrapper: { width: '100%', height: 140, backgroundColor: '#000' },
    darshanVideo: { width: '100%', height: '100%' },
    liveBadge: { position: 'absolute', top: 8, left: 8, backgroundColor: '#FF0000', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
    liveText: { color: '#FFF', fontSize: 9, fontWeight: '900' },
    playOverlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.1)' },
    playIconText: { fontSize: 24, color: '#FFF', opacity: 0.8 },
    cardInfo: { padding: 10 },
    darshanTitle: { fontSize: 14, fontWeight: '700', color: '#333' },
    viewers: { color: '#888', fontSize: 11, marginTop: 2 },

    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.95)', justifyContent: 'center' },
    closeArea: { ...StyleSheet.absoluteFillObject },
    modalContent: { width: '100%', height: height * 0.35, backgroundColor: '#000' },
    modalCloseBtn: { position: 'absolute', top: -50, right: 20, zIndex: 10 },
    closeText: { color: '#FFF', fontSize: 28 },
    fullVideo: { width: '100%', height: '100%' },

    fullListContainer: { flex: 1, backgroundColor: '#FFF6EE' },
    listHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: COLORS.APP_BACKGROUND },
    listHeaderTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
    flatListContent: { padding: GRID_SPACING },
    flatListColumnWrapper: { justifyContent: 'space-between' },
});