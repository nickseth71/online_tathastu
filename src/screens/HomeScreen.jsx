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


const QUICK_SERVICES = [
    { id: '1', title: 'आपके ईस्ट का मंदिर', icon: require('../assets/Dharma.png') },
    { id: '2', title: 'ऑनलाइन पूजन करें', icon: require('../assets/Karamkand.png') },
    { id: '3', title: 'आपकी कुंडली डायरी', icon: require('../assets/jyotish.png') },
    { id: '4', title: 'आपका आज का भाग्य', icon: require('../assets/Vastu.png') },
    { id: '5', title: 'अपने प्रश्न का उत्तर पाएं', icon: require('../assets/JyotishSikhen.png') },
    { id: '6', title: 'परामर्श लें', icon: require('../assets/Vastu.png') },
    { id: '7', title: 'नाम जापे पुण्य कमाएँ', icon: require('../assets/Vastu.png') },
    { id: '8', title: 'वास्तु दोष पहचाने', icon: require('../assets/Vastu.png') },
    { id: '9', title: 'ग्रहों का झाड़ा', icon: require('../assets/Vastu.png') },
    { id: '10', title: 'प्रेम मैत्री जाने', icon: require('../assets/Vastu.png') },
    { id: '11', title: 'विशेष अनुष्ठान करवाएँ', icon: require('../assets/Vastu.png') },
    { id: '12', title: 'Astro रील्स', icon: require('../assets/Vastu.png') },
    { id: '13', title: 'ज्योतिष वास्तु सीखें', icon: require('../assets/Vastu.png') },
    { id: '14', title: 'स्थान/शहर फलेगा', icon: require('../assets/Vastu.png') },
    { id: '15', title: 'ऑनलाइन तथास्तु स्टोर', icon: require('../assets/Vastu.png') },
    { id: '16', title: 'तथास्तु पंजिका', icon: require('../assets/Vastu.png') },
    { id: '17', title: 'तथास्तु धर्म ज्ञान', icon: require('../assets/Vastu.png') },
    { id: '18', title: 'तथास्तु कथा', icon: require('../assets/Vastu.png') },
];

const ALL_LIVE_VIDEOS = [
    { id: '1', title: "Golden Temple, Amritsar", viewers: "2.3K watching", videoUrl: "https://www.shutterstock.com/shutterstock/videos/3886216687/preview/stock-footage-beautiful-view-of-golden-temple-harmandir-sahib-in-amritsar-punjab-india-famous-indian-sikh.webm" },
    { id: '2', title: "Tirupati Balaji Temple", viewers: "5.1K watching", videoUrl: "https://www.shutterstock.com/shutterstock/videos/1110238441/preview/stock-footage-tirupati-andhra-pradesh-india-march-a-colourful-view-of-crowds-of-people-gathered-at.webm" },
    { id: '3', title: "Kashi Vishwanath", viewers: "1.2K watching", videoUrl: "https://www.shutterstock.com/shutterstock/videos/3809486043/preview/stock-footage-scenic-view-of-varanasi-ghats-from-the-ganges-river.mp4" },
    { id: '4', title: "Somnath Temple", viewers: "800 watching", videoUrl: "https://www.shutterstock.com/shutterstock/videos/1090658247/preview/stock-footage-somnath-gujarat-india-somnath-gujarat-india-beautiful-aerial-rotating-shot.mp4" },
    { id: '5', title: "Somnath Temple", viewers: "800 watching", videoUrl: "https://www.shutterstock.com/shutterstock/videos/1090658247/preview/stock-footage-somnath-gujarat-india-somnath-gujarat-india-beautiful-aerial-rotating-shot.mp4" },
];


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
                playInBackground={false}
                playWhenInactive={false}
                ignoreSilentSwitch="obey"
                onError={(e) => console.log('Video error:', e)}
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
                <Text style={styles.logo}>ऑनलाइन तथास्तु</Text>
                <Text style={styles.subText}>नमस्ते 🙏</Text>
            </View>
            <View style={styles.headerRight}>
                {/* Coin Icon / Balance */}
                <TouchableOpacity
                    style={styles.coinContainer}
                    onPress={() => navigate(null)}
                    activeOpacity={0.7}
                >
                    <Text style={styles.coinIcon}>🪙</Text>
                    <Text style={styles.coinText}>500</Text>
                </TouchableOpacity>

                {/* Notification Bell */}
                <TouchableOpacity
                    style={styles.bell}
                    onPress={() => navigate('Notification')}
                    activeOpacity={0.7}
                >
                    <SvgXml xml={Notification_SVG} width={24} height={24} />
                </TouchableOpacity>
            </View>
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

                <View style={styles.sectionCard}>
                    <Text style={styles.sectionTitle}>सेवाएँ</Text>

                    <View style={styles.quickGrid}>
                        {QUICK_SERVICES.map((item) => (
                            <TouchableOpacity
                                key={item.id}
                                style={styles.quickBlock}
                                onPress={() => {
                                    if (item.title === 'नाम जापे पुण्य कमाएँ') {
                                        navigate('MalaJaap');

                                    } else if (item.title === 'अपने प्रश्न का उत्तर पाएं') {
                                        navigate('TarotScreen');

                                    } else if (item.title === 'ऑनलाइन तथास्तु स्टोर') {
                                        navigate('StoreScreen');

                                    } else {
                                        navigate('ServiceDetail', { title: item.title });
                                    }
                                }}
                                activeOpacity={0.7}
                            >
                                <View style={styles.iconCircle}>
                                    <Image
                                        source={item.icon}
                                        style={styles.quickIconImage}
                                        resizeMode="contain"
                                    />
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
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: -12,
    },
    coinContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
        marginRight: 12,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    coinIcon: {
        fontSize: 16,
        marginRight: 4,
    },
    coinText: {
        color: COLORS.WHITE,
        fontWeight: '700',
        fontSize: 14,
    },
    bell: {
        width: 42,
        height: 42,
        borderRadius: 24,
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
        backgroundColor: '#fa5600',
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
        fontWeight: '600',
        color: '#fff'
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
    horizontalCard: { width: width * 0.7, marginRight: 12, marginBottom: 16 },
    gridCard: { width: CARD_WIDTH, paddingBottom: 16 },
    videoWrapper: { width: '100%', height: 140, backgroundColor: '#000', },
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