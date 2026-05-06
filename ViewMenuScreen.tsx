import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';

const COLORS = {
  backgroundTop: '#F7F2EC',
  backgroundBottom: '#FFFCF8',
  surface: '#FFFFFF',
  ink: '#1B1A18',
  muted: '#6F665E',
  accent: '#C86A3A',
  accentSoft: '#F7E8DC',
  border: 'rgba(27, 26, 24, 0.08)',
  line: 'rgba(27, 26, 24, 0.06)',
  shadow: 'rgba(0, 0, 0, 0.04)',
};

const CELEBRATION_ITEMS = [
  {
    name: 'Celebration Banquet Table',
    image: require('./assets/Menu/Celebration.jpg'),
    tags: ['Celebration Package'],
  },
  {
    name: 'Celebration Glassware Table',
    image: require('./assets/Menu/Celebration 2.jpg'),
    tags: ['Celebration Package'],
  },
  {
    name: 'Celebration Garden Table',
    image: require('./assets/Menu/Celebration 3.jpg'),
    tags: ['Celebration Package'],
  },
  {
    name: 'Celebration Floral Table',
    image: require('./assets/Menu/Celebration 4.jpg'),
    tags: ['Celebration Package'],
  },
];

const FOOD_ITEMS = [
  {
    name: 'BBQ Pork Skewers',
    image: require('./assets/Menu/Food 1.jpg'),
    tags: ['Pork'],
  },
  {
    name: 'Chicken Veggie Stir-Fry',
    image: require('./assets/Menu/Food 2.jpg'),
    tags: ['Poultry'],
  },
  {
    name: 'Beef Caldereta',
    image: require('./assets/Menu/Food 3.jpg'),
    tags: ['Beef'],
  },
  {
    name: 'Mushroom Medley',
    image: require('./assets/Menu/Food 4.jpg'),
    tags: ['Breads & Sides'],
  },
  {
    name: 'Crispy Pork Belly',
    image: require('./assets/Menu/Food 5.jpg'),
    tags: ['Pork'],
  },
  {
    name: 'Grilled Chicken Station',
    image: require('./assets/Menu/Food 6.jpg'),
    tags: ['Poultry'],
  },
  {
    name: 'Shrimp Pancit',
    image: require('./assets/Menu/Food 7.jpg'),
    tags: ['Fish/Seafood'],
  },
  {
    name: 'Crispy Shrimp Cups',
    image: require('./assets/Menu/Food 8.jpg'),
    tags: ['Fish/Seafood'],
  },
  {
    name: 'Halo-Halo Bar',
    image: require('./assets/Menu/Food 9.jpg'),
    tags: ['Desserts'],
  },
  {
    name: 'Lemon Herb Roasted Fish',
    image: require('./assets/Menu/Food 10.jpg'),
    tags: ['Fish/Seafood'],
  },
  {
    name: 'Lechon Belly Roast',
    image: require('./assets/Menu/Food 11.jpg'),
    tags: ['Pork'],
  },
  {
    name: 'Garlic Butter Pasta',
    image: require('./assets/Menu/Food 12.jpg'),
    tags: ['Breads & Sides'],
  },
  {
    name: 'Crispy Chicken Cutlets',
    image: require('./assets/Menu/Food 13.jpg'),
    tags: ['Poultry'],
  },
  {
    name: 'Beef Meatballs in Mushroom Gravy',
    image: require('./assets/Menu/Food 14.jpg'),
    tags: ['Beef'],
  },
  {
    name: 'Chocolate Mousse Cups',
    image: require('./assets/Menu/Food 15.jpg'),
    tags: ['Desserts'],
  },
  {
    name: 'Crispy Spring Rolls',
    image: require('./assets/Menu/Food 16.jpg'),
    tags: ['Breads & Sides'],
  },
];

const MENU_ITEMS = [...CELEBRATION_ITEMS, ...FOOD_ITEMS];

const FILTERS = [
  'All',
  'Pork',
  'Poultry',
  'Fish/Seafood',
  'Desserts',
  'Breads & Sides',
];

type ViewMenuScreenProps = {
  onBack: () => void;
  onBookNow?: () => void;
};

