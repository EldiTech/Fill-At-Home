import { Animated, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useRef, useState } from 'react';
import Svg, { Path } from 'react-native-svg';
import { COLORS } from './constants';
import BottomNavBar from './components/BottomNavBar';
import TopHeader from './components/TopHeader';

const SETTINGS_ICON_PATHS = {
  personal:
    'M440-280h80v-240h-80v240Zm68.5-331.5Q520-623 520-640t-11.5-28.5Q497-680 480-680t-28.5 11.5Q440-657 440-640t11.5 28.5Q463-600 480-600t28.5-11.5ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z',
  delivery:
    'M195-195q-35-35-35-85H60l18-80h113q17-19 40-29.5t49-10.5q26 0 49 10.5t40 29.5h167l84-360H262l17-80h441l-37 160h117l120 160-40 200h-80q0 50-35 85t-85 35q-50 0-85-35t-35-85H400q0 50-35 85t-85 35q-50 0-85-35Zm442-245h193l4-21-74-99h-95l-28 120Zm-17-280-84 360 2-7 82-353ZM140-440v-120H40l140-200v120h100L140-440Zm140 200q17 0 28.5-11.5T320-280q0-17-11.5-28.5T280-320q-17 0-28.5 11.5T240-280q0 17 11.5 28.5T280-240Zm400 0q17 0 28.5-11.5T720-280q0-17-11.5-28.5T680-320q-17 0-28.5 11.5T640-280q0 17 11.5 28.5T680-240Z',
  payment:
    'M560-440q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35ZM280-320q-33 0-56.5-23.5T200-400v-320q0-33 23.5-56.5T280-800h560q33 0 56.5 23.5T920-720v320q0 33-23.5 56.5T840-320H280Zm80-80h400q0-33 23.5-56.5T840-480v-160q-33 0-56.5-23.5T760-720H360q0 33-23.5 56.5T280-640v160q33 0 56.5 23.5T360-400Zm440 240H120q-33 0-56.5-23.5T40-240v-440h80v440h680v80ZM280-400v-320 320Z',
  chatbot:
    'M360-400h80v-200h-80v200Zm-160-60q-46-23-73-66.5T100-621q0-75 51.5-127T278-800q12 0 24.5 2t24.5 5q25-41 65-64t88-23q48 0 88 23t65 64q12-3 24-5t25-2q75 0 126.5 52T860-621q0 51-27 94.5T760-460v220H200v-220Zm320 60h80v-200h-80v200Zm-240 80h400v-189l44-22q26-13 41-36.5t15-52.5q0-42-28.5-71T682-720q-11 0-20 2t-19 5l-47 13-31-52q-14-23-36.5-35.5T480-800q-26 0-48.5 12.5T395-752l-31 52-48-13q-10-2-19.5-4.5T277-720q-41 0-69 29t-28 71q0 29 15 52.5t41 36.5l44 22v189Zm-80 80h80v80h400v-80h80v160H200v-160Zm280-80Z',
  terms:
    'M480-80q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 85-29 163.5T688-214L560-342q-18 11-38.5 16.5T480-320q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 22-5.5 42.5T618-398l60 60q20-41 31-86t11-92v-189l-240-90-240 90v189q0 121 68 220t172 132q26-8 49.5-20.5T576-214l56 56q-33 27-71.5 47T480-80Zm56.5-343.5Q560-447 560-480t-23.5-56.5Q513-560 480-560t-56.5 23.5Q400-513 400-480t23.5 56.5Q447-400 480-400t56.5-23.5ZM488-477Z',
};

const ACCOUNT_ITEMS = [
  {
    title: 'Personal info',
    subtitle: 'Name, email, phone',
    key: 'personal',
  },
  {
    title: 'Delivery addresses',
    subtitle: 'Saved locations',
    key: 'delivery',
  },
  {
    title: 'Payment methods',
    subtitle: 'Cards and billing',
    key: 'payment',
  },
];

