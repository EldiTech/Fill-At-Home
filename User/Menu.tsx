import {
  Animated,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useRef, useState } from 'react';
import { COLORS } from './constants';
import BottomNavBar from './components/BottomNavBar';
import TopHeader from './components/TopHeader';

const FILTERS = [
  'All',
  'Beef',
  'Pork',
  'Poultry',
  'Seafood',
  'Desserts',
  'Sides',
];

type MenuItem = {
  name: string;
  image: number;
  category: string;
  tags: string[];
  note: string;
};

const MENU_ITEMS: MenuItem[] = [
  {
    name: 'Celebration Banquet Table',
    image: require('../assets/Menu/Celebration.jpg'),
    category: 'Celebration',
    tags: ['Package', 'Premium'],
    note: 'Full table styling with warm service.',
  },
  {
    name: 'BBQ Pork Skewers',
    image: require('../assets/Menu/Food 1.jpg'),
    category: 'Pork',
    tags: ['Smoky', 'Grilled'],
    note: 'Sweet smoke glaze with citrus finish.',
  },
  {
    name: 'Chicken Veggie Stir-Fry',
    image: require('../assets/Menu/Food 2.jpg'),
    category: 'Poultry',
    tags: ['Balanced', 'Fresh'],
    note: 'Seasonal greens with garlic soy.',
  },
  {
    name: 'Beef Caldereta',
    image: require('../assets/Menu/Food 3.jpg'),
    category: 'Beef',
    tags: ['Rich', 'Slow-braised'],
    note: 'Classic stew with tender beef cuts.',
  },
  {
    name: 'Crispy Pork Belly',
    image: require('../assets/Menu/Food 5.jpg'),
    category: 'Pork',
    tags: ['Crispy', 'Signature'],
    note: 'Golden skin with herb seasoning.',
  },
  {
    name: 'Lemon Herb Roasted Fish',
    image: require('../assets/Menu/Food 10.jpg'),
    category: 'Seafood',
    tags: ['Light', 'Citrus'],
    note: 'Flaky fish finished with fresh herbs.',
  },
  {
    name: 'Halo-Halo Bar',
    image: require('../assets/Menu/Food 9.jpg'),
    category: 'Desserts',
    tags: ['Interactive', 'Dessert'],
    note: 'Build-your-own dessert station.',
  },
  {
    name: 'Garlic Butter Pasta',
    image: require('../assets/Menu/Food 12.jpg'),
    category: 'Sides',
    tags: ['Comfort', 'Crowd'],
    note: 'Silky butter sauce with herbs.',
  },
];

type MenuScreenProps = {
  onHome?: () => void;
  onMenu?: () => void;
  onOrders?: () => void;
  onProfile?: () => void;
};

