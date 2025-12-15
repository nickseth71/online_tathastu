import React from 'react';
import {
    View,
    StyleSheet,
    Image,
    Dimensions,
    Text,
    ScrollView,
    TouchableOpacity,
} from 'react-native';

const screenWidth = Dimensions.get('window').width;

const outerPadding = 20;
const gapBetweenItems = 10;
const squareSize = (screenWidth - outerPadding * 2 - gapBetweenItems) / 2;

const items = [
    { src: require('../assets/bannerImage2.jpg'), title: 'Dharama' },
    { src: require('../assets/BannerImage1.jpg'), title: 'Karm Kand' },
    { src: require('../assets/BannerImage3.jpg'), title: 'Jyotish' },
    { src: require('../assets/bannerImage2.jpg'), title: 'Vastu' },

];

export default function HomeScreen({ navigation }) {

    const handlePressItem = (item) => {
        navigation.navigate('Details', {
            title: item.title,
            src: item.src
        });
    };

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.scrollContent}
        >
            <View style={styles.squaresContainer}>
                {items.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[styles.square, { width: squareSize, height: squareSize }]}
                        activeOpacity={0.8}
                        onPress={() => handlePressItem(item)}
                    >
                        <Image
                            source={item.src}
                            style={styles.image}
                            resizeMode="cover"
                        />
                        <Text style={styles.title}>{item.title}</Text>
                    </TouchableOpacity>
                ))}
            </View>


            <View style={styles.bannerContainer}>
                <Image
                    source={require('../assets/BannerImage1.jpg')}
                    style={styles.banner}
                    resizeMode="cover"
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f2f5',
    },
    scrollContent: {
        paddingBottom: 30,
    },
    header: {
        paddingHorizontal: outerPadding,
        paddingTop: 15,
        paddingBottom: 10,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    headerSubtitle: {
        fontSize: 16,
        color: '#666',
        marginTop: 4,
    },
    // --- Grid Styles ---
    squaresContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: outerPadding,
        marginTop: 10,
    },
    square: {
        marginBottom: gapBetweenItems,
        borderRadius: 12,
        overflow: 'hidden',
        alignItems: 'center',
        backgroundColor: '#fff', shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    image: {
        width: '100%',
        height: '70%',
    },
    title: {
        marginTop: 8,
        paddingBottom: 10,
        textAlign: 'center',
        fontSize: 15,
        fontWeight: '700',
        color: '#333',
    },
    // --- Banner Styles ---
    bannerContainer: {
        alignItems: 'center',
        paddingHorizontal: outerPadding,
        marginTop: 20,
    },
    banner: {
        width: screenWidth - outerPadding * 2,
        height: 120,
        borderRadius: 12,
    },
});