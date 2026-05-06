import { Animated, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useRef, useState } from 'react';
import Svg, { Path } from 'react-native-svg';
import { COLORS } from '../constants';
import BottomNavBar from '../components/BottomNavBar';
import TopHeader from '../components/TopHeader';

type PaymentMethod = {
  id: string;
  type: 'card' | 'wallet';
  label: string;
  details: string;
  isDefault: boolean;
};

type PaymentMethodsScreenProps = {
  onBack?: () => void;
  onHome?: () => void;
  onMenu?: () => void;
  onOrders?: () => void;
  onProfile?: () => void;
};

export default function PaymentMethodsScreen({
  onBack,
  onHome,
  onMenu,
  onOrders,
  onProfile,
}: PaymentMethodsScreenProps) {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      type: 'card',
      label: 'Visa Ending in 4242',
      details: 'Expires 12/26',
      isDefault: true,
    },
    {
      id: '2',
      type: 'card',
      label: 'Mastercard Ending in 5555',
      details: 'Expires 08/25',
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
            <TopHeader subtitle="Payment" />
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Payment Methods</Text>
              <Text style={styles.headerSubtitle}>
                Manage your cards and billing information.
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
            <Text style={styles.sectionTitle}>Saved Cards</Text>
            {paymentMethods.map((method) => (
              <View key={method.id} style={styles.paymentCard}>
                <View style={styles.cardHeader}>
                  <View style={styles.cardIconWrap}>
                    <Svg width={24} height={24} viewBox="0 0 24 24">
                      <Path
                        d="M3 6h18v12H3V6zm0-2h18a2 2 0 012 2v12a2 2 0 01-2 2H3a2 2 0 01-2-2V6a2 2 0 012-2z"
                        fill={COLORS.orange}
                      />
                    </Svg>
                  </View>
                  <View style={styles.cardInfo}>
                    <Text style={styles.cardLabel}>{method.label}</Text>
                    <Text style={styles.cardExpiry}>{method.details}</Text>
                  </View>
                  {method.isDefault && <Text style={styles.defaultBadge}>Default</Text>}
                </View>
                <View style={styles.cardActions}>
                  <Pressable style={styles.actionLink}>
                    <Text style={styles.actionLinkText}>Set as Default</Text>
                  </Pressable>
                  <Text style={styles.separator}>•</Text>
                  <Pressable style={styles.deleteLink}>
                    <Text style={styles.deleteLinkText}>Remove</Text>
                  </Pressable>
                </View>
              </View>
            ))}

            <Pressable style={styles.addButton}>
              <Text style={styles.addButtonText}>+ Add Payment Method</Text>
            </Pressable>

            <View style={styles.infoCard}>
              <Text style={styles.infoTitle}>💳 Security Notice</Text>
              <Text style={styles.infoText}>
                Your payment information is encrypted and stored securely. We never store full card details.
              </Text>
            </View>
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
  sectionTitle: {
    fontFamily: 'LeagueSpartan_700Bold',
    fontSize: 16,
    color: COLORS.ink,
    marginTop: 8,
  },
  paymentCard: {
    padding: 14,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cardIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(244, 162, 58, 0.12)',
  },
  cardInfo: {
    flex: 1,
  },
  cardLabel: {
    fontFamily: 'LeagueSpartan_700Bold',
    fontSize: 14,
    color: COLORS.ink,
  },
  cardExpiry: {
    fontFamily: 'LeagueSpartan_400Regular',
    fontSize: 11,
    color: COLORS.softInk,
    marginTop: 2,
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
  cardActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionLink: {
    paddingVertical: 4,
  },
  actionLinkText: {
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
  infoCard: {
    padding: 12,
    borderRadius: 16,
    backgroundColor: 'rgba(43, 185, 166, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(43, 185, 166, 0.2)',
    gap: 6,
  },
  infoTitle: {
    fontFamily: 'LeagueSpartan_600SemiBold',
    fontSize: 13,
    color: COLORS.teal,
  },
  infoText: {
    fontFamily: 'LeagueSpartan_400Regular',
    fontSize: 11,
    lineHeight: 16,
    color: COLORS.softInk,
  },
});
