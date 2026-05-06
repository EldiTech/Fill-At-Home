import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ADMIN_COLORS } from '../theme';
import { AdminAnalyticsSnapshot, AdminModuleKey, AuditLog, OrderRecord } from '../types';

type DashboardScreenProps = {
  analytics: AdminAnalyticsSnapshot;
  recentOrders: OrderRecord[];
  recentAuditLogs: AuditLog[];
  onOpenModule: (module: AdminModuleKey) => void;
};

type KpiItem = {
  key: keyof AdminAnalyticsSnapshot;
  label: string;
  color: string;
};

const KPI_ITEMS: KpiItem[] = [
  { key: 'totalUsers', label: 'Total Users', color: ADMIN_COLORS.blue },
  { key: 'activeUsers', label: 'Active Users', color: ADMIN_COLORS.green },
  { key: 'openOrders', label: 'Open Orders', color: ADMIN_COLORS.orange },
  { key: 'publishedMenuItems', label: 'Published Menu', color: ADMIN_COLORS.teal },
  { key: 'publishedPackages', label: 'Published Packages', color: ADMIN_COLORS.amber },
  { key: 'publishedAnnouncements', label: 'Live Announcements', color: ADMIN_COLORS.red },
];

const QUICK_ACTIONS: Array<{ label: string; module: AdminModuleKey }> = [
  { label: 'Manage users', module: 'users' },
  { label: 'Manage core modules', module: 'core' },
  { label: 'View reports', module: 'reports' },
  { label: 'Create announcement', module: 'notifications' },
  { label: 'Roles & settings', module: 'settings' },
];

const LOGO = require('../../assets/Home Logo.png');

export default function DashboardScreen({
  analytics,
  recentOrders,
  recentAuditLogs,
  onOpenModule,
}: DashboardScreenProps) {
  return (
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.heroCard}>
        <Image source={LOGO} style={styles.heroLogo} resizeMode="contain" />
        <View style={styles.heroTextWrap}>
          <Text style={styles.heroTitle}>Overview</Text>
          <Text style={styles.heroSubtitle}>Simple view of users, orders, and activity</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Key Metrics</Text>
      <View style={styles.kpiGrid}>
        {KPI_ITEMS.map((item) => (
          <View key={item.key} style={styles.kpiCard}>
            <Text style={styles.kpiLabel}>{item.label}</Text>
            <Text style={[styles.kpiValue, { color: item.color }]}>
              {analytics[item.key]}
            </Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.quickActionWrap}>
        {QUICK_ACTIONS.map((action) => (
          <Pressable
            key={action.label}
            style={styles.quickActionButton}
            onPress={() => onOpenModule(action.module)}
          >
            <Text style={styles.quickActionText}>{action.label}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Recent Orders</Text>
      <View style={styles.listCard}>
        {recentOrders.length === 0 ? (
          <Text style={styles.emptyText}>No orders yet.</Text>
        ) : (
          recentOrders.slice(0, 5).map((order) => (
            <View key={order.id} style={styles.row}>
              <View>
                <Text style={styles.rowTitle}>{order.id}</Text>
                <Text style={styles.rowSub}>
                  {order.customerName} | {order.itemCount} items
                </Text>
              </View>
              <Text style={styles.rowStatus}>{order.status.replaceAll('_', ' ')}</Text>
            </View>
          ))
        )}
      </View>

      <Text style={styles.sectionTitle}>Recent Audit Logs</Text>
      <View style={styles.listCard}>
        {recentAuditLogs.length === 0 ? (
          <Text style={styles.emptyText}>No activity yet.</Text>
        ) : (
          recentAuditLogs.slice(0, 6).map((log) => (
            <View key={log.id} style={styles.logRow}>
              <Text style={styles.logAction}>{log.action}</Text>
              <Text style={styles.logDetail}>{log.detail}</Text>
              <Text style={styles.logTime}>{log.timestamp}</Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 24,
    gap: 12,
  },
  heroCard: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: ADMIN_COLORS.border,
    backgroundColor: ADMIN_COLORS.surface,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  heroLogo: {
    width: 44,
    height: 44,
  },
  heroTextWrap: {
    flex: 1,
  },
  heroTitle: {
    fontFamily: 'LeagueSpartan_700Bold',
    fontSize: 20,
    color: ADMIN_COLORS.ink,
  },
  heroSubtitle: {
    fontFamily: 'LeagueSpartan_400Regular',
    fontSize: 11,
    color: ADMIN_COLORS.softInk,
  },
  sectionTitle: {
    fontFamily: 'LeagueSpartan_700Bold',
    fontSize: 16,
    color: ADMIN_COLORS.ink,
  },
  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 10,
  },
  kpiCard: {
    width: '48%',
    borderRadius: 14,
    padding: 10,
    backgroundColor: ADMIN_COLORS.surface,
    borderWidth: 1,
    borderColor: ADMIN_COLORS.border,
  },
  kpiLabel: {
    fontFamily: 'LeagueSpartan_500Medium',
    fontSize: 12,
    color: ADMIN_COLORS.softInk,
  },
  kpiValue: {
    fontFamily: 'LeagueSpartan_700Bold',
    fontSize: 20,
    marginTop: 4,
  },
  quickActionWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  quickActionButton: {
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: ADMIN_COLORS.surface,
    borderWidth: 1,
    borderColor: ADMIN_COLORS.border,
  },
  quickActionText: {
    fontFamily: 'LeagueSpartan_600SemiBold',
    fontSize: 13,
    color: ADMIN_COLORS.ink,
  },
  listCard: {
    borderRadius: 14,
    backgroundColor: ADMIN_COLORS.surface,
    borderWidth: 1,
    borderColor: ADMIN_COLORS.border,
    overflow: 'hidden',
  },
  emptyText: {
    fontFamily: 'LeagueSpartan_400Regular',
    fontSize: 12,
    color: ADMIN_COLORS.muted,
    padding: 12,
  },
  row: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(21, 21, 21, 0.06)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  rowTitle: {
    fontFamily: 'LeagueSpartan_700Bold',
    fontSize: 13,
    color: ADMIN_COLORS.ink,
  },
  rowSub: {
    fontFamily: 'LeagueSpartan_400Regular',
    fontSize: 11,
    color: ADMIN_COLORS.muted,
  },
  rowStatus: {
    fontFamily: 'LeagueSpartan_500Medium',
    fontSize: 11,
    color: ADMIN_COLORS.blue,
    textTransform: 'capitalize',
  },
  logRow: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(21, 21, 21, 0.06)',
  },
  logAction: {
    fontFamily: 'LeagueSpartan_700Bold',
    fontSize: 13,
    color: ADMIN_COLORS.ink,
  },
  logDetail: {
    fontFamily: 'LeagueSpartan_400Regular',
    fontSize: 11,
    color: ADMIN_COLORS.softInk,
    marginTop: 2,
  },
  logTime: {
    fontFamily: 'LeagueSpartan_400Regular',
    fontSize: 10,
    color: ADMIN_COLORS.muted,
    marginTop: 4,
  },
});

