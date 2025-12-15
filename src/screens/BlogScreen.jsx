import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Dimensions,
    TouchableWithoutFeedback,
    TouchableOpacity,
} from 'react-native';
import Video from 'react-native-video';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';

const { height, width } = Dimensions.get('window');

const VIDEO_BLOGS = [
    {
        id: '1',
        title: 'Travel Vlog',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    },
    {
        id: '2',
        title: 'React Native Tutorial',
        videoUrl: 'https://www.w3schools.com/html/movie.mp4',
    },
];

export default function BlogsScreen() {
    const isFocused = useIsFocused();
    const [activeIndex, setActiveIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const [muted, setMuted] = useState(false);
    const [liked, setLiked] = useState({});

    const onViewableItemsChanged = useRef(({ viewableItems }) => {
        if (viewableItems.length > 0) {
            setActiveIndex(viewableItems[0].index);
            setPaused(false);
        }
    }).current;

    const renderItem = ({ item, index }) => (
        <View style={styles.videoContainer}>
            {/* TAP TO PLAY / PAUSE */}
            <TouchableWithoutFeedback onPress={() => setPaused(!paused)}>
                <Video
                    source={{ uri: item.videoUrl }}
                    style={styles.video}
                    resizeMode="cover"
                    repeat
                    paused={!isFocused || activeIndex !== index || paused}
                    muted={muted}
                />
            </TouchableWithoutFeedback>

            {/* RIGHT ACTIONS */}
            <View style={styles.rightActions}>
                <TouchableOpacity
                    onPress={() => setLiked({ ...liked, [item.id]: !liked[item.id] })}
                >
                    <Text style={styles.actionIcon}>{liked[item.id] ? '❤️' : '🤍'}</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text style={styles.actionIcon}>💬</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text style={styles.actionIcon}>📤</Text>
                </TouchableOpacity>

                {/* MUTE / UNMUTE */}
                <TouchableOpacity onPress={() => setMuted(!muted)}>
                    <Text style={styles.actionIcon}>{muted ? '🔇' : '🔊'}</Text>
                </TouchableOpacity>
            </View>

            {/* BOTTOM INFO */}
            <View style={styles.bottomInfo}>
                <Text style={styles.title}>{item.title}</Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
            <FlatList
                data={VIDEO_BLOGS}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                pagingEnabled
                showsVerticalScrollIndicator={false}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={{ itemVisiblePercentThreshold: 80 }}
                snapToInterval={height}
                decelerationRate="fast"
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    videoContainer: {
        width,
        height,
        backgroundColor: 'black',
    },
    video: {
        width: '100%',
        height: '100%',
    },
    rightActions: {
        position: 'absolute',
        right: 15,
        bottom: 120,
        alignItems: 'center',
    },
    actionIcon: {
        fontSize: 30,
        marginVertical: 12,
        color: 'white',
    },
    bottomInfo: {
        position: 'absolute',
        bottom: 40,
        left: 20,
    },
    title: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
