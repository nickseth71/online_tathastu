import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    FlatList,
    Dimensions,
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import { Back_Arrow_SVG } from '../../constants/SVGImages';
import { SafeAreaView } from 'react-native-safe-area-context';

const PANDITS = [
    {
        id: '1',
        name: 'Pandit Rajesh Sharma',
        rating: 4.8,
        reviews: 234,
        languages: 'Hindi, English',
        slots: ['08:00 AM', '10:00 AM', '02:00 PM'],
        image: 'https://via.placeholder.com/100',
    },
    {
        id: '2',
        name: 'Pandit Vijay Kumar',
        rating: 4.9,
        reviews: 412,
        languages: 'Hindi, Sanskrit',
        slots: ['06:00 AM', '09:00 AM'],
        image: 'https://via.placeholder.com/100',
    },
];

const DATES = [
    { day: 'Mon', date: '20' },
    { day: 'Tue', date: '21' },
    { day: 'Wed', date: '22' },
    { day: 'Thu', date: '23' },
    { day: 'Fri', date: '24' },
];

const SelectPanditScreen = ({ navigation }) => {
    const [selectedDate, setSelectedDate] = useState('20');
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [selectedPandit, setSelectedPandit] = useState(null);

    const renderHeader = () => (
        <View style={styles.contentPadding}>
            <Text style={styles.sectionTitle}>Choose Date</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.dateList}
            >
                {DATES.map(item => {
                    const isSelected = selectedDate === item.date;
                    return (
                        <TouchableOpacity
                            key={item.date}
                            onPress={() => setSelectedDate(item.date)}
                            style={[styles.dateCard, isSelected && styles.selectedDateCard]}
                        >
                            <Text
                                style={[styles.dateDay, isSelected && styles.selectedDateText]}
                            >
                                {item.day}
                            </Text>
                            <Text
                                style={[
                                    styles.dateNumber,
                                    isSelected && styles.selectedDateText,
                                ]}
                            >
                                {item.date}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>

            <Text style={[styles.sectionTitle, { marginTop: 25 }]}>
                Available Pandits
            </Text>
        </View>
    );

    const renderFooter = () => (
        <View style={styles.footerContainer}>
            <TouchableOpacity
                disabled={!selectedSlot}
                style={[styles.continueBtn, !selectedSlot && styles.disabledBtn]}
            >
                <Text style={styles.continueText}>Continue Booking</Text>
            </TouchableOpacity>
        </View>
    );

    const renderPanditCard = ({ item }) => (
        <View
            style={[
                styles.panditCard,
                selectedPandit === item.id && styles.selectedCardBorder,
            ]}
        >
            <TouchableOpacity
                style={styles.cardHeader}
                onPress={() => setSelectedPandit(item.id)}
                activeOpacity={0.7}
            >
                <Image source={{ uri: item.image }} style={styles.avatar} />
                <View style={styles.details}>
                    <Text style={styles.panditName}>{item.name}</Text>
                    <View style={styles.row}>
                        <Text style={styles.ratingText}>⭐ {item.rating}</Text>
                        <Text style={styles.reviewText}> ({item.reviews} reviews)</Text>
                    </View>
                    <Text style={styles.languageText}>{item.languages}</Text>
                </View>
            </TouchableOpacity>

            <View style={styles.divider} />

            <View style={styles.slotsWrapper}>
                <Text style={styles.slotTitle}>Select a Time Slot:</Text>
                <View style={styles.slotsContainer}>
                    {item.slots.map((slot, index) => {
                        const isSelected =
                            selectedSlot === slot && selectedPandit === item.id;
                        return (
                            <TouchableOpacity
                                key={index}
                                onPress={() => {
                                    setSelectedSlot(slot);
                                    setSelectedPandit(item.id);
                                }}
                                style={[styles.slotBadge, isSelected && styles.selectedSlot]}
                            >
                                <Text
                                    style={[styles.slotText, isSelected && { color: '#fff' }]}
                                >
                                    {slot}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.mainContainer}>
            {/* Custom Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backBtn}
                    onPress={() => navigation.goBack()}
                >
                    <SvgXml xml={Back_Arrow_SVG} width="24" height="24" />
                </TouchableOpacity>
                <View>
                    <Text style={styles.headerTitle}>Select Date & Pandit</Text>
                    <Text style={styles.headerSub}>
                        Personalize your ritual experience
                    </Text>
                </View>
            </View>

            <FlatList
                data={PANDITS}
                renderItem={renderPanditCard}
                keyExtractor={item => item.id}
                ListHeaderComponent={renderHeader}
                ListFooterComponent={renderFooter}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    mainContainer: { flex: 1, backgroundColor: '#fa5600' },
    header: {
        paddingHorizontal: 20,
        paddingBottom: 25,
        paddingTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    backBtn: {
        marginRight: 15,
        backgroundColor: 'rgba(255,255,255,0.2)',
        padding: 8,
        borderRadius: 12,
    },
    headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
    headerSub: { fontSize: 13, color: '#fff', opacity: 0.8 },

    listContainer: {
        backgroundColor: '#F8F9FB',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingTop: 20,
        flexGrow: 1,
    },
    contentPadding: { paddingHorizontal: 20 },
    sectionTitle: {
        fontSize: 17,
        fontWeight: '700',
        color: '#1A1A1A',
        marginBottom: 12,
    },

    dateList: { paddingBottom: 5 },
    dateCard: {
        width: 60,
        height: 75,
        borderRadius: 16,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
    },
    selectedDateCard: { backgroundColor: '#fa5600' },
    dateDay: { fontSize: 12, color: '#888', marginBottom: 4 },
    dateNumber: { fontSize: 18, fontWeight: 'bold', color: '#333' },
    selectedDateText: { color: '#fff' },

    panditCard: {
        backgroundColor: '#fff',
        borderRadius: 20,
        marginHorizontal: 20,
        marginBottom: 16,
        padding: 16,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
    },
    selectedCardBorder: { borderWidth: 2, borderColor: '#fa5600' },
    cardHeader: { flexDirection: 'row', alignItems: 'center' },
    avatar: { width: 70, height: 70, borderRadius: 15, backgroundColor: '#eee' },
    details: { marginLeft: 15, flex: 1 },
    panditName: { fontWeight: 'bold', fontSize: 16, color: '#1A1A1A' },
    row: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
    ratingText: { fontSize: 13, fontWeight: '600', color: '#333' },
    reviewText: { fontSize: 12, color: '#888' },
    languageText: {
        fontSize: 12,
        color: '#fa5600',
        marginTop: 4,
        fontWeight: '500',
    },

    divider: { height: 1, backgroundColor: '#F0F0F0', marginVertical: 15 },

    slotTitle: { fontSize: 13, color: '#666', fontWeight: '600' },
    slotsContainer: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 },
    slotBadge: {
        backgroundColor: '#FFF5EF',
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 12,
        marginRight: 8,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#FFE0CC',
    },
    selectedSlot: { backgroundColor: '#fa5600', borderColor: '#fa5600' },
    slotText: { fontSize: 12, color: '#fa5600', fontWeight: '600' },

    footerContainer: { padding: 20, marginTop: 10, paddingBottom: 40 },
    continueBtn: {
        backgroundColor: '#fa5600',
        padding: 18,
        borderRadius: 16,
        alignItems: 'center',
        elevation: 5,
    },
    disabledBtn: { backgroundColor: '#CCCCCC', elevation: 0 },
    continueText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});

export default SelectPanditScreen;
