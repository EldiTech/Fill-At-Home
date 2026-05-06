import { Animated, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useRef, useState } from 'react';
import { COLORS } from '../constants';
import BottomNavBar from '../components/BottomNavBar';
import TopHeader from '../components/TopHeader';

type PersonalInfoScreenProps = {
  onBack?: () => void;
  onHome?: () => void;
  onMenu?: () => void;
  onOrders?: () => void;
  onProfile?: () => void;
};

export default function PersonalInfoScreen({
  onBack,
  onHome,
  onMenu,
  onOrders,
  onProfile,
}: PersonalInfoScreenProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
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
            <TopHeader subtitle="Personal Info" />
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Personal Information</Text>
              <Text style={styles.headerSubtitle}>
                Update your name, email, and phone number.
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
            <View style={styles.formSection}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your full name"
                placeholderTextColor={COLORS.muted}
                value={fullName}
                onChangeText={setFullName}
              />
            </View>

            <View style={styles.formSection}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor={COLORS.muted}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
            </View>

            <View style={styles.formSection}>
              <Text style={styles.label}>Phone Number</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your phone number"
                placeholderTextColor={COLORS.muted}
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
            </View>

            <Pressable style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </Pressable>
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
    gap: 16,
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
  formSection: {
    gap: 8,
  },
  label: {
    fontFamily: 'LeagueSpartan_600SemiBold',
    fontSize: 14,
    color: COLORS.ink,
  },
  input: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    fontFamily: 'LeagueSpartan_400Regular',
    fontSize: 14,
    color: COLORS.ink,
    backgroundColor: '#FFFFFF',
  },
  saveButton: {
    marginTop: 12,
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: COLORS.ink,
  },
  saveButtonText: {
    fontFamily: 'LeagueSpartan_700Bold',
    fontSize: 14,
    color: '#FFFFFF',
  },
});
