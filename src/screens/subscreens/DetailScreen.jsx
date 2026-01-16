import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { COLORS } from '../../theme/colors';
import { SvgXml } from 'react-native-svg';
import { Back_Arrow_SVG } from '../../constants/SVGImages';

const BookingDetailsScreen = ({ navigation }) => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backArrow}
          onPress={() => navigation.goBack()}
        >
          <SvgXml xml={Back_Arrow_SVG} width={34} height={34} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Upcoming Pooja</Text>
        <Text style={styles.bookingId}>Booking ID: 1</Text>
      </View>

      {/* Countdown Card */}
      <View style={styles.countdownCard}>
        <Text style={styles.countdownTitle}>Pooja starts in</Text>

        <View style={styles.timerRow}>
          <TimeBox value="5" label="Days" />
          <Text style={styles.colon}>:</Text>
          <TimeBox value="10" label="Hours" />
          <Text style={styles.colon}>:</Text>
          <TimeBox value="30" label="Mins" />
        </View>

        <TouchableOpacity style={styles.liveButton}>
          <Text style={styles.liveButtonText}>📹 Join Live Pooja</Text>
        </TouchableOpacity>
      </View>

      {/* Pooja Details */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Pooja Details</Text>

        <DetailRow label="Date" value="Dec 20, 2025" />
        <DetailRow label="Time" value="10:00 AM - 12:00 PM" />
        <DetailRow label="Pandit" value="Pandit Rajesh Sharma" />
        <DetailRow label="Location" value="Home Service" />
      </View>

      {/* Pre-Pooja Checklist */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Pre-Pooja Checklist</Text>

        <ChecklistItem text="Clean the pooja area" />
        <ChecklistItem text="Keep fresh flowers ready" />
        <ChecklistItem text="Arrange seating for participants" />
        <ChecklistItem text="Test video connection" />
      </View>

      {/* Actions */}
      <TouchableOpacity style={styles.chatButton}>
        <Text style={styles.chatButtonText}>💬 Chat with Pandit</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.invoiceButton}>
        <Text style={styles.invoiceButtonText}>⬇ Download Invoice</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

/* ---------- Small Components ---------- */

const TimeBox = ({ value, label }) => (
  <View style={styles.timeBox}>
    <Text style={styles.timeValue}>{value}</Text>
    <Text style={styles.timeLabel}>{label}</Text>
  </View>
);

const DetailRow = ({ label, value }) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

const ChecklistItem = ({ text }) => (
  <View style={styles.checklistRow}>
    <Text style={styles.checkbox}>☐</Text>
    <Text style={styles.checklistText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF6EC',
  },

  header: {
    backgroundColor: COLORS.APP_BACKGROUND,
    padding: 20,
  },
  backArrow: {
    color: '#fff',
    fontSize: 22,
    marginBottom: 8,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
  },
  bookingId: {
    color: '#FFE3CC',
    marginTop: 4,
  },

  countdownCard: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    elevation: 4,
  },
  countdownTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
    marginBottom: 12,
  },
  timerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  timeBox: {
    alignItems: 'center',
  },
  timeValue: {
    fontSize: 26,
    fontWeight: '700',
    color: '#FF6A00',
  },
  timeLabel: {
    fontSize: 12,
    color: '#777',
  },
  colon: {
    fontSize: 22,
    marginHorizontal: 10,
    color: '#FF6A00',
  },
  liveButton: {
    backgroundColor: '#2ECC71',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  liveButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },

  card: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    padding: 16,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
    color: '#333',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailLabel: {
    color: '#777',
  },
  detailValue: {
    fontWeight: '600',
    color: '#222',
  },

  checklistRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    fontSize: 18,
    marginRight: 10,
  },
  checklistText: {
    color: '#444',
  },

  chatButton: {
    borderWidth: 1.5,
    borderColor: '#FF6A00',
    marginHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 12,
  },
  chatButtonText: {
    color: '#FF6A00',
    fontWeight: '600',
  },

  invoiceButton: {
    marginHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 2,
  },
  invoiceButtonText: {
    color: '#444',
    fontWeight: '600',
  },
});

export default BookingDetailsScreen;
