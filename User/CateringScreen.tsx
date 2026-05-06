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

const CELEBRATION_ITEMS = [
  {
    name: 'Celebration Banquet Table',
    image: require('../assets/Menu/Celebration.jpg'),
    tags: ['Package', 'Premium'],
    note: 'Full table styling with warm service.',
  },
  {
    name: 'Celebration Glassware Table',
    image: require('../assets/Menu/Celebration 2.jpg'),
    tags: ['Package', 'Premium'],
    note: 'Elegant glassware with complete setup.',
  },
  {
    name: 'Celebration Garden Table',
    image: require('../assets/Menu/Celebration 3.jpg'),
    tags: ['Package', 'Premium'],
    note: 'Garden-inspired decor for outdoor events.',
  },
  {
    name: 'Celebration Floral Table',
    image: require('../assets/Menu/Celebration 4.jpg'),
    tags: ['Package', 'Premium'],
    note: 'Floral arrangements with premium styling.',
  },
];

type CateringScreenProps = {
  onBack?: () => void;
  onHome?: () => void;
  onMenu?: () => void;
  onOrders?: () => void;
  onProfile?: () => void;
};

export default function CateringScreen({
  onBack,
  onHome,
  onMenu,
  onOrders,
  onProfile,
}: CateringScreenProps) {
  const [selectedItem, setSelectedItem] = useState<
    (typeof CELEBRATION_ITEMS)[number] | null
  >(null);
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

  const handleOpenModal = (item: (typeof CELEBRATION_ITEMS)[number]) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  return (
    <View style={styles.screen}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
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
            <TopHeader subtitle="Catering" />
            <View style={styles.header}>
              <Pressable onPress={() => onBack?.()}>
                <Text style={styles.backButton}>← Back</Text>
              </Pressable>
              <Text style={styles.title}>Packages</Text>
            </View>
            <View style={styles.introCard}>
              <Text style={styles.introTitle}>Celebration Packages</Text>
              <Text style={styles.introSubtitle}>
                Premium catering options for your special events
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
          <View style={styles.grid}>
            {CELEBRATION_ITEMS.map((item) => (
              <Pressable
                key={item.name}
                style={styles.cateringCard}
                onPress={() => handleOpenModal(item)}
              >
                <Image
                  source={item.image}
                  style={styles.cateringImage}
                  resizeMode="cover"
                />
                <View style={styles.cateringCardFooter}>
                  <Text style={styles.cateringTitle} numberOfLines={2}>
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
                <Text style={styles.modalNote}>{selectedItem.note}</Text>
                <View style={styles.modalTags}>
                  {selectedItem.tags.map((tag) => (
                    <Text key={tag} style={styles.modalTagText}>
                      {tag}
                    </Text>
                  ))}
                </View>
                <Pressable style={styles.modalPrimary}>
                  <Text style={styles.modalPrimaryText}>Inquire Now</Text>
                </Pressable>
                <Pressable style={styles.modalClose} onPress={handleCloseModal}>
                  <Text style={styles.modalCloseText}>Close</Text>
                </Pressable>
              </View>
            ) : null}
          </View>
        </Modal>
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
  scrollContent: {
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
    marginBottom: 16,
  },
  backButton: {
    fontFamily: 'LeagueSpartan_500Medium',
    fontSize: 12,
    color: COLORS.ink,
    marginBottom: 8,
  },
  title: {
    fontFamily: 'LeagueSpartan_700Bold',
    fontSize: 24,
    color: COLORS.ink,
  },
  introCard: {
    borderRadius: 20,
    padding: 18,
    backgroundColor: COLORS.accentSoft,
    borderWidth: 1,
    borderColor: 'rgba(200, 106, 58, 0.25)',
  },
  introTitle: {
    fontFamily: 'LeagueSpartan_700Bold',
    fontSize: 18,
    color: COLORS.ink,
  },
  introSubtitle: {
    fontFamily: 'LeagueSpartan_400Regular',
    fontSize: 12,
    color: COLORS.muted,
    marginTop: 6,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  cateringCard: {
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
  cateringImage: {
    width: '100%',
    height: 130,
  },
  cateringCardFooter: {
    padding: 10,
    gap: 6,
  },
  cateringTitle: {
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
