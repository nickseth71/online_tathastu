// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   Image,
//   TouchableOpacity,
//   Dimensions,
//   TextInput,
//   ScrollView,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { COLORS } from '../theme/colors';
// import { SvgXml } from 'react-native-svg';
// import { Cart_SVG, Search_SVG, Start_Svg } from '../constants/SVGImages';

// const { width } = Dimensions.get('window');
// const CARD_WIDTH = (width - 48) / 2;

// const CATEGORIES = ['All', 'Diyas', 'Incense', 'Idols', 'Thalis'];

// const PRODUCTS = [
//   {
//     id: '1',
//     name: 'Premium Brass Diya Set',
//     price: 499,
//     oldPrice: 699,
//     rating: 4.8,
//     reviews: 234,
//     discount: '29% OFF',
//     image: require('../assets/BannerImage1.jpg'),
//   },
//   {
//     id: '2',
//     name: 'Sacred Incense Collection',
//     price: 299,
//     oldPrice: 399,
//     rating: 4.6,
//     reviews: 189,
//     discount: '25% OFF',
//     image: require('../assets/BannerImage1.jpg'),
//   },
//   {
//     id: '3',
//     name: 'Brass Ganesh Idol',
//     price: 899,
//     oldPrice: 1299,
//     rating: 4.9,
//     reviews: 312,
//     discount: '31% OFF',
//     image: require('../assets/BannerImage1.jpg'),
//   },
//   {
//     id: '4',
//     name: 'Pooja Thali Set',
//     price: 649,
//     oldPrice: 899,
//     rating: 4.7,
//     reviews: 178,
//     discount: '28% OFF',
//     image: require('../assets/BannerImage1.jpg'),
//   },
// ];

// export default function StoreScreen() {
//   const [selectedCategory, setSelectedCategory] = useState('All');

//   const renderProduct = ({ item }) => (
//     <View style={styles.card}>
//       <View style={styles.discountBadge}>
//         <Text style={styles.discountText}>{item.discount}</Text>
//       </View>

//       <TouchableOpacity style={styles.wishlist}>
//         <Icon name="heart-outline" size={18} color="#ff6b6b" />
//       </TouchableOpacity>

//       <Image source={item.image} style={styles.image} />

//       <Text style={styles.name} numberOfLines={1}>
//         {item.name}
//       </Text>

//       <View style={styles.ratingRow}>
//         <Text>⭐</Text>
//         {/* <SvgXml xml={Start_Svg} /> */}
//         <Text style={styles.rating}>
//           {item.rating} ({item.reviews})
//         </Text>
//       </View>

//       <View style={styles.priceRow}>
//         <Text style={styles.price}>₹{item.price}</Text>
//         <Text style={styles.oldPrice}>₹{item.oldPrice}</Text>
//       </View>

//       <TouchableOpacity style={styles.button}>
//         <Text style={styles.buttonText}>Add to Cart</Text>
//       </TouchableOpacity>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <View style={styles.headerTop}>
//           <View>
//             <Text style={styles.title}>Spiritual Shop</Text>
//             <Text style={styles.subtitle}>Authentic pooja essentials</Text>
//           </View>

//           <TouchableOpacity style={styles.cartBtn}>
//             <SvgXml xml={Cart_SVG} width={28} height={28} />
//           </TouchableOpacity>
//         </View>

//         <View style={styles.searchBox}>
//           <SvgXml xml={Search_SVG} width={16} height={16} fill="#888" />
//           <TextInput
//             placeholder="Search products..."
//             style={styles.searchInput}
//             placeholderTextColor="#fff"
//           />
//         </View>
//       </View>

//       {/* Categories - Using ScrollView for more control */}
//       <ScrollView
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         style={styles.categoryScroll}
//         contentContainerStyle={styles.categoryList}
//       >
//         {CATEGORIES.map(item => (
//           <TouchableOpacity
//             key={item}
//             style={[
//               styles.categoryChip,
//               selectedCategory === item && styles.activeChip,
//             ]}
//             onPress={() => setSelectedCategory(item)}
//           >
//             <Text
//               style={[
//                 styles.categoryText,
//                 selectedCategory === item && styles.activeText,
//               ]}
//             >
//               {item}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>

//       {/* Products Grid - Using FlatList with reduced spacing */}
//       <FlatList
//         data={PRODUCTS}
//         renderItem={renderProduct}
//         keyExtractor={item => item.id}
//         numColumns={2}
//         columnWrapperStyle={styles.columnWrapper}
//         contentContainerStyle={styles.list}
//         showsVerticalScrollIndicator={false}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f7f7f7',
//   },

//   header: {
//     backgroundColor: COLORS.APP_BACKGROUND,
//     padding: 16,
//     paddingBottom: 24,
//   },

//   headerTop: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 12,
//   },

