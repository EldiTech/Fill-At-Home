import { Animated, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { SvgXml } from 'react-native-svg';
import { useEffect, useRef } from 'react';

const COLORS = {
  orange: '#F4A23A',
  teal: '#2BB9A6',
  red: '#F24B3D',
  ink: '#151515',
  softInk: '#3E3A34',
  cream: '#FFF4EA',
  mint: '#E9FBF7',
  clay: '#F4D2BC',
  shadow: 'rgba(21, 21, 21, 0.12)',
  ivory: '#FBF6F0',
};

const LOGO = require('../assets/Fill at Home.png');

const ADMIN_ICON =
  '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1F8F83"><path d="M380.5-480.5Q340-521 340-580t40.5-99.5Q421-720 480-720t99.5 40.5Q620-639 620-580t-40.5 99.5Q539-440 480-440t-99.5-40.5ZM523-537q17-17 17-43t-17-43q-17-17-43-17t-43 17q-17 17-17 43t17 43q17 17 43 17t43-17ZM480-80q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Zm0-400Zm0-315-240 90v189q0 54 15 105t41 96q42-21 88-33t96-12q50 0 96 12t88 33q26-45 41-96t15-105v-189l-240-90Zm-70 523q-34 8-65 22 29 30 63 52t72 34q38-12 72-34t63-52q-31-14-65-22t-70-8q-36 0-70 8Z"/></svg>';
const USER_ICON =
  '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#C8741A"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm560-80v-560H200v560h560Zm-400-80h60v-160q26-7 43-28.5t17-48.5v-163h-40v151h-30v-151h-40v151h-30v-151h-40v163q0 27 17 48.5t43 28.5v160Zm240 0h60v-400q-50 0-85 35t-35 85v120h60v160Zm-400 80v-560 560Z"/></svg>';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type RoleSelectScreenProps = {
  onBack: () => void;
  onSelectRole?: (role: 'user' | 'admin') => void;
};

export default function RoleSelectScreen({
  onBack,
  onSelectRole,
}: RoleSelectScreenProps) {
  const fadeLogo = useRef(new Animated.Value(0)).current;
  const slideLogo = useRef(new Animated.Value(12)).current;
  const fadeHead = useRef(new Animated.Value(0)).current;
  const slideHead = useRef(new Animated.Value(12)).current;
  const fadeCards = useRef(new Animated.Value(0)).current;
  const slideCards = useRef(new Animated.Value(12)).current;
  const userScale = useRef(new Animated.Value(1)).current;
  const adminScale = useRef(new Animated.Value(1)).current;
  const backScale = useRef(new Animated.Value(1)).current;

  const handleSelect = (role: 'user' | 'admin') => {
    if (onSelectRole) {
      onSelectRole(role);
    }
  };

  useEffect(() => {
    Animated.stagger(120, [
      Animated.parallel([
        Animated.timing(fadeLogo, {
          toValue: 1,
          duration: 420,
          useNativeDriver: true,
        }),
        Animated.timing(slideLogo, {
          toValue: 0,
          duration: 420,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(fadeHead, {
          toValue: 1,
          duration: 420,
          useNativeDriver: true,
        }),
        Animated.timing(slideHead, {
          toValue: 0,
          duration: 420,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(fadeCards, {
          toValue: 1,
          duration: 460,
          useNativeDriver: true,
        }),
        Animated.timing(slideCards, {
          toValue: 0,
          duration: 460,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [fadeLogo, slideLogo, fadeHead, slideHead, fadeCards, slideCards]);

  return (
    <LinearGradient
      colors={['#FFFFFF', '#FFF7F0']}
      start={{ x: 0.2, y: 0 }}
      end={{ x: 0.8, y: 1 }}
      style={styles.screen}
    >
      <SafeAreaView style={styles.content}>
        <AnimatedPressable
          style={[styles.backButton, { transform: [{ scale: backScale }] }]}
          onPress={onBack}
          hitSlop={12}
          onPressIn={() => {
            Animated.spring(backScale, {
              toValue: 0.96,
              useNativeDriver: true,
            }).start();
          }}
          onPressOut={() => {
            Animated.spring(backScale, {
              toValue: 1,
              useNativeDriver: true,
            }).start();
          }}
        >
          <Text style={styles.backButtonIcon}>{'\u2039'}</Text>
          <Text style={styles.backButtonText}>Back</Text>
        </AnimatedPressable>
        <Animated.View
          style={{
            opacity: fadeLogo,
            transform: [{ translateY: slideLogo }],
            width: '100%',
          }}
        >
          <View style={styles.logoWrap}>
            <Image source={LOGO} style={styles.logo} resizeMode="contain" />
          </View>
        </Animated.View>
        <Animated.View
          style={{
            opacity: fadeHead,
            transform: [{ translateY: slideHead }],
            width: '100%',
          }}
        >
          <View style={styles.brandRow}>
            <View style={[styles.brandDot, { backgroundColor: COLORS.orange }]} />
            <View style={[styles.brandDot, { backgroundColor: COLORS.teal }]} />
            <View style={[styles.brandDot, { backgroundColor: COLORS.red }]} />
            <Text style={styles.eyebrow}>GET STARTED</Text>
          </View>
          <Text style={styles.title}>Choose your role</Text>
          <Text style={styles.tagline}>
            Serving fresh catering at your doorstep.
          </Text>
          <Text style={styles.subtitle}>Start your catering journey.</Text>
        </Animated.View>
        <Animated.View
          style={{
            opacity: fadeCards,
            transform: [{ translateY: slideCards }],
            width: '100%',
          }}
        >
          <View style={styles.buttonRow}>
            <Animated.View
              style={{ transform: [{ scale: userScale }], width: '100%' }}
            >
              <Pressable
                style={({ pressed }) => [
                  styles.roleCard,
                  styles.roleCardPrimary,
                  pressed && styles.roleCardPressed,
                ]}
                onPressIn={() => {
                  Animated.spring(userScale, {
                    toValue: 0.97,
                    useNativeDriver: true,
                  }).start();
                }}
                onPressOut={() => {
                  Animated.spring(userScale, {
                    toValue: 1,
                    useNativeDriver: true,
                  }).start();
                }}
                onPress={() => handleSelect('user')}
              >
                <View style={[styles.roleIcon, styles.userIcon]}>
                  <SvgXml width={34} height={34} xml={USER_ICON} />
                </View>
                <View style={styles.roleText}>
                  <Text style={styles.roleTitle}>I'm a customer</Text>
                  <Text style={styles.roleDescription}>
                    Order meals in seconds
                  </Text>
                </View>
                <Text style={styles.roleArrow}>{'\u203A'}</Text>
              </Pressable>
            </Animated.View>
            <Animated.View
              style={{ transform: [{ scale: adminScale }], width: '100%' }}
            >
              <Pressable
                style={({ pressed }) => [
                  styles.roleCard,
                  styles.roleCardSecondary,
                  pressed && styles.roleCardPressed,
                ]}
                onPressIn={() => {
                  Animated.spring(adminScale, {
                    toValue: 0.97,
                    useNativeDriver: true,
                  }).start();
                }}
                onPressOut={() => {
                  Animated.spring(adminScale, {
                    toValue: 1,
                    useNativeDriver: true,
                  }).start();
                }}
                onPress={() => handleSelect('admin')}
              >
                <View style={[styles.roleIcon, styles.adminIcon]}>
                  <SvgXml width={34} height={34} xml={ADMIN_ICON} />
                </View>
                <View style={styles.roleText}>
                  <Text style={styles.roleTitle}>I'm an admin</Text>
                  <Text style={styles.roleDescription}>
                    Manage orders, menus, operations
                  </Text>
                </View>
                <Text style={styles.roleArrow}>{'\u203A'}</Text>
              </Pressable>
            </Animated.View>
          </View>
        </Animated.View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 18,
    paddingBottom: 24,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  logoWrap: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: '100%',
    height: 160,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
    alignSelf: 'center',
  },
  brandDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  eyebrow: {
    fontFamily: 'LeagueSpartan_700Bold',
    fontSize: 9,
    letterSpacing: 1.6,
    color: COLORS.softInk,
    opacity: 0.7,
  },
  title: {
    fontFamily: 'LeagueSpartan_700Bold',
    fontSize: 28,
    textAlign: 'center',
    color: COLORS.ink,
    marginBottom: 4,
  },
  tagline: {
    fontFamily: 'LeagueSpartan_500Medium',
    fontSize: 12,
    textAlign: 'center',
    color: COLORS.softInk,
    marginBottom: 6,
  },
  subtitle: {
    fontFamily: 'LeagueSpartan_400Regular',
    fontSize: 13,
    lineHeight: 18,
    textAlign: 'center',
    color: COLORS.softInk,
    marginBottom: 18,
  },
  buttonRow: {
    width: '100%',
    gap: 12,
  },
  roleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(21, 21, 21, 0.10)',
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 18,
    gap: 14,
    width: '100%',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  roleCardPrimary: {
    backgroundColor: '#FFF6EC',
    borderColor: 'rgba(244, 162, 58, 0.28)',
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  roleCardSecondary: {
    backgroundColor: '#FFFFFF',
    borderColor: 'rgba(21, 21, 21, 0.08)',
    shadowOpacity: 0.03,
    shadowRadius: 6,
  },
  roleCardPressed: {
    shadowOpacity: 0.04,
    shadowRadius: 8,
  },
  roleIcon: {
    width: 56,
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userIcon: {
    backgroundColor: '#FFE7CC',
  },
  adminIcon: {
    backgroundColor: '#DDF7F3',
  },
  roleText: {
    flex: 1,
  },
  roleTitle: {
    fontFamily: 'LeagueSpartan_700Bold',
    fontSize: 15,
    color: COLORS.ink,
    marginBottom: 2,
  },
  roleDescription: {
    fontFamily: 'LeagueSpartan_400Regular',
    fontSize: 12,
    color: COLORS.softInk,
  },
  roleArrow: {
    fontFamily: 'LeagueSpartan_700Bold',
    fontSize: 18,
    color: '#C8B8A8',
  },
  backButton: {
    position: 'absolute',
    left: 12,
    top: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(21, 21, 21, 0.08)',
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  backButtonIcon: {
    fontFamily: 'LeagueSpartan_700Bold',
    color: '#5C5143',
    fontSize: 18,
    lineHeight: 18,
  },
  backButtonText: {
    fontFamily: 'LeagueSpartan_500Medium',
    color: '#5C5143',
    fontSize: 16,
  },
});
