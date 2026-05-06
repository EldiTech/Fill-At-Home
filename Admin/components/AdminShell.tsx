import { ReactNode } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ADMIN_COLORS, ADMIN_MODULE_LABELS, ADMIN_MODULE_ORDER } from '../theme';
import { AdminModuleKey } from '../types';

const LOGO = require('../../assets/Home Logo.png');

type AdminShellProps = {
  activeModule: AdminModuleKey;
  onChangeModule: (module: AdminModuleKey) => void;
  onSignOut: () => void;
  children: ReactNode;
};

export default function AdminShell({
  activeModule,
  onChangeModule,
  onSignOut,
  children,
}: AdminShellProps) {
  return (
    <View style={styles.screen}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.topBar}>
          <View style={styles.brandWrap}>
            <Image source={LOGO} style={styles.logo} resizeMode="contain" />
            <View style={styles.headingWrap}>
              <Text style={styles.title}>Admin Panel</Text>
              <Text style={styles.subtitle}>Fill at Home</Text>
            </View>
          </View>
          <Pressable style={styles.signOutButton} onPress={onSignOut}>
            <Text style={styles.signOutText}>Sign out</Text>
          </Pressable>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabRow}
          style={styles.tabScroll}
        >
          {ADMIN_MODULE_ORDER.map((module) => {
            const active = module === activeModule;
            return (
              <Pressable
                key={module}
                style={[styles.tab, active && styles.tabActive]}
                onPress={() => onChangeModule(module)}
              >
                <Text style={[styles.tabText, active && styles.tabTextActive]}>
                  {ADMIN_MODULE_LABELS[module]}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <View style={styles.content}>{children}</View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: ADMIN_COLORS.background,
  },
  safeArea: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 4,
  },
  brandWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logo: {
    width: 42,
    height: 42,
  },
  headingWrap: {
    flex: 1,
  },
  title: {
    fontFamily: 'LeagueSpartan_700Bold',
    fontSize: 24,
    color: ADMIN_COLORS.ink,
  },
  subtitle: {
    fontFamily: 'LeagueSpartan_400Regular',
    fontSize: 11,
    color: ADMIN_COLORS.softInk,
    marginTop: 0,
  },
  signOutButton: {
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: ADMIN_COLORS.surface,
    borderWidth: 1,
    borderColor: ADMIN_COLORS.border,
  },
  signOutText: {
    fontFamily: 'LeagueSpartan_600SemiBold',
    fontSize: 13,
    color: ADMIN_COLORS.ink,
  },
  tabScroll: {
    maxHeight: 48,
    marginTop: 8,
  },
  tabRow: {
    paddingHorizontal: 20,
    gap: 8,
    paddingBottom: 6,
  },
  tab: {
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: ADMIN_COLORS.border,
    backgroundColor: ADMIN_COLORS.surface,
  },
  tabActive: {
    borderColor: ADMIN_COLORS.ink,
    backgroundColor: ADMIN_COLORS.ink,
  },
  tabText: {
    fontFamily: 'LeagueSpartan_600SemiBold',
    fontSize: 12,
    color: ADMIN_COLORS.ink,
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
});