export default function ViewMenuScreen({ onBack, onBookNow }: ViewMenuScreenProps) {
  const [activeFilter, setActiveFilter] = useState(FILTERS[0]);
  const [selectedItem, setSelectedItem] = useState<
    (typeof MENU_ITEMS)[number] | null
  >(null);
  const [cateringOpen, setCateringOpen] = useState(false);
  const visibleItems =
    activeFilter === 'All'
      ? FOOD_ITEMS
      : FOOD_ITEMS.filter((item) => item.tags.includes(activeFilter));

  const handleOpenModal = (item: (typeof MENU_ITEMS)[number]) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  return (
    <LinearGradient
      colors={[COLORS.backgroundTop, COLORS.backgroundBottom]}
      start={{ x: 0.1, y: 0 }}
      end={{ x: 0.9, y: 1 }}
      style={styles.screen}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={onBack} hitSlop={12}>
            <Text style={styles.backButtonText}>Back</Text>
          </Pressable>
          <Text style={styles.headerTitle}>Menu</Text>
          <View style={styles.headerSpacer} />
        </View>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.introCard}>
            <Image
              source={require('./assets/Menu logo.png')}
              style={styles.introLogo}
              resizeMode="contain"
              accessibilityLabel="Fill at Home"
            />
          </View>
          <View style={styles.filterHeader}>
            <Text style={styles.filterLabel}>Filters</Text>
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
                  style={[
                    styles.filterChip,
                    isActive && styles.filterChipActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.filterText,
                      isActive && styles.filterTextActive,
                    ]}
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
                onPress={() => handleOpenModal(item)}
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
                </View>
              </Pressable>
            ))}
          </View>
        </ScrollView>
        <Pressable
          style={styles.floatingCateringButton}
          onPress={() => setCateringOpen(true)}
        >
          <Text style={styles.floatingCateringButtonText}>Catering</Text>
        </Pressable>
        <Modal
          visible={!!selectedItem}
          transparent
          animationType="fade"
          statusBarTranslucent
          onRequestClose={handleCloseModal}
        >
          <View style={styles.modalBackdrop}>
            <Pressable style={styles.modalScrim} onPress={handleCloseModal} />
            {selectedItem ? (
              <View style={styles.modalCard}>
                <Image
                  source={selectedItem.image}
                  style={styles.modalImage}
                  resizeMode="cover"
                  accessibilityLabel={selectedItem.name}
                />
                <Text style={styles.modalTitle}>{selectedItem.name}</Text>
                <Pressable style={styles.modalClose} onPress={handleCloseModal}>
                  <Text style={styles.modalCloseText}>Close</Text>
                </Pressable>
              </View>
            ) : null}
          </View>
        </Modal>
        <Modal
          visible={cateringOpen}
          transparent
          animationType="fade"
          statusBarTranslucent
          onRequestClose={() => setCateringOpen(false)}
        >
          <View style={styles.modalBackdrop}>
            <Pressable
              style={styles.modalScrim}
              onPress={() => setCateringOpen(false)}
            />
            <View style={styles.cateringModalCard}>
              <Text style={styles.cateringModalTitle}>Catering</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.cateringGallery}
              >
                {CELEBRATION_ITEMS.map((item) => (
                  <View key={item.name} style={styles.cateringTile}>
                    <Image
                      source={item.image}
                      style={styles.cateringTileImage}
                      resizeMode="cover"
                      accessibilityLabel={item.name}
                    />
                    <Text style={styles.cateringTileText} numberOfLines={2}>
                      {item.name}
                    </Text>
                  </View>
                ))}
              </ScrollView>
              <Pressable
                style={styles.modalClose}
                onPress={() => setCateringOpen(false)}
              >
                <Text style={styles.modalCloseText}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  backButtonText: {
    fontFamily: 'LeagueSpartan_600SemiBold',
    fontSize: 14,
    color: COLORS.ink,
  },
  headerTitle: {
    fontFamily: 'LeagueSpartan_700Bold',
    fontSize: 15,
    color: COLORS.ink,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  headerSpacer: {
    width: 58,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 32,
    gap: 20,
  },
  introCard: {
    borderRadius: 24,
    padding: 22,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: COLORS.shadow,
    shadowOpacity: 1,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  introLogo: {
    width: 200,
    height: 150,
  },
  filterHeader: {
    paddingLeft: 4,
  },
  filterLabel: {
    fontFamily: 'LeagueSpartan_600SemiBold',
    fontSize: 12,
    letterSpacing: 1.4,
    color: COLORS.muted,
    textTransform: 'uppercase',
  },
  filterScroll: {
    marginTop: -10,
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
  },
  menuTitle: {
    fontFamily: 'LeagueSpartan_600SemiBold',
    fontSize: 13,
    color: COLORS.ink,
    lineHeight: 16,
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
    maxHeight: 360,
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
    height: 220,
    borderRadius: 16,
    backgroundColor: COLORS.accentSoft,
  },
  modalTitle: {
    fontFamily: 'LeagueSpartan_600SemiBold',
    fontSize: 16,
    color: COLORS.ink,
    marginTop: 12,
    textAlign: 'center',
  },
  modalClose: {
    marginTop: 12,
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
    fontSize: 13,
    color: COLORS.ink,
  },
  floatingCateringButton: {
    position: 'absolute',
    right: 20,
    bottom: 28,
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 999,
    backgroundColor: COLORS.accent,
    shadowColor: COLORS.shadow,
    shadowOpacity: 1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  floatingCateringButtonText: {
    fontFamily: 'LeagueSpartan_700Bold',
    fontSize: 13,
    color: COLORS.surface,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  cateringModalCard: {
    width: '92%',
    maxWidth: 440,
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
  cateringModalTitle: {
    fontFamily: 'LeagueSpartan_700Bold',
    fontSize: 18,
    color: COLORS.ink,
    textAlign: 'center',
    marginBottom: 12,
  },
  cateringGallery: {
    gap: 12,
    paddingBottom: 8,
  },
  cateringTile: {
    width: 220,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cateringTileImage: {
    width: '100%',
    height: 150,
  },
  cateringTileText: {
    padding: 10,
    fontFamily: 'LeagueSpartan_600SemiBold',
    fontSize: 12,
    color: COLORS.ink,
  },
});