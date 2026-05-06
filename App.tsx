import { StatusBar } from 'expo-status-bar';
import { VideoView, useVideoPlayer } from 'expo-video';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {
  useFonts,
  LeagueSpartan_700Bold,
  LeagueSpartan_500Medium,
  LeagueSpartan_400Regular,
} from '@expo-google-fonts/league-spartan';
import RoleSelectScreen from './LogIn/RoleSelectScreen';
import CustomerLoginScreen from './LogIn/CustomerLoginScreen';
import ViewMenuScreen from './ViewMenuScreen';
import HomeScreen from './User/Home';
import SettingsScreen from './User/settings';
import MenuScreen from './User/Menu';
import OrdersScreen from './User/Orders';
import CateringScreen from './User/CateringScreen';
import PersonalInfoScreen from './User/Sub Settings/PersonalInfoScreen';
import DeliveryAddressScreen from './User/Sub Settings/DeliveryAddressScreen';
import PaymentMethodsScreen from './User/Sub Settings/PaymentMethodsScreen';
import ChefBot from './User/Sub Settings/ChefBot';
import AdminPanel from './Admin/AdminPanel';
import AdminLoginScreen from './LogIn/AdminLoginScreen';

const INTRO_VIDEO = require('./assets/Fill at Home Landing Mobile PushIn.mp4');
const LOGO = require('./assets/Fill at Home.png');

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

type IntroVideoProps = {
  onFinish: () => void;
};

function IntroVideo({ onFinish }: IntroVideoProps) {
  const player = useVideoPlayer(INTRO_VIDEO, (videoPlayer) => {
    videoPlayer.loop = false;
    videoPlayer.play();
  });

  useEffect(() => {
    const endSubscription = player.addListener('playToEnd', onFinish);
    const statusSubscription = player.addListener('statusChange', (event) => {
      if (event.error) {
        onFinish();
      }
    });

    return () => {
      endSubscription.remove();
      statusSubscription.remove();
    };
  }, [onFinish, player]);

  return (
    <View style={styles.videoRoot}>
      <StatusBar style="light" />
      <VideoView player={player} style={styles.video} contentFit="cover" />
      <View style={styles.videoScrim} />
    </View>
  );
}

type LoginLoadingProps = {
  onFinish: () => void;
};

function LoginLoadingScreen({ onFinish }: LoginLoadingProps) {
  const player = useVideoPlayer(INTRO_VIDEO, (videoPlayer) => {
    videoPlayer.loop = true;
    videoPlayer.play();
  });
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fade, {
      toValue: 1,
      duration: 320,
      useNativeDriver: true,
    }).start();
    const timer = setTimeout(onFinish, 3000);
    return () => clearTimeout(timer);
  }, [fade, onFinish]);

  return (
    <Animated.View style={[styles.videoRoot, { opacity: fade }]}>
      <StatusBar style="light" />
      <VideoView player={player} style={styles.video} contentFit="cover" />
      <View style={styles.videoScrim} />
    </Animated.View>
  );
}

type LandingScreenProps = {
  onBookNow: () => void;
  onViewMenu: () => void;
};

function LandingScreen({ onBookNow, onViewMenu }: LandingScreenProps) {
  const reveal = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(reveal, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();
  }, [reveal]);

  const translateY = reveal.interpolate({
    inputRange: [0, 1],
    outputRange: [18, 0],
  });

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.content}>
        <Animated.View
          style={[
            styles.mainContent,
            { opacity: reveal, transform: [{ translateY }] },
          ]}
        >
          <View style={styles.logoWrap}>
            <Image source={LOGO} style={styles.logo} resizeMode="contain" />
          </View>
          <View style={styles.textBlock}>
            <Text style={styles.taglineTop}>WE PREPARE FOOD FOR</Text>
            <Text style={styles.taglineBottom}>
              <Text style={styles.taglineTeal}>EVERYONE, </Text>
              <Text style={styles.taglineRed}>EVERYDAY.</Text>
            </Text>
            <Text style={styles.supportingText}>
              Weeknight dinners, celebrations, and everything in between.
            </Text>
          </View>
          <View style={styles.buttonRow}>
            <Pressable
              style={[styles.button, styles.primaryButton]}
              onPress={onBookNow}
            >
              <Text style={styles.primaryButtonText}>Book Now </Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.secondaryButton]}
              onPress={onViewMenu}
            >
              <Text style={styles.secondaryButtonText}>View Menu</Text>
            </Pressable>
          </View>
        </Animated.View>
      </SafeAreaView>
    </View>
  );
}

