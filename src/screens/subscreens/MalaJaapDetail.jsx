// import React, { useState, useRef, useCallback } from "react";
// import {
//     View,
//     Text,
//     StyleSheet,
//     PanResponder,
//     Animated,
//     TouchableOpacity,
//     Easing,
// } from "react-native";
// import Svg, { Circle, Line, Ellipse, Defs, RadialGradient, Stop } from "react-native-svg";

// const TOTAL_BEADS = 108;
// const GURU_POSITIONS = [0, 9, 18, 27, 36, 45, 54, 63, 72, 81, 90, 99];
// const RADIUS = 150;
// const CENTER = RADIUS + 40;

// function RudrakshaBead({ size, isActive, isGuru, isAnimating }) {
//     const r = size / 2 - 1;
//     const cx = size / 2;
//     const cy = size / 2;
//     const numLines = isGuru ? 7 : 5;

//     const lines = Array.from({ length: numLines }).map((_, i) => {
//         const angle = (Math.PI * i) / numLines;
//         return {
//             x1: cx + (r - 2) * Math.cos(angle),
//             y1: cy + (r - 2) * Math.sin(angle),
//             x2: cx - (r - 2) * Math.cos(angle),
//             y2: cy - (r - 2) * Math.sin(angle),
//         };
//     });

//     const baseColor = isGuru ? (isActive ? "#c0392b" : "#7d3c0a") : (isActive ? "#d35400" : "#5d2d0a");

//     return (
//         <View style={{
//             transform: [{ scale: isAnimating ? 1.4 : 1 }],
//             elevation: isAnimating ? 8 : 2, // Shadow for Android
//         }}>
//             <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
//                 <Defs>
//                     <RadialGradient id={`rg-${isGuru}-${isActive}`} cx="40%" cy="35%" r="60%">
//                         <Stop offset="0%" stopColor={isActive ? (isGuru ? "#f2a08a" : "#f2b08a") : "#c1876a"} />
//                         <Stop offset="40%" stopColor={baseColor} />
//                         <Stop offset="100%" stopColor={isGuru ? "#3e1505" : "#2a1005"} />
//                     </RadialGradient>
//                 </Defs>
//                 <Circle cx={cx} cy={cy} r={r} fill={`url(#rg-${isGuru}-${isActive})`} />
//                 {lines.map((l, i) => (
//                     <Line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="rgba(0,0,0,0.4)" strokeWidth={0.8} />
//                 ))}
//                 <Ellipse cx={cx - r * 0.2} cy={cy - r * 0.3} rx={r * 0.25} ry={r * 0.15} fill="rgba(255,255,255,0.2)" />
//             </Svg>
//         </View>
//     );
// }

// export default function RudrakshaMala() {
//     const [count, setCount] = useState(0);
//     const [mantraCount, setMantraCount] = useState(0);
//     const [animatingBead, setAnimatingBead] = useState(null);

//     // Animation value for rotation
//     const rotationAnim = useRef(new Animated.Value(0)).current;

//     const rotateMala = (direction) => {
//         // 360 degrees / 108 beads = ~3.33 degrees per bead
//         const step = 360 / TOTAL_BEADS;
//         const toValue = direction === 'up' ? -step : step;

//         Animated.timing(rotationAnim, {
//             toValue: rotationAnim._value + toValue,
//             duration: 200,
//             easing: Easing.out(Easing.quad),
//             useNativeDriver: true,
//         }).start();
//     };

//     const handleIncrement = useCallback(() => {
//         setCount(prev => {
//             if (prev >= TOTAL_BEADS) return prev;
//             const next = prev + 1;
//             setAnimatingBead(next - 1);
//             rotateMala('up');

//             if (next === TOTAL_BEADS) {
//                 setMantraCount(m => m + 1);
//                 setTimeout(() => {
//                     setCount(0);
//                     rotationAnim.setValue(0);
//                 }, 1500);
//             }

//             setTimeout(() => setAnimatingBead(null), 300);
//             return next;
//         });
//     }, []);

//     const handleDecrement = useCallback(() => {
//         setCount(prev => {
//             if (prev <= 0) return 0;
//             rotateMala('down');
//             return prev - 1;
//         });
//     }, []);

