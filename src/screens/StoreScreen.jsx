import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../theme/colors';
import { SvgXml } from 'react-native-svg';
import { Cart_SVG, Search_SVG } from '../constants/SVGImages';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

const CATEGORIES = ['All', 'Diyas', 'Incense', 'Idols', 'Thalis'];

const PRODUCTS = [
  {
    id: '1',
    name: 'Premium Brass Diya Set',
    price: 499,
    oldPrice: 699,
    rating: 4.8,
    reviews: 234,
    discount: '29% OFF',
    image: require('../assets/BannerImage1.jpg'),
  },
  {
    id: '2',
    name: 'Sacred Incense Collection',
    price: 299,
    oldPrice: 399,
    rating: 4.6,
    reviews: 189,
    discount: '25% OFF',
    image: require('../assets/BannerImage1.jpg'),
  },
  {
    id: '3',
    name: 'Brass Ganesh Idol',
    price: 899,
    oldPrice: 1299,
    rating: 4.9,
    reviews: 312,
    discount: '31% OFF',
    image: require('../assets/BannerImage1.jpg'),
  },
  {
    id: '4',
    name: 'Pooja Thali Set',
    price: 649,
    oldPrice: 899,
    rating: 4.7,
    reviews: 178,
    discount: '28% OFF',
    image: require('../assets/BannerImage1.jpg'),
  },
];

export default function StoreScreen() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const renderProduct = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.discountBadge}>
        <Text style={styles.discountText}>{item.discount}</Text>
      </View>

      <TouchableOpacity style={styles.wishlist}>
        <Icon name="heart-outline" size={18} color="#ff6b6b" />
      </TouchableOpacity>

      <Image source={item.image} style={styles.image} />

      <Text style={styles.name} numberOfLines={1}>
        {item.name}
      </Text>

      <View style={styles.ratingRow}>
        <Icon name="star" size={14} color="#f5a623" />
        <Text style={styles.rating}>
          {item.rating} ({item.reviews})
        </Text>
      </View>

      <View style={styles.priceRow}>
        <Text style={styles.price}>₹{item.price}</Text>
        <Text style={styles.oldPrice}>₹{item.oldPrice}</Text>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.title}>Spiritual Shop</Text>
            <Text style={styles.subtitle}>Authentic pooja essentials</Text>
          </View>

          <TouchableOpacity style={styles.cartBtn}>
            <SvgXml xml={Cart_SVG} width={28} height={28} />
          </TouchableOpacity>
        </View>



        <View style={styles.searchBox}>
          <SvgXml xml={Search_SVG} width={16} height={16} fill="#888" />
          <TextInput
            placeholder="Search products..."
            style={styles.searchInput}
            placeholderTextColor="#fff"
          />
        </View>
      </View>

      {/* Categories - Using ScrollView for more control */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScroll}
        contentContainerStyle={styles.categoryList}
      >
        {CATEGORIES.map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.categoryChip,
              selectedCategory === item && styles.activeChip,
            ]}
            onPress={() => setSelectedCategory(item)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === item && styles.activeText,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Products Grid - Using FlatList with reduced spacing */}
      <FlatList
        data={PRODUCTS}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },

  header: {
    backgroundColor: COLORS.APP_BACKGROUND,
    padding: 16,
    paddingBottom: 24,
  },

  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  cartBtn: {
    padding: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    marginBottom: 10,
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
  },

  subtitle: {
    color: '#ffe1cc',
    marginBottom: 12,
    fontSize: 14,
  },

  searchBox: {
    backgroundColor: '#fd7a33',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    height: 40,
  },

  searchInput: {
    flex: 1,
    paddingVertical: 8,
    paddingLeft: 8,
    fontSize: 14,
    color: '#fff',
  },

  categoryScroll: {
    backgroundColor: '#f7f7f7',
  },

  categoryList: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    minHeight: 48,
  },

  categoryChip: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },

  activeChip: {
    backgroundColor: '#ff6a00',
  },

  categoryText: {
    color: '#333',
    fontWeight: '500',
    fontSize: 14,
  },

  activeText: {
    color: '#fff',
  },

  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  list: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 24,
  },

  card: {
    width: CARD_WIDTH,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    marginBottom: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#ff3b3b',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    zIndex: 1,
  },

  discountText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },

  wishlist: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 12,
    padding: 4,
  },

  image: {
    width: '100%',
    height: 120,
    borderRadius: 12,
    marginBottom: 8,
  },

  name: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },

  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },

  rating: {
    fontSize: 12,
    marginLeft: 4,
    color: '#555',
  },

  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  price: {
    fontSize: 15,
    fontWeight: '700',
    color: '#ff6a00',
    marginRight: 6,
  },

  oldPrice: {
    fontSize: 12,
    color: '#999',
    textDecorationLine: 'line-through',
  },

  button: {
    backgroundColor: '#ff6a00',
    borderRadius: 20,
    paddingVertical: 8,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});