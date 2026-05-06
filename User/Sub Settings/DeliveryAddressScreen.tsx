import { Animated, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useRef, useState } from 'react';
import { COLORS } from '../constants';
import BottomNavBar from '../components/BottomNavBar';
import TopHeader from '../components/TopHeader';

type Address = {
  id: string;
  label: string;
  street: string;
  city: string;
  zip: string;
  isDefault: boolean;
};

type DeliveryAddressScreenProps = {
  onBack?: () => void;
  onHome?: () => void;
  onMenu?: () => void;
  onOrders?: () => void;
  onProfile?: () => void;
};

export default function DeliveryAddressScreen({
  onBack,
  onHome,
  onMenu,
  onOrders,
  onProfile,
}: DeliveryAddressScreenProps) {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: '1',
      label: 'Home',
      street: '123 Main Street, Apt 4B',
      city: 'New York, NY 10001',
      zip: '10001',
      isDefault: true,
    },
    {
      id: '2',
      label: 'Office',
      street: '456 Business Ave, Suite 200',
      city: 'New York, NY 10002',
      zip: '10002',
      isDefault: false,
    },
  ]);
  const activeKey = 'profile';
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const headerTranslate = useRef(new Animated.Value(12)).current;
  const contentOpacity = useRef(new Animated.Value(0)).current;
  const contentTranslate = useRef(new Animated.Value(12)).current;

  useEffect(() => {
    Animated.stagger(140, [
      Animated.parallel([
        Animated.timing(headerOpacity, {
          toValue: 1,
          duration: 420,
          useNativeDriver: true,
        }),
        Animated.timing(headerTranslate, {
          toValue: 0,
          duration: 420,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(contentOpacity, {
          toValue: 1,
          duration: 420,
          useNativeDriver: true,
        }),
        Animated.timing(contentTranslate, {
          toValue: 0,
          duration: 420,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [contentOpacity, contentTranslate, headerOpacity, headerTranslate]);

  return (
    <View style={styles.screen}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View
            style={[
              styles.headerWrap,
              {
                opacity: headerOpacity,
                transform: [{ translateY: headerTranslate }],
              },
            ]}
          >
            <TopHeader subtitle="Addresses" />
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Delivery Addresses</Text>
              <Text style={styles.headerSubtitle}>
                Manage your saved delivery locations.
              </Text>
            </View>
          </Animated.View>

          <Animated.View
            style={[
              styles.contentWrap,
              {
                opacity: contentOpacity,
                transform: [{ translateY: contentTranslate }],
              },
            ]}
          >
            {addresses.map((address) => (
              <View key={address.id} style={styles.addressCard}>
                <View style={styles.addressHeader}>
                  <Text style={styles.addressLabel}>{address.label}</Text>
                  {address.isDefault && <Text style={styles.defaultBadge}>Default</Text>}
                </View>
                <Text style={styles.addressStreet}>{address.street}</Text>
                <Text style={styles.addressCity}>{address.city}</Text>
                <View style={styles.addressActions}>
                  <Pressable style={styles.editLink}>
                    <Text style={styles.editLinkText}>Edit</Text>
                  </Pressable>
                  <Text style={styles.separator}>•</Text>
                  <Pressable style={styles.deleteLink}>
                    <Text style={styles.deleteLinkText}>Delete</Text>
                  </Pressable>
                </View>
              </View>
            ))}

            <Pressable style={styles.addButton}>
              <Text style={styles.addButtonText}>+ Add New Address</Text>
            </Pressable>
          </Animated.View>
        </ScrollView>

        <BottomNavBar
          activeKey={activeKey}
          onNavigate={(key) => {
            if (key === 'home') {
              onHome?.();
            }
            if (key === 'menu') {
              onMenu?.();
            }
            if (key === 'orders') {
              onOrders?.();
            }
            if (key === 'profile') {
              onProfile?.();
            }
          }}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  safeArea: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 18,
    paddingBottom: 140,
    gap: 16,
  },
  headerWrap: {
    width: '100%',
  },
  contentWrap: {
    width: '100%',
    gap: 12,
  },
  backButton: {
    fontFamily: 'LeagueSpartan_500Medium',
    fontSize: 12,
    color: COLORS.ink,
  },
  header: {
    gap: 4,
  },
  headerTitle: {
    fontFamily: 'LeagueSpartan_700Bold',
    fontSize: 24,
    color: COLORS.ink,
  },
  headerSubtitle: {
    fontFamily: 'LeagueSpartan_400Regular',
    fontSize: 12,
    color: COLORS.softInk,
  },
  addressCard: {
    padding: 14,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 8,
  },
  addressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addressLabel: {
    fontFamily: 'LeagueSpartan_700Bold',
    fontSize: 16,
    color: COLORS.ink,
  },
  defaultBadge: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 999,
    backgroundColor: 'rgba(43, 185, 166, 0.15)',
    fontFamily: 'LeagueSpartan_600SemiBold',
    fontSize: 10,
    color: COLORS.teal,
  },
  addressStreet: {
    fontFamily: 'LeagueSpartan_500Medium',
    fontSize: 13,
    color: COLORS.ink,
  },
  addressCity: {
    fontFamily: 'LeagueSpartan_400Regular',
    fontSize: 12,
    color: COLORS.softInk,
  },
  addressActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 6,
  },
  editLink: {
    paddingVertical: 4,
  },
  editLinkText: {
    fontFamily: 'LeagueSpartan_600SemiBold',
    fontSize: 11,
    color: COLORS.orange,
  },
  deleteLink: {
    paddingVertical: 4,
  },
  deleteLinkText: {
    fontFamily: 'LeagueSpartan_600SemiBold',
    fontSize: 11,
    color: COLORS.red,
  },
  separator: {
    fontFamily: 'LeagueSpartan_400Regular',
    fontSize: 11,
    color: COLORS.muted,
  },
  addButton: {
    marginTop: 12,
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
    backgroundColor: 'rgba(244, 162, 58, 0.08)',
  },
  addButtonText: {
    fontFamily: 'LeagueSpartan_700Bold',
    fontSize: 14,
    color: COLORS.orange,
  },
});