//     const panResponder = useRef(
//         PanResponder.create({
//             onStartShouldSetPanResponder: () => true,
//             onMoveShouldSetPanResponder: () => true,
//             onPanResponderMove: (_, gesture) => {
//                 // Threshold of 30px swipe to trigger a bead
//                 if (gesture.dy < -30) {
//                     handleIncrement();
//                     gesture.dy = 0; // Reset delta so it doesn't fire multiple times in one swipe
//                 } else if (gesture.dy > 30) {
//                     handleDecrement();
//                     gesture.dy = 0;
//                 }
//             },
//         })
//     ).current;

//     const beads = Array.from({ length: TOTAL_BEADS }).map((_, i) => {
//         const angle = (2 * Math.PI * i) / TOTAL_BEADS - Math.PI / 2;
//         const x = RADIUS * Math.cos(angle);
//         const y = RADIUS * Math.sin(angle);
//         const isGuru = GURU_POSITIONS.includes(i);
//         const beadSize = isGuru ? 24 : 16;
//         return { i, x, y, isGuru, beadSize };
//     });

//     const rotationInterpolate = rotationAnim.interpolate({
//         inputRange: [0, 360],
//         outputRange: ['0deg', '360deg'],
//     });

//     return (
//         <View style={styles.page}>
//             <View style={styles.header}>
//                 <Text style={styles.omHeader}>ॐ</Text>
//                 <Text style={styles.title}>रुद्राक्ष माला</Text>
//             </View>

//             <View style={styles.counterRow}>
//                 <Text style={styles.countLarge}>{count}</Text>
//                 <Text style={styles.countSmall}>/ 108</Text>
//             </View>

//             {mantraCount > 0 && (
//                 <View style={styles.mantraBadge}>
//                     <Text style={styles.mantraText}>{mantraCount} माला पूर्ण</Text>
//                 </View>
//             )}

//             {/* Wrapping the Mala in an Animated View for the rotation effect */}
//             <Animated.View
//                 {...panResponder.panHandlers}
//                 style={[styles.malaContainer, { transform: [{ rotate: rotationInterpolate }] }]}
//             >
//                 <Svg style={styles.absoluteSvg} width={CENTER * 2} height={CENTER * 2}>
//                     <Circle cx={CENTER} cy={CENTER} r={RADIUS} stroke="#4a2508" strokeWidth="1" strokeDasharray="5,5" opacity={0.3} />
//                 </Svg>

//                 {beads.map(({ i, x, y, isGuru, beadSize }) => (
//                     <View
//                         key={i}
//                         style={{
//                             position: "absolute",
//                             left: CENTER + x - beadSize / 2,
//                             top: CENTER + y - beadSize / 2,
//                             zIndex: i === animatingBead ? 10 : 1
//                         }}
//                     >
//                         <RudrakshaBead
//                             size={beadSize}
//                             isActive={i < count}
//                             isGuru={isGuru}
//                             isAnimating={i === animatingBead}
//                         />
//                     </View>
//                 ))}
//             </Animated.View>

//             <View style={styles.centerLabels}>
//                 <Text style={styles.centerOm}>ॐ</Text>
//                 <Text style={styles.centerSubText}>नमः शिवाय</Text>
//             </View>

//             <TouchableOpacity onPress={() => { setCount(0); rotationAnim.setValue(0); }} style={styles.resetBtn}>
//                 <Text style={styles.resetText}>RESET</Text>
//             </TouchableOpacity>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     page: { flex: 1, backgroundColor: "#1a0800", alignItems: "center", paddingTop: 60 },
//     header: { alignItems: 'center', marginBottom: 20 },
//     omHeader: { fontSize: 32, color: '#e8a040' },
//     title: { fontSize: 28, fontWeight: "bold", color: "#f0c060" },
//     counterRow: { flexDirection: 'row', alignItems: 'baseline', marginBottom: 10 },
//     countLarge: { fontSize: 72, fontWeight: '900', color: '#ff8c30' },
//     countSmall: { fontSize: 24, color: '#8a5020', marginLeft: 10 },
//     mantraBadge: { backgroundColor: "rgba(180,80,20,0.2)", paddingHorizontal: 20, paddingVertical: 5, borderRadius: 20, marginBottom: 20 },
//     mantraText: { color: "#f0c060" },
//     malaContainer: { width: CENTER * 2, height: CENTER * 2 },
//     absoluteSvg: { position: 'absolute' },
//     centerLabels: { position: 'absolute', top: '56%', alignItems: 'center' },
//     centerOm: { fontSize: 40, color: "#e8a040", opacity: 0.8 },
//     centerSubText: { fontSize: 12, color: "#c8804a" },
//     resetBtn: { marginTop: 40, paddingVertical: 10, paddingHorizontal: 30, borderRadius: 20, borderWidth: 1, borderColor: "#c87040" },
//     resetText: { color: "#c87040", fontWeight: "bold" },
// });



