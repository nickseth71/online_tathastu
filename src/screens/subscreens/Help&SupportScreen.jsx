import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../theme/colors';
import { SvgXml } from 'react-native-svg';
import { Back_Arrow_SVG, Dopup_SVG, Dropdown_SVG, Dropup_SVG } from '../../constants/SVGImages';


export default function HelpSupportScreen() {
    const navigation = useNavigation();
    const [expanded, setExpanded] = useState(null);
    const [message, setMessage] = useState('');

    const faqs = [
        {
            id: 1,
            question: 'How do I book a service?',
            answer: 'Go to the home screen, select your service and confirm booking.',
        },
        {
            id: 2,
            question: 'How can I cancel my booking?',
            answer: 'Open My Bookings and select cancel option.',
        },
        {
            id: 3,
            question: 'How do I upgrade membership?',
            answer: 'Go to Profile → Membership and select upgrade.',
        },
    ];

    const sendMessage = () => {
        if (!message.trim()) {
            Alert.alert('Error', 'Please enter your message.');
            return;
        }

        Alert.alert('Success', 'Your message has been sent to support.');
        setMessage('');
    };

    return (
        <SafeAreaView style={styles.container}>

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <SvgXml xml={Back_Arrow_SVG} width={34} height={34} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Help & Support</Text>
                <View style={{ width: 22 }} />
            </View>

            <ScrollView contentContainerStyle={{ padding: 16 }}>

                {/* FAQ Section */}
                <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>

                {faqs.map(item => (
                    <View key={item.id} style={styles.faqCard}>
                        <TouchableOpacity
                            style={styles.faqHeader}
                            onPress={() => setExpanded(expanded === item.id ? null : item.id)}
                        >
                            <Text style={styles.faqQuestion}>{item.question}</Text>
                            <SvgXml
                                xml={expanded === item.id ? Dropup_SVG : Dropdown_SVG}
                                width={18}
                                height={18}
                            />
                        </TouchableOpacity>

                        {expanded === item.id && (
                            <Text style={styles.faqAnswer}>{item.answer}</Text>
                        )}
                    </View>
                ))}

                {/* Contact Section */}
                <Text style={[styles.sectionTitle, { marginTop: 20 }]}>
                    Contact Us
                </Text>

                <View style={styles.contactCard}>
                    <TouchableOpacity style={styles.contactRow}>
                        <Icon name="call-outline" size={20} color="#f97316" />
                        <Text style={styles.contactText}>+91 98765 43210</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.contactRow}>
                        <Icon name="mail-outline" size={20} color="#f97316" />
                        <Text style={styles.contactText}>support@yourapp.com</Text>
                    </TouchableOpacity>
                </View>

                {/* Message Form */}
                <Text style={[styles.sectionTitle, { marginTop: 20 }]}>
                    Send Us a Message
                </Text>

                <View style={styles.messageCard}>
                    <TextInput
                        style={styles.input}
                        placeholder="Write your issue here..."
                        value={message}
                        onChangeText={setMessage}
                        multiline
                    />

                    <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                        <Text style={styles.sendButtonText}>Send Message</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: COLORS.APP_BACKGROUND,
    },

    headerTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
    },

    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 10,
    },

    faqCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 14,
        marginBottom: 10,
    },

    faqHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    faqQuestion: {
        fontSize: 14,
        fontWeight: '600',
        flex: 1,
        marginRight: 10,
    },

    faqAnswer: {
        marginTop: 8,
        fontSize: 13,
        color: '#555',
    },

    contactCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 14,
    },

    contactRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },

    contactText: {
        marginLeft: 10,
        fontSize: 14,
    },

    messageCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 14,
    },

    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 10,
        height: 100,
        textAlignVertical: 'top',
    },

    sendButton: {
        marginTop: 12,
        backgroundColor: '#f97316',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },

    sendButtonText: {
        color: '#fff',
        fontWeight: '700',
    },
});
