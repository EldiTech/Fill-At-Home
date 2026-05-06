import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ADMIN_COLORS } from '../theme';

type AdminLoginScreenProps = {
  onBack: () => void;
  onLogin: (email: string, password: string) => void;
};

export default function AdminLoginScreen({ onBack, onLogin }: AdminLoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <LinearGradient
      colors={['#FFFFFF', '#EEF8F6']}
      start={{ x: 0.2, y: 0 }}
      end={{ x: 0.8, y: 1 }}
      style={styles.screen}
    >
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={styles.body}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <View style={styles.card}>
            <Text style={styles.title}>Admin Authentication</Text>
            <Text style={styles.subtitle}>
              Secure login for dashboard, management controls, and reports.
            </Text>

            <Text style={styles.label}>Work email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="admin@fillathome.com"
              placeholderTextColor={ADMIN_COLORS.muted}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              placeholderTextColor={ADMIN_COLORS.muted}
              secureTextEntry
            />

            <Pressable
              style={styles.primaryButton}
              onPress={() => onLogin(email.trim(), password)}
            >
              <Text style={styles.primaryButtonText}>Log in to admin panel</Text>
            </Pressable>

            <Pressable style={styles.secondaryButton} onPress={onBack}>
              <Text style={styles.secondaryButtonText}>Back to role selection</Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
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
  body: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  card: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(21, 21, 21, 0.1)',
    backgroundColor: '#FFFFFF',
    padding: 18,
    gap: 8,
  },
  title: {
    fontFamily: 'LeagueSpartan_700Bold',
    fontSize: 26,
    color: ADMIN_COLORS.ink,
  },
  subtitle: {
    fontFamily: 'LeagueSpartan_400Regular',
    fontSize: 12,
    lineHeight: 17,
    color: ADMIN_COLORS.softInk,
    marginBottom: 4,
  },
  label: {
    fontFamily: 'LeagueSpartan_600SemiBold',
    fontSize: 12,
    color: ADMIN_COLORS.ink,
    marginTop: 4,
  },
  input: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: ADMIN_COLORS.border,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontFamily: 'LeagueSpartan_400Regular',
    fontSize: 13,
    color: ADMIN_COLORS.ink,
  },
  primaryButton: {
    marginTop: 8,
    borderRadius: 14,
    backgroundColor: ADMIN_COLORS.ink,
    alignItems: 'center',
    paddingVertical: 12,
  },
  primaryButtonText: {
    fontFamily: 'LeagueSpartan_700Bold',
    fontSize: 14,
    color: '#FFFFFF',
  },
  secondaryButton: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: ADMIN_COLORS.border,
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
  },
  secondaryButtonText: {
    fontFamily: 'LeagueSpartan_600SemiBold',
    fontSize: 13,
    color: ADMIN_COLORS.ink,
  },
});