//   cartBtn: {
//     padding: 6,
//     backgroundColor: 'rgba(255, 255, 255, 0.2)',
//     borderRadius: 20,
//     marginBottom: 10,
//   },

//   title: {
//     fontSize: 22,
//     fontWeight: '700',
//     color: '#fff',
//   },

//   subtitle: {
//     color: '#ffe1cc',
//     marginBottom: 12,
//     fontSize: 14,
//   },

//   searchBox: {
//     backgroundColor: '#fd7a33',
//     borderRadius: 20,
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 12,
//     height: 40,
//   },

//   searchInput: {
//     flex: 1,
//     paddingVertical: 8,
//     paddingLeft: 8,
//     fontSize: 14,
//     color: '#fff',
//   },

//   categoryScroll: {
//     backgroundColor: '#f7f7f7',
//   },

//   categoryList: {
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     minHeight: 48,
//   },

//   categoryChip: {
//     backgroundColor: '#fff',
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 20,
//     marginRight: 10,
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//   },

//   activeChip: {
//     backgroundColor: '#ff6a00',
//   },

//   categoryText: {
//     color: '#333',
//     fontWeight: '500',
//     fontSize: 14,
//   },

//   activeText: {
//     color: '#fff',
//   },

//   columnWrapper: {
//     justifyContent: 'space-between',
//     marginBottom: 16,
//   },

//   list: {
//     paddingHorizontal: 16,
//     paddingTop: 10,
//     paddingBottom: 24,
//   },

//   card: {
//     width: CARD_WIDTH,
//     backgroundColor: '#fff',
//     borderRadius: 16,
//     padding: 12,
//     marginBottom: 8,
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },

//   discountBadge: {
//     position: 'absolute',
//     top: 8,
//     left: 8,
//     backgroundColor: '#ff3b3b',
//     paddingHorizontal: 6,
//     paddingVertical: 2,
//     borderRadius: 6,
//     zIndex: 1,
//   },

//   discountText: {
//     color: '#fff',
//     fontSize: 11,
//     fontWeight: '600',
//   },

//   wishlist: {
//     position: 'absolute',
//     top: 8,
//     right: 8,
//     zIndex: 1,
//     backgroundColor: 'rgba(255, 255, 255, 0.8)',
//     borderRadius: 12,
//     padding: 4,
//   },

//   image: {
//     width: '100%',
//     height: 120,
//     borderRadius: 12,
//     marginBottom: 8,
//   },

//   name: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#333',
//     marginBottom: 4,
//   },

//   ratingRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 6,
//   },

//   rating: {
//     fontSize: 12,
//     marginLeft: 4,
//     color: '#555',
//   },

//   priceRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//   },

//   price: {
//     fontSize: 15,
//     fontWeight: '700',
//     color: '#ff6a00',
//     marginRight: 6,
//   },

//   oldPrice: {
//     fontSize: 12,
//     color: '#999',
//     textDecorationLine: 'line-through',
//   },

//   button: {
//     backgroundColor: '#ff6a00',
//     borderRadius: 20,
//     paddingVertical: 8,
//     alignItems: 'center',
//   },

//   buttonText: {
//     color: '#fff',
//     fontWeight: '600',
//     fontSize: 14,
//   },
// });

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
  Modal
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../theme/colors';
import { SvgXml } from 'react-native-svg';
import { Cart_SVG, Search_SVG, wishlistSvg } from '../constants/SVGImages';
import Config from 'react-native-config';