const SUPPORT_ITEMS = [
  {
    title: 'ChefBot',
    subtitle: 'AI catering assistant',
    key: 'chatbot',
  },
  {
    title: 'Terms and privacy',
    subtitle: 'Policies and agreements',
    key: 'terms',
  },
];

type SettingsScreenProps = {
  onHome?: () => void;
  onMenu?: () => void;
  onOrders?: () => void;
  onProfile?: () => void;
  onSignOut?: () => void;
  onPersonalInfo?: () => void;
  onDeliveryAddress?: () => void;
  onPaymentMethods?: () => void;
  onChefBot?: () => void;
};

export default function SettingsScreen({
  onHome,
  onMenu,
  onOrders,
  onProfile,
  onSignOut,
  onPersonalInfo,
  onDeliveryAddress,
  onPaymentMethods,
  onChefBot,
}: SettingsScreenProps) {
  const [showTerms, setShowTerms] = useState(false);
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
            <TopHeader subtitle="Settings" />
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Settings</Text>
              <Text style={styles.headerSubtitle}>
                Manage your account and preferences.
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

          <View style={styles.profileCard}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>GA</Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Guest account</Text>
              <Text style={styles.profileMeta}>Add your contact details</Text>
            </View>
            <Pressable style={styles.editButton}>
              <Text style={styles.editButtonText}>Edit</Text>
            </Pressable>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Account</Text>
            {ACCOUNT_ITEMS.map((item) => (
              <Pressable
                key={item.title}
                style={styles.settingRow}
                onPress={() => {
                  if (item.key === 'personal') {
                    onPersonalInfo?.();
                  }
                  if (item.key === 'delivery') {
                    onDeliveryAddress?.();
                  }
                  if (item.key === 'payment') {
                    onPaymentMethods?.();
                  }
                }}
              >
                <View style={styles.settingIconWrap}>
                  <Svg width={18} height={18} viewBox="0 -960 960 960">
                    <Path
                      d={
                        SETTINGS_ICON_PATHS[
                          item.key as keyof typeof SETTINGS_ICON_PATHS
                        ]
                      }
                      fill={COLORS.ink}
                    />
                  </Svg>
                </View>
                <View style={styles.settingText}>
                  <Text style={styles.settingTitle}>{item.title}</Text>
                  <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
                </View>
                <Text style={styles.settingChevron}>{'>'}</Text>
              </Pressable>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Support</Text>
            {SUPPORT_ITEMS.map((item) => (
              <Pressable
                key={item.title}
                style={styles.settingRow}
                onPress={() => {
                  if (item.key === 'terms') {
                    setShowTerms(true);
                  }
                  if (item.key === 'chatbot') {
                    onChefBot?.();
                  }
                }}
              >
                <View style={styles.settingIconWrap}>
                  <Svg width={18} height={18} viewBox="0 -960 960 960">
                    <Path
                      d={
                        SETTINGS_ICON_PATHS[
                          item.key as keyof typeof SETTINGS_ICON_PATHS
                        ]
                      }
                      fill={COLORS.ink}
                    />
                  </Svg>
                </View>
                <View style={styles.settingText}>
                  <Text style={styles.settingTitle}>{item.title}</Text>
                  <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
                </View>
                <Text style={styles.settingChevron}>{'>'}</Text>
              </Pressable>
            ))}
          </View>

          <Pressable style={styles.signOutButton} onPress={onSignOut}>
            <Text style={styles.signOutText}>Sign out</Text>
          </Pressable>
          <Text style={styles.versionText}>App version 1.0.0</Text>
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
          visible={showTerms}
          transparent
          animationType="fade"
          onRequestClose={() => setShowTerms(false)}
        >
          <View style={styles.modalBackdrop}>
            <Pressable
              style={styles.modalScrim}
              onPress={() => setShowTerms(false)}
            />
            <View style={styles.modalCard}>
              <Text style={styles.modalTitle}>Terms and privacy</Text>
              <ScrollView
                style={styles.modalBody}
                showsVerticalScrollIndicator={false}
              >
                <Text style={styles.modalText}>
                  By using Fill At Home you agree to our service terms, privacy
                  practices, and order policies. We collect contact details,
                  delivery preferences, and order history to personalize your
                  catering experience.
                </Text>
                <Text style={styles.modalText}>
                  We never sell personal data. You can request updates or
                  deletions by contacting support. Delivery times are estimates
                  based on location, event size, and menu complexity.
                </Text>
              </ScrollView>
              <Pressable
                style={styles.modalCloseButton}
                onPress={() => setShowTerms(false)}
              >
                <Text style={styles.modalCloseText}>Close</Text>
              </Pressable>
            </View>
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
    paddingTop: 18,
    paddingBottom: 140,
    gap: 18,
  },
  headerWrap: {
    width: '100%',
  },
  contentWrap: {
    width: '100%',
    gap: 16,
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
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: COLORS.shadow,
    shadowOpacity: 1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(244, 162, 58, 0.18)',
  },
  avatarText: {
    fontFamily: 'LeagueSpartan_700Bold',
    fontSize: 14,
    color: COLORS.orange,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontFamily: 'LeagueSpartan_700Bold',
    fontSize: 16,
    color: COLORS.ink,
  },
  profileMeta: {
    fontFamily: 'LeagueSpartan_400Regular',
    fontSize: 12,
    color: COLORS.softInk,
    marginTop: 2,
  },
  editButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: '#FFFFFF',
  },
  editButtonText: {
    fontFamily: 'LeagueSpartan_500Medium',
    fontSize: 12,
    color: COLORS.ink,
  },
  section: {
    gap: 10,
  },
  sectionTitle: {
    fontFamily: 'LeagueSpartan_700Bold',
    fontSize: 16,
    color: COLORS.ink,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  settingIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    backgroundColor: 'rgba(21, 21, 21, 0.04)',
  },
  settingText: {
    flex: 1,
    paddingRight: 12,
  },
  settingTitle: {
    fontFamily: 'LeagueSpartan_600SemiBold',
    fontSize: 14,
    color: COLORS.ink,
  },
  settingSubtitle: {
    fontFamily: 'LeagueSpartan_400Regular',
    fontSize: 11,
    color: COLORS.softInk,
    marginTop: 4,
  },
  settingChevron: {
    fontFamily: 'LeagueSpartan_700Bold',
    fontSize: 16,
    color: COLORS.softInk,
  },
  signOutButton: {
    marginTop: 4,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: 'rgba(242, 75, 61, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(242, 75, 61, 0.35)',
  },
  signOutText: {
    fontFamily: 'LeagueSpartan_700Bold',
    fontSize: 14,
    color: COLORS.red,
  },
  versionText: {
    textAlign: 'center',
    fontFamily: 'LeagueSpartan_400Regular',
    fontSize: 11,
    color: COLORS.softInk,
  },
  modalBackdrop: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalScrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(10, 10, 10, 0.5)',
  },
  modalCard: {
    width: '90%',
    maxWidth: 420,
    borderRadius: 20,
    padding: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  modalTitle: {
    fontFamily: 'LeagueSpartan_700Bold',
    fontSize: 18,
    color: COLORS.ink,
  },
  modalBody: {
    marginTop: 10,
    maxHeight: 220,
  },
  modalText: {
    fontFamily: 'LeagueSpartan_400Regular',
    fontSize: 12,
    lineHeight: 18,
    color: COLORS.softInk,
    marginBottom: 10,
  },
  modalCloseButton: {
    marginTop: 6,
    alignSelf: 'center',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: '#FFFFFF',
  },
  modalCloseText: {
    fontFamily: 'LeagueSpartan_500Medium',
    fontSize: 12,
    color: COLORS.ink,
  },
});
