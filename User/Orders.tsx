import { Animated, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useRef } from 'react';
import { COLORS } from './constants';
import BottomNavBar from './components/BottomNavBar';
import TopHeader from './components/TopHeader';

type OrdersScreenProps = {
  onHome?: () => void;
  onMenu?: () => void;
  onOrders?: () => void;
  onProfile?: () => void;
};

export default function OrdersScreen({
  onHome,
  onMenu,
  onOrders,
  onProfile,
}: OrdersScreenProps) {
  const activeKey = 'orders';
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
            <TopHeader subtitle="Orders" />
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
            <Text style={styles.title}>Orders</Text>
            <Text style={styles.subtitle}>
              Track catering requests and delivery status.
            </Text>
            <View style={styles.emptyCard}>
              <Text style={styles.emptyTitle}>No active orders</Text>
              <Text style={styles.emptyText}>
                Start a new order to see updates here.
              </Text>
              <Pressable style={styles.primaryButton} onPress={onMenu}>
                <Text style={styles.primaryButtonText}>Browse menu</Text>
              </Pressable>
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
    paddingTop: 10,
    paddingBottom: 140,
    gap: 14,
  },
  headerWrap: {
    width: '100%',
  },
  contentWrap: {
    width: '100%',
    gap: 14,
  },
  title: {
    fontFamily: 'LeagueSpartan_700Bold',
    fontSize: 24,
    color: COLORS.ink,
  },
  subtitle: {
    fontFamily: 'LeagueSpartan_400Regular',
    fontSize: 12,
    color: COLORS.softInk,
  },
  emptyCard: {
    padding: 18,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: '#FFFFFF',
  },
  emptyTitle: {
    fontFamily: 'LeagueSpartan_700Bold',
    fontSize: 16,
    color: COLORS.ink,
  },
  emptyText: {
    fontFamily: 'LeagueSpartan_400Regular',
    fontSize: 12,
    color: COLORS.softInk,
    marginTop: 6,
  },
  primaryButton: {
    marginTop: 12,
    paddingVertical: 12,
    borderRadius: 16,
    alignItems: 'center',
    backgroundColor: COLORS.ink,
  },
  primaryButtonText: {
    fontFamily: 'LeagueSpartan_700Bold',
    fontSize: 14,
    color: '#FFFFFF',
  },
});
