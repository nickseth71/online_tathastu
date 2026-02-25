import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { Back_Arrow_SVG } from '../../constants/SVGImages';
import { COLORS } from '../../theme/colors';

const { width } = Dimensions.get('window');

export default function ServiceDetailScreen() {
  const route = useRoute();
  const { title } = route.params;
  const navigation = useNavigation();

  // Carousel Images based on Service
  const carouselData = {
    Dharma: [
      { id: '1', image: 'https://images.unsplash.com/photo-1545063914-a1a6ec821c88?q=80&w=500' },
      { id: '2', image: 'https://images.unsplash.com/photo-1609347744403-2306e8a9ae27?q=80&w=500' },
    ],
    'Karam Kand': [
      { id: '1', image: 'https://images.unsplash.com/photo-1561347981-969c80cf4463?q=80&w=500' },
      { id: '2', image: 'https://images.unsplash.com/photo-1621252179027-94459d278660?q=80&w=500' },
    ],
    // Add others...
  };

  const serviceData = {
    Dharma: [
      { id: 1, name: 'Temple Visit Guide', description: 'Popular temples and timings' },
      { id: 2, name: 'Bhajans', description: 'Listen to devotional songs' },
      { id: 3, name: 'Scriptures', description: 'Read important texts like Bhagavad Gita' },
    ],
    // ... rest of your data
  };

  const contentList = serviceData[title] || [];
  const images = carouselData[title] || carouselData['Dharma']; // Fallback

  const renderCarouselItem = ({ item }) => (
    <View style={styles.carouselItem}>
      <Image source={{ uri: item.image }} style={styles.bannerImage} />
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.left} onPress={() => navigation.goBack()}>
          <SvgXml xml={Back_Arrow_SVG} width={28} height={28} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Image Carousel */}
        <View style={styles.carouselContainer}>
          <FlatList
            data={images}
            renderItem={renderCarouselItem}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
          />
        </View>

        {/* Info Section */}
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Featured {title} Services</Text>
          <Text style={styles.sectionSubtitle}>Explore our curated rituals and guides</Text>
        </View>

        {/* List of Services */}
        <View style={styles.listContainer}>
          {contentList.map((item) => (
            <TouchableOpacity key={item.id} style={styles.card}>
              <View style={styles.cardTextContainer}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text style={styles.cardDescription}>{item.description}</Text>
              </View>
              <View style={styles.arrowIcon}>
                <Text style={{color: COLORS.APP_BACKGROUND, fontWeight: 'bold'}}>→</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* "Did You Know" or Additional Content */}
        <View style={styles.didYouKnowBox}>
          <Text style={styles.dykTitle}>✨ Quick Tip</Text>
          <Text style={styles.dykText}>
            Following {title} practices regularly is believed to bring peace and mental clarity to your daily life.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff6ee' },
  header: {
    height: 64,
    backgroundColor: COLORS.APP_BACKGROUND,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: '700', marginLeft: 10 },
  carouselContainer: { height: 200, marginTop: 10 },
  carouselItem: { width: width, paddingHorizontal: 15 },
  bannerImage: { width: '100%', height: '100%', borderRadius: 15, resizeMode: 'cover' },
  infoSection: { padding: 20 },
  sectionTitle: { fontSize: 22, fontWeight: '800', color: '#333' },
  sectionSubtitle: { fontSize: 14, color: '#777', marginTop: 4 },
  listContainer: { paddingHorizontal: 20 },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 15,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
  },
  cardTextContainer: { flex: 1 },
  cardTitle: { fontSize: 16, fontWeight: '700', color: COLORS.APP_BACKGROUND },
  cardDescription: { fontSize: 13, color: '#666', marginTop: 4 },
  arrowIcon: { width: 30, height: 30, justifyContent: 'center', alignItems: 'center' },
  didYouKnowBox: {
    margin: 20,
    padding: 15,
    backgroundColor: '#FFE8D6',
    borderRadius: 12,
    borderLeftWidth: 5,
    borderLeftColor: COLORS.APP_BACKGROUND,
  },
  dykTitle: { fontWeight: 'bold', color: '#333', marginBottom: 5 },
  dykText: { fontSize: 13, color: '#555', fontStyle: 'italic' },
});