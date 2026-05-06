import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const LOGO = require('../assets/Fill at Home.png');

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

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type CustomerLoginScreenProps = {
  onBack?: () => void;
  onLogin?: (email: string, password: string) => void;
  onBypass?: () => void;
};

export default function CustomerLoginScreen({
  onBack,
  onLogin,
  onBypass,
}: CustomerLoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const fadeIn = useRef(new Animated.Value(0)).current;
  const slideUp = useRef(new Animated.Value(12)).current;
  const backScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeIn, {
        toValue: 1,
        duration: 420,
        useNativeDriver: true,
      }),
      Animated.timing(slideUp, {
        toValue: 0,
        duration: 420,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeIn, slideUp]);

  const triggerTransition = (next: () => void) => {
    if (isTransitioning) {
      return;
    }
    setIsTransitioning(true);
    Animated.timing(fadeIn, {
      toValue: 0,
      duration: 220,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        next();
      }
    });
  };

  const handleLogin = () => {
    if (onLogin) {
      triggerTransition(() => onLogin(email.trim(), password));
    }
  };

  const handleBypass = () => {
    if (onBypass) {
      triggerTransition(onBypass);
    }
  };

  return (
    <LinearGradient
      colors={['#FFFFFF', '#FFF7F0']}
      start={{ x: 0.2, y: 0 }}
      end={{ x: 0.8, y: 1 }}
      style={styles.screen}
    >
      <SafeAreaView style={styles.content}>
        {onBack ? (
          <AnimatedPressable
            style={[styles.backButton, { transform: [{ scale: backScale }] }]}
            onPress={onBack}
            disabled={isTransitioning}
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
        ) : null}
        <Animated.View
          style={[
            styles.enterWrap,
            { opacity: fadeIn, transform: [{ translateY: slideUp }] },
          ]}
        >
          <View style={styles.logoWrap}>
            <Image source={LOGO} style={styles.logo} resizeMode="contain" />
          </View>
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>Log in to place your next order.</Text>
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="you@email.com"
              placeholderTextColor="#9D9082"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.input}
            />
          </View>
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              placeholderTextColor="#9D9082"
              secureTextEntry
              style={styles.input}
            />
          </View>
          <Pressable style={styles.primaryButton} onPress={handleLogin}>
            <Text style={styles.primaryButtonText}>Log in</Text>
          </Pressable>
          <Pressable style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Create an account</Text>
          </Pressable>
          {onBypass ? (
            <Pressable
              style={styles.bypassButton}
              onPress={handleBypass}
              disabled={isTransitioning}
            >
              <Text style={styles.bypassButtonText}>Bypass login</Text>
            </Pressable>
          ) : null}
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
  enterWrap: {
    width: '100%',
    alignItems: 'center',
  },
  logoWrap: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 8,
  },
  logo: {
    width: '100%',
    height: 140,
  },
  title: {
    fontFamily: 'LeagueSpartan_700Bold',
    fontSize: 28,
    textAlign: 'center',
    color: COLORS.ink,
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: 'LeagueSpartan_400Regular',
    fontSize: 13,
    textAlign: 'center',
    color: COLORS.softInk,
    marginBottom: 18,
  },
  fieldGroup: {
    width: '100%',
    marginBottom: 12,
  },
  label: {
    fontFamily: 'LeagueSpartan_500Medium',
    fontSize: 12,
    color: COLORS.softInk,
    marginBottom: 6,
  },
  input: {
    width: '100%',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(21, 21, 21, 0.12)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontFamily: 'LeagueSpartan_400Regular',
    fontSize: 14,
    color: COLORS.ink,
    backgroundColor: '#FFFFFF',
  },
  primaryButton: {
    width: '100%',
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: 'center',
    backgroundColor: COLORS.ink,
    marginTop: 8,
  },
  primaryButtonText: {
    fontFamily: 'LeagueSpartan_700Bold',
    color: '#FFFFFF',
    fontSize: 15,
  },
  secondaryButton: {
    width: '100%',
    borderRadius: 18,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(21, 21, 21, 0.12)',
    marginTop: 10,
    backgroundColor: '#FFFFFF',
  },
  secondaryButtonText: {
    fontFamily: 'LeagueSpartan_500Medium',
    color: COLORS.softInk,
    fontSize: 14,
  },
  bypassButton: {
    width: '100%',
    borderRadius: 16,
    paddingVertical: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(43, 185, 166, 0.35)',
    backgroundColor: 'rgba(43, 185, 166, 0.12)',
    marginTop: 8,
  },
  bypassButtonText: {
    fontFamily: 'LeagueSpartan_500Medium',
    color: COLORS.teal,
    fontSize: 13,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
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
