import React, { useState, useEffect, useCallback } from 'react';
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
  ActivityIndicator,
  RefreshControl,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../theme/colors';
import { SvgXml } from 'react-native-svg';
import { Cart_SVG, Search_SVG, wishlistSvg } from '../constants/SVGImages';
import Config from 'react-native-config';

const { width, height } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;
const CATEGORIES = ['All', 'Diyas', 'Incense', 'Idols', 'Thalis'];
const SHOPIFY_ADMIN_TOKEN = Config.SHOPIFY_API_KEY;

export default function StoreScreen() {
  const [cart, setCart] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // --- New State for Product Detail ---
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDetailVisible, setIsDetailVisible] = useState(false);

  const addToCart = product => {
    setCart(currentCart => {
      const exists = currentCart.find(item => item.id === product.id);
      if (exists) {
        alert(`${product.name} is already in your cart!`);
        return currentCart;
      }
      alert(`${product.name} added to cart!`);
      return [...currentCart, { ...product, quantity: 1 }];
    });
  };

  const openProductDetail = product => {
    setSelectedProduct(product);
    setIsDetailVisible(true);
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      if (!SHOPIFY_ADMIN_TOKEN) {
        setLoading(false);
        return;
      }

      const response = await fetch(
        'https://demoeshopgenius.myshopify.com/admin/api/2026-01/products.json',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': SHOPIFY_ADMIN_TOKEN,
          },
        },
      );

      const json = await response.json();

      if (json && json.products) {
        const transformedProducts = json.products.map(item => ({
          id: item.id.toString(),
          name: item.title,
          description:
            item.body_html?.replace(/<[^>]*>?/gm, '') ||
            'No description available.',
          price: item.variants[0]?.price || '0',
          oldPrice: item.variants[0]?.compare_at_price || null,
          discount: item.variants[0]?.compare_at_price
            ? Math.round(
              ((parseFloat(item.variants[0].compare_at_price) -
                parseFloat(item.variants[0].price)) /
                parseFloat(item.variants[0].compare_at_price)) *
              100,
            ) + '% OFF'
            : null,
          rating: 4.5,
          reviews: 120,
          image:
            item.images && item.images.length > 0
              ? { uri: item.images[0].src }
              : require('../assets/BannerImage1.jpg'),
        }));
        setProducts(transformedProducts);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchProducts();
  }, []);

  const renderProduct = ({ item }) => (
    <View style={styles.card}>
      {item.discount && (
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>{item.discount}</Text>
        </View>
      )}

      <TouchableOpacity style={styles.wishlist}>
        <SvgXml xml={wishlistSvg} width={18} height={18} />
      </TouchableOpacity>

      {/* Clickable Area for Detail */}
      <TouchableOpacity
        onPress={() => openProductDetail(item)}
        activeOpacity={0.9}
      >
        <Image source={item.image} style={styles.image} resizeMode="cover" />
        <Text style={styles.name} numberOfLines={1}>
          {item.name}
        </Text>
        <View style={styles.ratingRow}>
          <Text>⭐</Text>
          <Text style={styles.rating}>
            {item.rating} ({item.reviews})
          </Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.price}>₹{item.price}</Text>
          {item.oldPrice && (
            <Text style={styles.oldPrice}>₹{item.oldPrice}</Text>
          )}
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => addToCart(item)}>
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.title}>Spiritual Shop</Text>
            <Text style={styles.subtitle}>Authentic pooja essentials</Text>
          </View>
          <TouchableOpacity
            style={styles.cartBtn}
            onPress={() => setIsCartVisible(true)}
          >
            <SvgXml xml={Cart_SVG} width={28} height={28} />
            {cart.length > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{cart.length}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.searchBox}>
          <SvgXml xml={Search_SVG} width={16} height={16} fill="#fff" />
          <TextInput
            placeholder="Search products..."
            style={styles.searchInput}
            placeholderTextColor="rgba(255,255,255,0.7)"
          />
        </View>
      </View>

      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
        >
          {CATEGORIES.map(item => (
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
      </View>

      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#ff6a00" />
        </View>
      ) : (
        <FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={item => item.id}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}

      <Modal
        animationType="fade"
        transparent={true}
        visible={isDetailVisible}
        onRequestClose={() => setIsDetailVisible(false)}
      >
        <View style={styles.detailModalOverlay}>
          <View style={styles.detailContent}>
            <TouchableOpacity
              style={styles.closeDetail}
              onPress={() => setIsDetailVisible(false)}
            >
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>

            {selectedProduct && (
              <ScrollView showsVerticalScrollIndicator={false}>
                <Image
                  source={selectedProduct.image}
                  style={styles.detailImage}
                  resizeMode="contain"
                />
                <Text style={styles.detailName}>{selectedProduct.name}</Text>

                <View style={styles.detailPriceRow}>
                  <Text style={styles.detailPrice}>
                    ₹{selectedProduct.price}
                  </Text>
                  {selectedProduct.oldPrice && (
                    <Text style={styles.detailOldPrice}>
                      ₹{selectedProduct.oldPrice}
                    </Text>
                  )}
                </View>

                <Text style={styles.descriptionHeader}>
                  Product Description
                </Text>
                <Text style={styles.detailDescription}>
                  {selectedProduct.description}
                </Text>

                <TouchableOpacity
                  style={styles.detailAddBtn}
                  onPress={() => {
                    addToCart(selectedProduct);
                    setIsDetailVisible(false);
                  }}
                >
                  <Text style={styles.buttonText}>Add to Cart Now</Text>
                </TouchableOpacity>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>

      {/* --- CART MODAL (Same as yours) --- */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isCartVisible}
        onRequestClose={() => setIsCartVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={isCartVisible}
            onRequestClose={() => setIsCartVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>
                    Your Cart ({cart.length})
                  </Text>
                  <TouchableOpacity onPress={() => setIsCartVisible(false)}>
                    <Text style={styles.closeText}>✕</Text>
                  </TouchableOpacity>
                </View>

                <FlatList
                  data={cart}
                  keyExtractor={item => item.id}
                  contentContainerStyle={
                    cart.length === 0 ? { flex: 1 } : { paddingBottom: 20 }
                  }
                  ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                      <View style={styles.emptyIconCircle}>
                        <Icon name="cart-outline" size={60} color="#CCC" />
                      </View>
                      <Text style={styles.emptyTitle}>Your Cart is Empty</Text>
                      <Text style={styles.emptySubtitle}>
                        Looks like you haven't added any spiritual essentials
                        yet.
                      </Text>
                      <TouchableOpacity
                        style={styles.startShoppingBtn}
                        onPress={() => setIsCartVisible(false)}
                      >
                        <Text style={styles.startShoppingText}>
                          Start Shopping
                        </Text>
                      </TouchableOpacity>
                    </View>
                  }
                  renderItem={({ item }) => (
                    <View style={styles.cartItem}>
                      {/* 1. Added the Product Image */}
                      <Image
                        source={item.image}
                        style={styles.cartItemImage}
                        resizeMode="cover"
                      />

                      <View style={styles.cartItemDetails}>
                        <Text
                          style={styles.cartItemName}
                          numberOfLines={1}
                          ellipsizeMode="tail"
                        >
                          {item.name}
                        </Text>
                        <Text style={styles.cartItemPrice}>₹{item.price}</Text>
                      </View>

                      {/* 2. Added a Remove Button for better UX */}
                      <TouchableOpacity
                        onPress={() =>
                          setCart(cart.filter(c => c.id !== item.id))
                        }
                        style={styles.removeBtn}
                      >
                        <Icon name="trash-outline" size={20} color="#FF3B3B" />
                      </TouchableOpacity>
                    </View>
                  )}
                />

                {cart.length > 0 && (
                  <TouchableOpacity style={styles.checkoutBtn}>
                    <Text style={styles.buttonText}>Proceed to Checkout</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </Modal>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  // ... Keep all your previous styles ...
  container: { flex: 1, backgroundColor: '#f7f7f7' },
  header: {
    backgroundColor: COLORS.APP_BACKGROUND || '#ff6a00',
    padding: 16,
    paddingBottom: 24,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cartBtn: { padding: 6, borderRadius: 20 },
  title: { fontSize: 22, fontWeight: '700', color: '#fff' },
  subtitle: { color: '#ffe1cc', fontSize: 14 },
  searchBox: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    height: 40,
    marginTop: 15,
  },
  searchInput: { flex: 1, paddingLeft: 8, color: '#fff' },
  categoryList: { paddingHorizontal: 16, paddingVertical: 12 },
  categoryChip: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    elevation: 2,
  },
  activeChip: { backgroundColor: '#ff6a00' },
  categoryText: { color: '#333', fontWeight: '500' },
  activeText: { color: '#fff' },
  columnWrapper: { justifyContent: 'space-between' },
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    elevation: 3,
  },
  image: { width: '100%', height: 120, borderRadius: 12, marginBottom: 8 },
  name: { fontSize: 14, fontWeight: '600', color: '#333' },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 4 },
  rating: { fontSize: 12, marginLeft: 4, color: '#555' },
  priceRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  price: { fontSize: 15, fontWeight: '700', color: '#ff6a00', marginRight: 6 },
  oldPrice: { fontSize: 12, color: '#999', textDecorationLine: 'line-through' },
  button: {
    backgroundColor: '#ff6a00',
    borderRadius: 20,
    paddingVertical: 8,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: '600' },
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
  discountText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
  wishlist: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 1,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 4,
  },
  badge: {
    position: 'absolute',
    right: -5,
    top: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: { color: 'white', fontSize: 10, fontWeight: 'bold' },
  loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  // --- New Detail Modal Styles ---
  detailModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 20,
    maxHeight: '80%',
  },
  closeDetail: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  detailImage: {
    width: '100%',
    height: 250,
    borderRadius: 15,
    marginBottom: 15,
  },
  detailName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  detailPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  detailPrice: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ff6a00',
    marginRight: 10,
  },
  detailOldPrice: {
    fontSize: 16,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  descriptionHeader: {
    fontSize: 16,
    fontWeight: '700',
    color: '#555',
    marginBottom: 5,
  },
  detailDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 20,
  },
  detailAddBtn: {
    backgroundColor: '#ff6a00',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
  },

  // --- Cart Modal Styles ---
  modalContainer: { flex: 1, justifyContent: 'flex-end' },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
    height: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: { fontSize: 20, fontWeight: 'bold' },
  closeText: {
    fontSize: 20,
    color: '#333',
    fontWeight: 'bold',
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  cartItemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  cartItemDetails: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  cartItemName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  removeBtn: {
    padding: 8,
  },
  cartItemPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ff6a00',
  },
  checkoutBtn: {
    backgroundColor: '#ff6a00',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50,
  },
  emptyIconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F9F9F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    paddingHorizontal: 40,
    lineHeight: 20,
    marginBottom: 25,
  },
  startShoppingBtn: {
    backgroundColor: '#FFF',
    borderWidth: 1.5,
    borderColor: '#ff6a00',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 25,
  },
  startShoppingText: {
    color: '#ff6a00',
    fontWeight: '700',
    fontSize: 15,
  },
});