import React, { useState, useRef, useCallback } from "react";
import {
    View,
    Text,
    StyleSheet,
    PanResponder,
    Animated,
    TouchableOpacity,
    Easing,
    Platform
} from "react-native";
import Svg, { Circle, Line, Ellipse, Defs, RadialGradient, Stop } from "react-native-svg";

const TOTAL_BEADS = 108;
const GURU_POSITIONS = [0, 9, 18, 27, 36, 45, 54, 63, 72, 81, 90, 99];
const RADIUS = 150;
const CENTER = RADIUS + 40;

function RudrakshaBead({ size, isActive, isGuru, isAnimating }) {
    const r = size / 2 - 1;
    const cx = size / 2;
    const cy = size / 2;
    const numLines = isGuru ? 7 : 5;

    const lines = Array.from({ length: numLines }).map((_, i) => {
        const angle = (Math.PI * i) / numLines;
        return {
            x1: cx + (r - 2) * Math.cos(angle),
            y1: cy + (r - 2) * Math.sin(angle),
            x2: cx - (r - 2) * Math.cos(angle),
            y2: cy - (r - 2) * Math.sin(angle),
        };
    });

    // Updated colors to be more vibrant on white
    const activeColor = isGuru ? "#E74C3C" : "#E67E22";
    const inactiveColor = isGuru ? "#8B4513" : "#A0522D";
    const baseColor = isActive ? activeColor : inactiveColor;

    return (
        <View style={[
            styles.beadShadow,
            { transform: [{ scale: isAnimating ? 1.3 : 1 }] }
        ]}>
            <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ backgroundColor: 'transparent' }}>
                <Defs>
                    <RadialGradient id={`rg-${isGuru}-${isActive}`} cx="40%" cy="35%" r="60%">

                        <Stop offset="0%" stopColor={isActive ? "#FFD5C2" : "#D2B48C"} />
                        <Stop offset="50%" stopColor={baseColor} />
                        <Stop offset="100%" stopColor={isActive ? "#922B21" : "#5D2D0A"} />
                    </RadialGradient>
                </Defs>
                <Circle cx={cx} cy={cy} r={r} fill={`url(#rg-${isGuru}-${isActive})`} />
                {lines.map((l, i) => (
                    <Line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="rgba(0,0,0,0.3)" strokeWidth={0.8} />
                ))}
            </Svg>
        </View>
    );
}