export default function App() {
  const [hasPlayed, setHasPlayed] = useState(false);
  const [route, setRoute] = useState<
    | 'landing'
    | 'role'
    | 'menu'
    | 'user-menu'
    | 'catering'
    | 'orders'
    | 'customer-login'
    | 'login-loading'
    | 'admin-login'
    | 'user-home'
    | 'settings'
    | 'personal-info'
      | 'delivery-address'
      | 'payment-methods'
      | 'chefbot'
      | 'admin-panel'
  >('landing');
  const [fontsLoaded] = useFonts({
    LeagueSpartan_700Bold,
    LeagueSpartan_500Medium,
    LeagueSpartan_400Regular,
  });

  if (!hasPlayed) {
    return <IntroVideo onFinish={() => setHasPlayed(true)} />;
  }

  if (!fontsLoaded) {
    return <View style={styles.loading} />;
  }

  return (
    <SafeAreaProvider>
      {route === 'landing' ? (
        <LandingScreen
          onBookNow={() => setRoute('role')}
          onViewMenu={() => setRoute('menu')}
        />
      ) : route === 'role' ? (
        <RoleSelectScreen
          onBack={() => setRoute('landing')}
          onSelectRole={(role) =>
            setRoute(role === 'user' ? 'customer-login' : 'admin-login')
          }
        />
      ) : route === 'menu' ? (
        <ViewMenuScreen
          onBack={() => setRoute('landing')}
          onBookNow={() => setRoute('role')}
        />
      ) : route === 'user-menu' ? (
        <MenuScreen
          onHome={() => setRoute('user-home')}
          onMenu={() => setRoute('user-menu')}
          onOrders={() => setRoute('orders')}
          onProfile={() => setRoute('settings')}
        />
      ) : route === 'orders' ? (
        <OrdersScreen
          onHome={() => setRoute('user-home')}
          onMenu={() => setRoute('user-menu')}
          onOrders={() => setRoute('orders')}
          onProfile={() => setRoute('settings')}
        />
      ) : route === 'customer-login' ? (
        <CustomerLoginScreen
          onBack={() => setRoute('role')}
          onBypass={() => setRoute('login-loading')}
          onLogin={() => setRoute('login-loading')}
        />
      ) : route === 'login-loading' ? (
        <LoginLoadingScreen onFinish={() => setRoute('user-home')} />
      ) : route === 'catering' ? (
        <CateringScreen
          onBack={() => setRoute('user-home')}
          onHome={() => setRoute('user-home')}
          onMenu={() => setRoute('user-menu')}
          onOrders={() => setRoute('orders')}
          onProfile={() => setRoute('settings')}
        />
      ) : route === 'user-home' ? (
        <HomeScreen
          onBack={() => setRoute('role')}
          onBookNow={() => setRoute('catering')}
          onViewMenu={() => setRoute('user-menu')}
          onProfile={() => setRoute('settings')}
          onHome={() => setRoute('user-home')}
          onOrders={() => setRoute('orders')}
        />
      ) : route === 'settings' ? (
        <SettingsScreen
          onHome={() => setRoute('user-home')}
          onMenu={() => setRoute('user-menu')}
          onOrders={() => setRoute('orders')}
          onProfile={() => setRoute('settings')}
          onSignOut={() => setRoute('customer-login')}
          onPersonalInfo={() => setRoute('personal-info')}
          onDeliveryAddress={() => setRoute('delivery-address')}
          onPaymentMethods={() => setRoute('payment-methods')}
          onChefBot={() => setRoute('chefbot')}
        />
      ) : route === 'personal-info' ? (
        <PersonalInfoScreen
          onBack={() => setRoute('settings')}
          onHome={() => setRoute('user-home')}
          onMenu={() => setRoute('user-menu')}
          onOrders={() => setRoute('orders')}
          onProfile={() => setRoute('settings')}
        />
      ) : route === 'chefbot' ? (
        <ChefBot
          onBack={() => setRoute('settings')}
          onHome={() => setRoute('user-home')}
          onMenu={() => setRoute('user-menu')}
          onOrders={() => setRoute('orders')}
          onProfile={() => setRoute('settings')}
        />
      ) : route === 'delivery-address' ? (
        <DeliveryAddressScreen
          onBack={() => setRoute('settings')}
          onHome={() => setRoute('user-home')}
          onMenu={() => setRoute('user-menu')}
          onOrders={() => setRoute('orders')}
          onProfile={() => setRoute('settings')}
        />
      ) : route === 'payment-methods' ? (
        <PaymentMethodsScreen
          onBack={() => setRoute('settings')}
          onHome={() => setRoute('user-home')}
          onMenu={() => setRoute('user-menu')}
          onOrders={() => setRoute('orders')}
          onProfile={() => setRoute('settings')}
        />
      ) : route === 'admin-login' ? (
        <AdminLoginScreen
          onBack={() => setRoute('role')}
          onBypass={() => setRoute('admin-panel')}
          onLogin={(email, password) => {
            if (email.trim() && password.trim()) {
              setRoute('admin-panel');
            }
          }}
        />
      ) : (
        <AdminPanel onSignOut={() => setRoute('admin-login')} />
      )}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  videoRoot: {
    flex: 1,
    backgroundColor: '#000000',
  },
  video: {
    ...StyleSheet.absoluteFillObject,
  },
  videoScrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
  },
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 28,
    paddingVertical: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContent: {
    width: '100%',
    alignItems: 'center',
  },
  logoWrap: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    width: 260,
    height: 260,
  },
  textBlock: {
    width: '100%',
    maxWidth: 360,
    alignItems: 'center',
  },
  taglineTop: {
    fontFamily: 'LeagueSpartan_700Bold',
    fontSize: 22,
    textAlign: 'center',
    color: COLORS.orange,
    letterSpacing: 0.8,
    marginBottom: 6,
  },
  taglineBottom: {
    fontFamily: 'LeagueSpartan_700Bold',
    fontSize: 22,
    textAlign: 'center',
    letterSpacing: 0.8,
    marginBottom: 16,
  },
  taglineTeal: {
    color: COLORS.teal,
  },
  taglineRed: {
    color: COLORS.red,
  },
  supportingText: {
    fontFamily: 'LeagueSpartan_400Regular',
    fontSize: 15,
    lineHeight: 24,
    textAlign: 'center',
    color: '#6B6159',
    marginBottom: 32,
  },
  buttonRow: {
    width: '100%',
    gap: 12,
    alignItems: 'center',
  },
  button: {
    borderRadius: 999,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
    minHeight: 52,
    justifyContent: 'center',
    width: '100%',
  },
  primaryButton: {
    backgroundColor: COLORS.ink,
  },
  primaryButtonText: {
    fontFamily: 'LeagueSpartan_700Bold',
    color: '#FFFFFF',
    fontSize: 15,
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(21, 21, 21, 0.15)',
  },
  secondaryButtonText: {
    fontFamily: 'LeagueSpartan_500Medium',
    color: COLORS.ink,
    fontSize: 15,
  },
});
