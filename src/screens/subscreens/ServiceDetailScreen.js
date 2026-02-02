import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { Back_Arrow_SVG } from '../../constants/SVGImages';
import { COLORS } from '../../theme/colors';

export default function ServiceDetailScreen() {
  const route = useRoute();
  const { title } = route.params;
  const navigation = useNavigation();

  // Sample data for each type
  const serviceData = {
    Dharma: [
      {
        id: 1,
        name: 'Temple Visit Guide',
        description: 'Popular temples and timings',
      },
      { id: 2, name: 'Bhajans', description: 'Listen to devotional songs' },
      {
        id: 3,
        name: 'Scriptures',
        description: 'Read important texts like Bhagavad Gita',
      },
    ],
    'Karam Kand': [
      {
        id: 1,
        name: 'Pooja Details',
        description: 'Types of poojas and rituals',
      },
      { id: 2, name: 'Havan', description: 'Step by step instructions' },
      {
        id: 3,
        name: 'Sanskar',
        description: 'Information about life ceremonies',
      },
    ],
    Jyotish: [
      {
        id: 1,
        name: 'Kundli',
        description: 'Create your personalized horoscope',
      },
      {
        id: 2,
        name: 'Daily Predictions',
        description: 'Get daily astrological advice',
      },
      {
        id: 3,
        name: 'Astrology Consultation',
        description: 'Book expert guidance',
      },
    ],
    Vastu: [
      {
        id: 1,
        name: 'Home Tips',
        description: 'Arrange rooms according to energy flow',
      },
      { id: 2, name: 'Office Vastu', description: 'Improve workplace energy' },
      {
        id: 3,
        name: 'Directional Remedies',
        description: 'Correct negative directions',
      },
    ],
  };

  const contentList = serviceData[title] || [];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.left}
          onPress={() => navigation.goBack()}
        >
          <SvgXml xml={Back_Arrow_SVG} width={28} height={28} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {title}
        </Text>
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {contentList.map(item => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardDescription}>{item.description}</Text>
            <TouchableOpacity style={styles.cardButton}>
              <Text style={styles.cardButtonText}>Learn More</Text>
            </TouchableOpacity>
          </View>
        ))}

        {contentList.length === 0 && (
          <Text style={styles.content}>
            No content available for this service.
          </Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff6ee',
  },
  header: {
    height: 64,
    backgroundColor: COLORS.APP_BACKGROUND,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  left: {
    width: 30,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerTitle: {
    flex: 1,
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  scrollContainer: {
    padding: 16,
  },
  content: {
    fontSize: 16,
    color: '#444',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.APP_BACKGROUND,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    marginVertical: 8,
  },
  cardButton: {
    backgroundColor: COLORS.APP_BACKGROUND,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  cardButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
