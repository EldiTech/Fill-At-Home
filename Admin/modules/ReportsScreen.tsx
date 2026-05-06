import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { ADMIN_COLORS } from '../theme';
import { AdminAnalyticsSnapshot, MenuItemRecord, OrderRecord, UserRecord } from '../types';

type ReportsScreenProps = {
  analytics: AdminAnalyticsSnapshot;
  users: UserRecord[];
  orders: OrderRecord[];
  menuItems: MenuItemRecord[];
};

type DistributionRowProps = {
  label: string;
  value: number;
  total: number;
  color?: string;
};

function DistributionRow({ label, value, total, color = ADMIN_COLORS.blue }: DistributionRowProps) {
  const percent = total > 0 ? Math.round((value / total) * 100) : 0;
  const visiblePercent = percent > 0 ? percent : 2;
  return (
    <View style={styles.distributionRow}>
      <View style={styles.distributionHeader}>
        <Text style={styles.distributionLabel}>{label}</Text>
        <Text style={styles.distributionValue}>
          {value} ({percent}%)
        </Text>
      </View>
      <View style={styles.distributionTrack}>
        <View style={[styles.distributionFill, { width: `${visiblePercent}%`, backgroundColor: color }]} />
      </View>
    </View>
  );
}

export default function ReportsScreen({ analytics, users, orders, menuItems }: ReportsScreenProps) {
  const orderStatusCounts = orders.reduce<Record<string, number>>((accumulator, order) => {
    const key = order.status.replaceAll('_', ' ');
    accumulator[key] = (accumulator[key] ?? 0) + 1;
    return accumulator;
  }, {});

  const categoryCounts = menuItems.reduce<Record<string, number>>((accumulator, item) => {
    accumulator[item.category] = (accumulator[item.category] ?? 0) + 1;
    return accumulator;
  }, {});

  const suspendedUsers = users.filter((user) => user.status === 'suspended').length;
  const deactivatedUsers = users.filter((user) => user.status === 'deactivated').length;

  return (
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <Text style={styles.sectionTitle}>Reports & Analytics</Text>
      <Text style={styles.sectionSubtitle}>
        System insights for growth, operations, and platform health.
      </Text>

      <View style={styles.summaryGrid}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>User Activity Rate</Text>
          <Text style={styles.summaryValue}>
            {analytics.totalUsers > 0
              ? `${Math.round((analytics.activeUsers / analytics.totalUsers) * 100)}%`
              : '0%'}
          </Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Open Order Load</Text>
          <Text style={styles.summaryValue}>{analytics.openOrders}</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Suspended Users</Text>
          <Text style={styles.summaryValue}>{suspendedUsers}</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Deactivated Users</Text>
          <Text style={styles.summaryValue}>{deactivatedUsers}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Order Status Distribution</Text>
        {Object.keys(orderStatusCounts).length === 0 ? (
          <Text style={styles.emptyText}>No order activity yet.</Text>
        ) : (
          Object.entries(orderStatusCounts).map(([label, value], index) => (
            <DistributionRow
              key={label}
              label={label}
              value={value}
              total={orders.length}
              color={
                [ADMIN_COLORS.orange, ADMIN_COLORS.teal, ADMIN_COLORS.blue, ADMIN_COLORS.green][
                  index % 4
                ]
              }
            />
          ))
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Menu Category Distribution</Text>
        {Object.keys(categoryCounts).length === 0 ? (
          <Text style={styles.emptyText}>No menu items yet.</Text>
        ) : (
          Object.entries(categoryCounts).map(([label, value], index) => (
            <DistributionRow
              key={label}
              label={label}
              value={value}
              total={menuItems.length}
              color={
                [ADMIN_COLORS.red, ADMIN_COLORS.orange, ADMIN_COLORS.teal, ADMIN_COLORS.blue][
                  index % 4
                ]
              }
            />
          ))
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Operational Insights</Text>
        <Text style={styles.insightText}>
          1. Published menu items: {analytics.publishedMenuItems} of {menuItems.length}
        </Text>
        <Text style={styles.insightText}>
          2. Published catering packages: {analytics.publishedPackages}
        </Text>
        <Text style={styles.insightText}>
          3. Live announcements: {analytics.publishedAnnouncements}
        </Text>
        <Text style={styles.insightText}>
          4. Recommendation: Prioritize open order fulfillment and retain suspended users with
          account recovery campaigns.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    gap: 12,
  },
  sectionTitle: {
    fontFamily: 'LeagueSpartan_700Bold',
    fontSize: 20,
    color: ADMIN_COLORS.ink,
  },
  sectionSubtitle: {
    fontFamily: 'LeagueSpartan_400Regular',
    fontSize: 12,
    color: ADMIN_COLORS.softInk,
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 10,
  },
  summaryCard: {
    width: '48%',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: ADMIN_COLORS.border,
    backgroundColor: ADMIN_COLORS.surface,
  },
  summaryLabel: {
    fontFamily: 'LeagueSpartan_500Medium',
    fontSize: 12,
    color: ADMIN_COLORS.softInk,
  },
  summaryValue: {
    marginTop: 6,
    fontFamily: 'LeagueSpartan_700Bold',
    fontSize: 22,
    color: ADMIN_COLORS.ink,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: ADMIN_COLORS.border,
    backgroundColor: ADMIN_COLORS.surface,
    padding: 12,
    gap: 10,
  },
  cardTitle: {
    fontFamily: 'LeagueSpartan_700Bold',
    fontSize: 15,
    color: ADMIN_COLORS.ink,
  },
  distributionRow: {
    gap: 4,
  },
  distributionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  distributionLabel: {
    fontFamily: 'LeagueSpartan_500Medium',
    fontSize: 12,
    color: ADMIN_COLORS.ink,
    textTransform: 'capitalize',
  },
  distributionValue: {
    fontFamily: 'LeagueSpartan_400Regular',
    fontSize: 11,
    color: ADMIN_COLORS.muted,
  },
  distributionTrack: {
    height: 8,
    borderRadius: 999,
    backgroundColor: 'rgba(21, 21, 21, 0.08)',
    overflow: 'hidden',
  },
  distributionFill: {
    height: '100%',
    borderRadius: 999,
    minWidth: 4,
  },
  insightText: {
    fontFamily: 'LeagueSpartan_400Regular',
    fontSize: 12,
    color: ADMIN_COLORS.softInk,
    lineHeight: 17,
  },
  emptyText: {
    fontFamily: 'LeagueSpartan_400Regular',
    fontSize: 12,
    color: ADMIN_COLORS.muted,
  },
});

