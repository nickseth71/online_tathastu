import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import AppHeader from '../components/AppHeader';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

const PRODUCTS = [
  {
    id: '1',
    name: 'Premium Hoodie',
    price: '$49.99',
    image: require('../assets/BannerImage1.jpg'),
  },
  {
    id: '2',
    name: 'Classic T-Shirt',
    price: '$24.99',
    image: require('../assets/BannerImage1.jpg'),
  },
  {
    id: '3',
    name: 'Snapback Hat',
    price: '$19.99',
    image: require('../assets/BannerImage1.jpg'),
  },
];

export default function StoreScreen() {


  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate('ProductDetail', { product: item })
      }
    >
      <Image source={item.image} style={styles.image} />

      <Text style={styles.name} numberOfLines={1}>
        {item.name}
      </Text>

      <Text style={styles.price}>{item.price}</Text>

      <TouchableOpacity style={styles.button} activeOpacity={0.8}>
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <AppHeader title="Store" showBack={true} />

      <FlatList
        data={PRODUCTS}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  list: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    paddingTop: 16,
  },

  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  card: {
    width: CARD_WIDTH,
    backgroundColor: '#f9f9f9',
    borderRadius: 14,
    padding: 12,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
  },

  image: {
    width: '100%',
    height: 140,
    borderRadius: 10,
    marginBottom: 10,
  },

  name: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
    textAlign: 'center',
  },

  price: {
    fontSize: 14,
    color: '#777',
    marginBottom: 12,
  },

  button: {
    backgroundColor: '#000',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 18,
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  },
});