export default function MenuScreen({
  onHome,
  onMenu,
  onOrders,
  onProfile,
}: MenuScreenProps) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const activeKey = 'menu';
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

  const visibleItems = MENU_ITEMS.filter(
    (item) => activeFilter === 'All' || item.category === activeFilter
  );

  return (
    <View style={styles.screen}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}
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
            <TopHeader subtitle="Menu" />
            <View style={styles.header}>
              <View style={styles.headerText}>
                <Text style={styles.title}>Browse</Text>
                <Text style={styles.subtitle}>
                  Curated trays, packages, and event favorites.
                </Text>
              </View>
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
          <View style={styles.filterHeader}>
            <Text style={styles.filterLabel}>Categories</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.filterScroll}
            contentContainerStyle={styles.filterRow}
          >
            {FILTERS.map((filter) => {
              const isActive = filter === activeFilter;
              return (
                <Pressable
                  key={filter}
                  onPress={() => setActiveFilter(filter)}
                  style={[styles.filterChip, isActive && styles.filterChipActive]}
                >
                  <Text
                    style={[styles.filterText, isActive && styles.filterTextActive]}
                    numberOfLines={1}
                  >
                    {filter}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
          <View style={styles.grid}>
            {visibleItems.map((item) => (
              <Pressable
                key={item.name}
                style={styles.menuCard}
                onPress={() => setSelectedItem(item)}
              >
                <Image
                  source={item.image}
                  style={styles.menuImage}
                  resizeMode="cover"
                />
                <View style={styles.menuCardFooter}>
                  <Text style={styles.menuTitle} numberOfLines={2}>
                    {item.name}
                  </Text>
                  <View style={styles.tagRow}>
                    {item.tags.map((tag) => (
                      <Text key={tag} style={styles.tagText}>
                        {tag}
                      </Text>
                    ))}
                  </View>
                </View>
              </Pressable>
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
        <Modal
          visible={!!selectedItem}
          transparent
          animationType="fade"
          onRequestClose={() => setSelectedItem(null)}
        >
          <View style={styles.modalBackdrop}>
            <Pressable
              style={styles.modalScrim}
              onPress={() => setSelectedItem(null)}
            />
            {selectedItem ? (
              <View style={styles.modalCard}>
                <Image
                  source={selectedItem.image}
                  style={styles.modalImage}
                  resizeMode="cover"
                />
                <Text style={styles.modalTitle}>{selectedItem.name}</Text>
                <Text style={styles.modalNote}>{selectedItem.note}</Text>
                <View style={styles.modalTags}>
                  {selectedItem.tags.map((tag) => (
                    <Text key={tag} style={styles.modalTagText}>
                      {tag}
                    </Text>
                  ))}
                </View>
                <Pressable style={styles.modalPrimary}>
                  <Text style={styles.modalPrimaryText}>Add to order</Text>
                </Pressable>
                <Pressable
                  style={styles.modalClose}
                  onPress={() => setSelectedItem(null)}
                >
                  <Text style={styles.modalCloseText}>Close</Text>
                </Pressable>
              </View>
            ) : null}
          </View>
        </Modal>
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
    gap: 16,
  },
  headerWrap: {
    width: '100%',
  },
  contentWrap: {
    width: '100%',
    gap: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
  },
  headerText: {
    flex: 1,
    gap: 6,
  },
  title: {
    fontFamily: 'LeagueSpartan_700Bold',
    fontSize: 24,
    color: COLORS.ink,
  },
  subtitle: {
    fontFamily: 'LeagueSpartan_400Regular',
    fontSize: 12,
    color: COLORS.muted,
  },
  filterHeader: {
    paddingLeft: 2,
  },
  filterLabel: {
    fontFamily: 'LeagueSpartan_600SemiBold',
    fontSize: 11,
    letterSpacing: 1.4,
    color: COLORS.muted,
    textTransform: 'uppercase',
  },
  filterScroll: {
    marginTop: -8,
  },
  filterRow: {
    paddingVertical: 6,
    paddingRight: 6,
    gap: 10,
  },
  filterChip: {
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 14,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  filterChipActive: {
    backgroundColor: COLORS.ink,
    borderColor: COLORS.ink,
  },
  filterText: {
    fontFamily: 'LeagueSpartan_600SemiBold',
    fontSize: 12,
    color: COLORS.ink,
  },
  filterTextActive: {
    color: COLORS.surface,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  menuCard: {
    width: '48%',
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: COLORS.shadow,
    shadowOpacity: 1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
    marginBottom: 16,
  },
  menuImage: {
    width: '100%',
    height: 130,
  },
  menuCardFooter: {
    padding: 10,
    gap: 6,
  },
  menuTitle: {
    fontFamily: 'LeagueSpartan_600SemiBold',
    fontSize: 13,
    color: COLORS.ink,
    lineHeight: 16,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tagText: {
    fontFamily: 'LeagueSpartan_500Medium',
    fontSize: 10,
    color: COLORS.muted,
    textTransform: 'uppercase',
  },
  modalBackdrop: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalScrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(10, 10, 10, 0.6)',
  },
  modalCard: {
    width: '90%',
    maxWidth: 420,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: COLORS.shadow,
    shadowOpacity: 1,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
  },
  modalImage: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    backgroundColor: COLORS.accentSoft,
  },
  modalTitle: {
    fontFamily: 'LeagueSpartan_600SemiBold',
    fontSize: 16,
    color: COLORS.ink,
    marginTop: 12,
  },
  modalNote: {
    fontFamily: 'LeagueSpartan_400Regular',
    fontSize: 12,
    color: COLORS.muted,
    marginTop: 6,
  },
  modalTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 10,
  },
  modalTagText: {
    fontFamily: 'LeagueSpartan_500Medium',
    fontSize: 10,
    color: COLORS.muted,
    textTransform: 'uppercase',
  },
  modalPrimary: {
    marginTop: 12,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: COLORS.ink,
    alignItems: 'center',
  },
  modalPrimaryText: {
    fontFamily: 'LeagueSpartan_700Bold',
    fontSize: 13,
    color: COLORS.surface,
  },
  modalClose: {
    marginTop: 8,
    alignSelf: 'center',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  modalCloseText: {
    fontFamily: 'LeagueSpartan_600SemiBold',
    fontSize: 12,
    color: COLORS.ink,
  },
});