export default function RudrakshaMala() {
    const [count, setCount] = useState(0);
    const [mantraCount, setMantraCount] = useState(0);
    const [animatingBead, setAnimatingBead] = useState(null);
    const rotationAnim = useRef(new Animated.Value(0)).current;

    const rotateMala = (direction) => {
        const step = 360 / TOTAL_BEADS;
        const toValue = direction === 'up' ? -step : step;
        Animated.timing(rotationAnim, {
            toValue: rotationAnim._value + toValue,
            duration: 180,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
        }).start();
    };

    const handleIncrement = useCallback(() => {
        setCount(prev => {
            if (prev >= TOTAL_BEADS) return prev;
            const next = prev + 1;
            setAnimatingBead(next - 1);
            rotateMala('up');
            if (next === TOTAL_BEADS) {
                setMantraCount(m => m + 1);
                setTimeout(() => {
                    setCount(0);
                    rotationAnim.setValue(0);
                }, 1000);
            }
            setTimeout(() => setAnimatingBead(null), 250);
            return next;
        });
    }, []);

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: (_, gesture) => {
                if (gesture.dy < -30) {
                    handleIncrement();
                    gesture.dy = 0;
                }
            },
        })
    ).current;

    const beads = Array.from({ length: TOTAL_BEADS }).map((_, i) => {
        const angle = (2 * Math.PI * i) / TOTAL_BEADS - Math.PI / 2;
        const x = RADIUS * Math.cos(angle);
        const y = RADIUS * Math.sin(angle);
        const isGuru = GURU_POSITIONS.includes(i);
        const beadSize = isGuru ? 22 : 16;
        return { i, x, y, isGuru, beadSize };
    });

    const rotationInterpolate = rotationAnim.interpolate({
        inputRange: [0, 360],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <View style={styles.page}>
            <View style={styles.header}>
                <Text style={styles.omHeader}>ॐ</Text>
                <Text style={styles.title}>रुद्राक्ष माला</Text>
            </View>

            <View style={styles.counterContainer}>
                <Text style={styles.countLarge}>{count}</Text>
                <Text style={styles.countSmall}>/ 108</Text>
            </View>

            {mantraCount > 0 && (
                <View style={styles.mantraBadge}>
                    <Text style={styles.mantraText}>{mantraCount} माला पूर्ण</Text>
                </View>
            )}

            <View style={styles.malaWrapper}>
                <Animated.View
                    {...panResponder.panHandlers}
                    style={[styles.malaContainer, { transform: [{ rotate: rotationInterpolate }] }]}
                >
                    <Svg style={styles.absoluteSvg} width={CENTER * 2} height={CENTER * 2}>
                        <Circle cx={CENTER} cy={CENTER} r={RADIUS} stroke="#D35400" strokeWidth="0.5" strokeDasharray="4,4" opacity={0.15} />
                    </Svg>

                    {beads.map(({ i, x, y, isGuru, beadSize }) => (
                        <View
                            key={i}
                            style={{
                                position: "absolute",
                                left: CENTER + x - beadSize / 2,
                                top: CENTER + y - beadSize / 2,
                                zIndex: i === animatingBead ? 10 : 1
                            }}
                        >
                            <RudrakshaBead size={beadSize} isActive={i < count} isGuru={isGuru} isAnimating={i === animatingBead} />
                        </View>
                    ))}
                </Animated.View>

                {/* Central Tap Area - Pure White Background */}
                <TouchableOpacity activeOpacity={0.8} onPress={handleIncrement} style={styles.centerTapArea}>
                    <Text style={styles.centerOm}>ॐ</Text>
                    <Text style={styles.centerSubText}>नमः शिवाय</Text>
                    <View style={styles.tapPill}>
                        <Text style={styles.tapPillText}>TAP</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => { setCount(0); rotationAnim.setValue(0); }} style={styles.resetBtn}>
                <Text style={styles.resetText}>RESET COUNTER</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        paddingTop: 50
    },
    header: { alignItems: 'center' },
    omHeader: { fontSize: 30, color: '#D35400' },
    title: { fontSize: 24, fontWeight: "800", color: "#8E44AD", marginBottom: 10 },
    counterContainer: { flexDirection: 'row', alignItems: 'baseline', marginBottom: 5 },
    countLarge: { fontSize: 80, fontWeight: '900', color: '#2C3E50' },
    countSmall: { fontSize: 20, color: '#7F8C8D', marginLeft: 5 },
    mantraBadge: {
        backgroundColor: "#F4ECF7",
        paddingHorizontal: 15,
        paddingVertical: 4,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#D7BDE2'
    },
    mantraText: { color: "#8E44AD", fontWeight: '700', fontSize: 12 },
    malaWrapper: {
        width: CENTER * 2,
        height: CENTER * 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    malaContainer: { width: CENTER * 2, height: CENTER * 2, backgroundColor: 'transparent' },
    absoluteSvg: { position: 'absolute' },
    beadShadow: {
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.15,
                shadowRadius: 1.5,
            },
            android: {
                elevation: 1,
            }
        })
    },
    centerTapArea: {
        position: 'absolute',
        width: 280,
        height: 280,
        borderRadius: 140,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 20,

        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
    },
    centerOm: { fontSize: 50, color: "#D35400" },
    centerSubText: { fontSize: 14, color: "#2C3E50", fontWeight: '600' },
    tapPill: {
        marginTop: 8,
        paddingHorizontal: 22,
        paddingVertical: 5,
        borderRadius: 10,
        backgroundColor: '#D35400',
    },
    tapPillText: { fontSize: 12, color: "#FFF", fontWeight: '900' },
    resetBtn: {
        marginTop: 30,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 30,
        backgroundColor: '#F2F3F4'
    },
    resetText: { color: "#7F8C8D", fontWeight: "800", fontSize: 14 },
});