const { width } = Dimensions.get('window');
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


  const addToCart = (product) => {
    setCart((currentCart) => {
      // Check if item already exists
      const exists = currentCart.find((item) => item.id === product.id);

      if (exists) {
        alert(`${product.name} is already in your cart!`);
        return currentCart;
      }

      alert(`${product.name} added to cart!`);
      return [...currentCart, { ...product, quantity: 1 }];
    });
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);


      if (!SHOPIFY_ADMIN_TOKEN) {
        console.error("Config Error: SHOPIFY_API_KEY is undefined. Check your .env file.");
        setLoading(false);
        return;
      }

      const response = await fetch('https://demoeshopgenius.myshopify.com/admin/api/2026-01/products.json', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': SHOPIFY_ADMIN_TOKEN,
        },
      });

      const json = await response.json();
      console.log("Shopify API Response:", json);

      if (json.errors) {
        console.error("Shopify API Error:", json.errors);

        setProducts([]);
        return;
      }

      if (json && json.products) {
        const transformedProducts = json.products.map(item => ({
          id: item.id.toString(),
          name: item.title,
          price: item.variants[0]?.price || '0',
          oldPrice: item.variants[0]?.compare_at_price || null,
          discount: item.variants[0]?.compare_at_price
            ? Math.round(((parseFloat(item.variants[0].compare_at_price) - parseFloat(item.variants[0].price)) / parseFloat(item.variants[0].compare_at_price)) * 100) + '% OFF'
            : null,
          rating: 4.5,
          reviews: 120,
          // Updated Image Logic: Checks for the first image in the array
          image: item.images && item.images.length > 0
            ? { uri: item.images[0].src }
            : item.image?.src
              ? { uri: item.image.src }
              : require('../assets/BannerImage1.jpg'),
        }));

        setProducts(transformedProducts);
      }
    } catch (error) {
      console.error("Network Fetch Error:", error);
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

  // 2. Memoized Render Item for performance
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

      <Image
        source={item.image}
        style={styles.image}
        resizeMode="cover"
      />

      <Text style={styles.name} numberOfLines={1}>{item.name}</Text>

      <View style={styles.ratingRow}>
        <Text>⭐</Text>
        <Text style={styles.rating}>{item.rating} ({item.reviews})</Text>
      </View>

      <View style={styles.priceRow}>
        <Text style={styles.price}>₹{item.price}</Text>
        {item.oldPrice && <Text style={styles.oldPrice}>₹{item.oldPrice}</Text>}
      </View>

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.7}
        onPress={() => addToCart(item)}
      >
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
          <TouchableOpacity style={styles.cartBtn} onPress={() => setIsCartVisible(true)}>
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
          {CATEGORIES.map((item) => (
            <TouchableOpacity
              key={item}
              style={[styles.categoryChip, selectedCategory === item && styles.activeChip]}
              onPress={() => setSelectedCategory(item)}
            >
              <Text style={[styles.categoryText, selectedCategory === item && styles.activeText]}>
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
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingBottom: 100,
          }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isCartVisible}
        onRequestClose={() => setIsCartVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Your Cart ({cart.length})</Text>
              <TouchableOpacity onPress={() => setIsCartVisible(false)}>
                <Icon name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            {cart.length === 0 ? (
              <Text style={styles.emptyCartText}>Your cart is empty!</Text>
            ) : (
              <FlatList
                data={cart}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={styles.cartItem}>
                    <Image source={item.image} style={styles.cartItemImage} />
                    <View style={styles.cartItemDetails}>
                      <Text style={styles.cartItemName}>{item.name}</Text>
                      <Text style={styles.cartItemPrice}>₹{item.price}</Text>
                    </View>
                  </View>
                )}
              />
            )}

            <TouchableOpacity style={styles.checkoutBtn}>
              <Text style={styles.buttonText}>Proceed to Checkout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({

  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  container: { flex: 1, backgroundColor: '#f7f7f7' },
  header: { backgroundColor: COLORS.APP_BACKGROUND || '#ff6a00', padding: 16, paddingBottom: 24 },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  cartBtn: { padding: 6, backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: 20 },
  title: { fontSize: 22, fontWeight: '700', color: '#fff' },
  subtitle: { color: '#ffe1cc', fontSize: 14 },
  searchBox: { backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 20, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, height: 40, marginTop: 15 },
  searchInput: { flex: 1, paddingLeft: 8, color: '#fff' },
  categoryList: { paddingHorizontal: 16, paddingVertical: 12 },
  categoryChip: { backgroundColor: '#fff', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, marginRight: 10, elevation: 2 },
  activeChip: { backgroundColor: '#ff6a00' },
  categoryText: { color: '#333', fontWeight: '500' },
  activeText: { color: '#fff' },
  list: { paddingHorizontal: 16, paddingBottom: 24 },
  columnWrapper: { justifyContent: 'space-between' },
  card: { width: CARD_WIDTH, backgroundColor: '#fff', borderRadius: 16, padding: 12, marginBottom: 16, elevation: 3 },
  image: { width: '100%', height: 120, borderRadius: 12, marginBottom: 8 },
  name: { fontSize: 14, fontWeight: '600', color: '#333' },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 4 },
  rating: { fontSize: 12, marginLeft: 4, color: '#555' },
  priceRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  price: { fontSize: 15, fontWeight: '700', color: '#ff6a00', marginRight: 6 },
  oldPrice: { fontSize: 12, color: '#999', textDecorationLine: 'line-through' },
  button: { backgroundColor: '#ff6a00', borderRadius: 20, paddingVertical: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '600' },
  discountBadge: { position: 'absolute', top: 8, left: 8, backgroundColor: '#ff3b3b', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6, zIndex: 1 },
  discountText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
  wishlist: { position: 'absolute', top: 8, right: 8, zIndex: 1, backgroundColor: '#fff', borderRadius: 15, padding: 4 },
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
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
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
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  cartItem: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
  },
  cartItemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  cartItemDetails: {
    marginLeft: 15,
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: '600',
  },
  cartItemPrice: {
    color: '#ff6a00',
    fontWeight: 'bold',
  },
  emptyCartText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#888',
  },
  checkoutBtn: {
    backgroundColor: '#ff6a00',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
});
