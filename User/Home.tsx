import { useEffect, useRef } from 'react';
import {
  Animated,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from './constants';
import BottomNavBar from './components/BottomNavBar';
import TopHeader from './components/TopHeader';

const FEATURED_ITEMS = [
  {
    title: 'Lemon Herb Roast',
    tag: 'Seafood',
    image: require('../assets/Menu/Food 10.jpg'),
  },
  {
    title: 'Beef Caldereta',
    tag: 'Beef',
    image: require('../assets/Menu/Food 3.jpg'),
  },
  {
    title: 'Halo-Halo Bar',
    tag: 'Dessert',
    image: require('../assets/Menu/Food 9.jpg'),
  },

    {
    title: 'Crispy Pork Belly',
    tag: 'Pork',
    image: require('../assets/Menu/Food 5.jpg'),
  },
];


type HomeScreenProps = {
  onBack?: () => void;
  onViewMenu?: () => void;
  onBookNow?: () => void;
  onProfile?: () => void;
  onHome?: () => void;
  onOrders?: () => void;
};

export default function HomeScreen({
  onBack,
  onViewMenu,
  onBookNow,
  onProfile,
  onHome,
  onOrders,
}: HomeScreenProps) {
  const heroOpacity = useRef(new Animated.Value(0)).current;
  const heroTranslate = useRef(new Animated.Value(12)).current;
  const cardsOpacity = useRef(new Animated.Value(0)).current;
  const cardsTranslate = useRef(new Animated.Value(12)).current;
  const activeKey = 'home';


  useEffect(() => {
    Animated.stagger(140, [
      Animated.parallel([
        Animated.timing(heroOpacity, {
          toValue: 1,
          duration: 420,
          useNativeDriver: true,
        }),
        Animated.timing(heroTranslate, {
          toValue: 0,
          duration: 420,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(cardsOpacity, {
          toValue: 1,
          duration: 420,
          useNativeDriver: true,
        }),
        Animated.timing(cardsTranslate, {
          toValue: 0,
          duration: 420,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [cardsOpacity, cardsTranslate, heroOpacity, heroTranslate]);

  return (
    <View style={styles.screen}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View
            style={[
              styles.hero,
              {
                opacity: heroOpacity,
                transform: [{ translateY: heroTranslate }],
              },
            ]}
          >
            <TopHeader subtitle="Home Page" />
            <View style={styles.heroCallout}>
              <Text style={styles.heroEyebrow}>FILL AT HOME</Text>
              <Text style={styles.heroHeadline}>
                We prepare food for everyone, everyday. 
              </Text>
              <Text style={styles.heroCopy}>
                Crafting unforgettable flavors for life’s most meaningful moments.
              </Text>
              <View style={styles.heroActions}>
                <Pressable
                  style={[styles.heroButton, styles.heroButtonPrimary]}
                  onPress={() => onBookNow?.()}
                >
                  <Text style={styles.heroButtonPrimaryText}>Book a catering</Text>
                </Pressable>
                <Pressable
                  style={[styles.heroButton, styles.heroButtonGhost]}
                  onPress={() => onViewMenu?.()}
                >
                  <Text style={styles.heroButtonGhostText}>Browse menu</Text>
                </Pressable>
              </View>
            </View>
          </Animated.View>
          <Animated.View
            style={[
              styles.sectionWrap,
              {
                opacity: cardsOpacity,
                transform: [{ translateY: cardsTranslate }],
              },
            ]}
          >
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Featured trays</Text>
              <Text style={styles.sectionSubtitle}>
                Signature options for events and gatherings.
              </Text>
            </View>
            <View style={styles.cardGrid}>
              {FEATURED_ITEMS.map((item) => (
                <View key={item.title} style={styles.featureCard}>
                  <Image
                    source={item.image}
                    style={styles.featureImage}
                    resizeMode="cover"
                  />
                  <View style={styles.featureFooter}>
                    <Text style={styles.featureTitle} numberOfLines={1}>
                      {item.title}
                    </Text>
                    <Text style={styles.featureTag}>{item.tag}</Text>
                  </View>
                </View>
              ))}
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
              onViewMenu?.();
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
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 140,
    paddingTop: 18,
    gap: 16,
  },
  hero: {
    width: '100%',
    alignItems: 'stretch',
  },
  title: {
    fontFamily: 'LeagueSpartan_700Bold',
    fontSize: 26,
    color: COLORS.ink,
    marginTop: 14,
    textAlign: 'left',
  },
  subtitle: {
    fontFamily: 'LeagueSpartan_400Regular',
    fontSize: 13,
    lineHeight: 18,
    color: COLORS.softInk,
    textAlign: 'left',
    marginTop: 6,
  },
  heroCallout: {
    marginTop: 18,
    borderRadius: 20,
    padding: 18,
    backgroundColor: COLORS.cream,
    borderWidth: 1,
    borderColor: 'rgba(244, 162, 58, 0.25)',
  },
  heroEyebrow: {
    fontFamily: 'LeagueSpartan_700Bold',
    fontSize: 10,
    letterSpacing: 1.6,
    color: COLORS.softInk,
    opacity: 0.7,
  },
  heroHeadline: {
    fontFamily: 'LeagueSpartan_700Bold',
    fontSize: 22,
    color: COLORS.ink,
    marginTop: 10,
  },
  heroCopy: {
    fontFamily: 'LeagueSpartan_400Regular',
    fontSize: 13,
    lineHeight: 18,
    color: COLORS.softInk,
    marginTop: 8,
  },
  heroActions: {
    marginTop: 14,
    gap: 10,
  },
  heroButton: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
  },
  heroButtonPrimary: {
    backgroundColor: COLORS.ink,
  },
  heroButtonPrimaryText: {
    fontFamily: 'LeagueSpartan_700Bold',
    fontSize: 14,
    color: '#FFFFFF',
  },
  heroButtonGhost: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(21, 21, 21, 0.15)',
  },
  heroButtonGhostText: {
    fontFamily: 'LeagueSpartan_500Medium',
    fontSize: 14,
    color: COLORS.ink,
  },
  sectionWrap: {
    width: '100%',
    gap: 16,
  },
  sectionHeader: {
    gap: 4,
  },
  sectionTitle: {
    fontFamily: 'LeagueSpartan_700Bold',
    fontSize: 18,
    color: COLORS.ink,
  },
  sectionSubtitle: {
    fontFamily: 'LeagueSpartan_400Regular',
    fontSize: 12,
    color: COLORS.softInk,
  },
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  featureCard: {
    width: '48%',
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(21, 21, 21, 0.08)',
    shadowColor: COLORS.shadow,
    shadowOpacity: 1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  featureImage: {
    width: '100%',
    height: 120,
  },
  featureFooter: {
    padding: 10,
    gap: 4,
  },
  featureTitle: {
    fontFamily: 'LeagueSpartan_500Medium',
    fontSize: 13,
    color: COLORS.ink,
  },
  featureTag: {
    fontFamily: 'LeagueSpartan_400Regular',
    fontSize: 11,
    color: COLORS.softInk,
  },
});
