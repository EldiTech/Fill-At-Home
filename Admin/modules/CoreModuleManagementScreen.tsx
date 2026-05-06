import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { ADMIN_COLORS } from '../theme';
import {
  CateringPackageRecord,
  CoreFeatureControl,
  MenuItemRecord,
  NewCateringPackageInput,
  NewMenuItemInput,
  OrderRecord,
} from '../types';

type CoreModuleManagementScreenProps = {
  menuItems: MenuItemRecord[];
  cateringPackages: CateringPackageRecord[];
  orders: OrderRecord[];
  coreFeatures: CoreFeatureControl[];
  onCreateMenuItem: (payload: NewMenuItemInput) => void;
  onToggleMenuPublish: (menuItemId: string) => void;
  onToggleMenuFeatured: (menuItemId: string) => void;
  onDeleteMenuItem: (menuItemId: string) => void;
  onCreateCateringPackage: (payload: NewCateringPackageInput) => void;
  onToggleCateringPackagePublish: (packageId: string) => void;
  onDeleteCateringPackage: (packageId: string) => void;
  onAdvanceOrderStatus: (orderId: string) => void;
  onToggleCoreFeature: (featureId: string) => void;
};

export default function CoreModuleManagementScreen({
  menuItems,
  cateringPackages,
  orders,
  coreFeatures,
  onCreateMenuItem,
  onToggleMenuPublish,
  onToggleMenuFeatured,
  onDeleteMenuItem,
  onCreateCateringPackage,
  onToggleCateringPackagePublish,
  onDeleteCateringPackage,
  onAdvanceOrderStatus,
  onToggleCoreFeature,
}: CoreModuleManagementScreenProps) {
  const [menuName, setMenuName] = useState('');
  const [menuCategory, setMenuCategory] = useState('');
  const [menuTags, setMenuTags] = useState('');
  const [menuPrice, setMenuPrice] = useState('');

  const [packageName, setPackageName] = useState('');
  const [packageTier, setPackageTier] = useState<'Basic' | 'Premium'>('Basic');
  const [packagePrice, setPackagePrice] = useState('');
  const [packageDescription, setPackageDescription] = useState('');

  const openOrders = useMemo(
    () => orders.filter((order) => order.status !== 'delivered' && order.status !== 'cancelled'),
    [orders]
  );

  const submitMenu = () => {
    const payload: NewMenuItemInput = {
      name: menuName.trim(),
      category: menuCategory.trim(),
      tags: menuTags
        .split(',')
        .map((value) => value.trim())
        .filter(Boolean),
      priceRange: menuPrice.trim(),
    };
    if (!payload.name || !payload.category || !payload.priceRange) {
      return;
    }
    onCreateMenuItem(payload);
    setMenuName('');
    setMenuCategory('');
    setMenuTags('');
    setMenuPrice('');
  };

  const submitPackage = () => {
    const payload: NewCateringPackageInput = {
      name: packageName.trim(),
      tier: packageTier,
      basePrice: packagePrice.trim(),
      description: packageDescription.trim(),
    };
    if (!payload.name || !payload.basePrice || !payload.description) {
      return;
    }
    onCreateCateringPackage(payload);
    setPackageName('');
    setPackagePrice('');
    setPackageDescription('');
    setPackageTier('Basic');
  };

  return (
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <Text style={styles.sectionTitle}>Core Module Management</Text>
      <Text style={styles.sectionSubtitle}>
        Mirror-control all user-facing systems: home, menu, catering, orders, profile settings, and
        ChefBot availability.
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Home & Settings Feature Controls</Text>
        {coreFeatures.map((feature) => (
          <View key={feature.id} style={styles.featureRow}>
            <View style={styles.featureTextWrap}>
              <Text style={styles.featureTitle}>{feature.label}</Text>
              <Text style={styles.featureDesc}>{feature.description}</Text>
            </View>
            <Pressable
              style={[styles.toggleButton, feature.enabled && styles.toggleButtonOn]}
              onPress={() => onToggleCoreFeature(feature.id)}
            >
              <Text style={[styles.toggleButtonText, feature.enabled && styles.toggleButtonTextOn]}>
                {feature.enabled ? 'Enabled' : 'Disabled'}
              </Text>
            </Pressable>
          </View>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Menu Catalog Management</Text>
        <TextInput
          style={styles.input}
          value={menuName}
          onChangeText={setMenuName}
          placeholder="Menu item name"
          placeholderTextColor={ADMIN_COLORS.muted}
        />
        <TextInput
          style={styles.input}
          value={menuCategory}
          onChangeText={setMenuCategory}
          placeholder="Category (e.g. Seafood)"
          placeholderTextColor={ADMIN_COLORS.muted}
        />
        <TextInput
          style={styles.input}
          value={menuTags}
          onChangeText={setMenuTags}
          placeholder="Tags (comma separated)"
          placeholderTextColor={ADMIN_COLORS.muted}
        />
        <TextInput
          style={styles.input}
          value={menuPrice}
          onChangeText={setMenuPrice}
          placeholder="Price range (e.g. PHP 1,200 - 1,800)"
          placeholderTextColor={ADMIN_COLORS.muted}
        />
        <Pressable style={styles.primaryButton} onPress={submitMenu}>
          <Text style={styles.primaryButtonText}>Add menu item</Text>
        </Pressable>

        {menuItems.map((item) => (
          <View key={item.id} style={styles.itemRow}>
            <View style={styles.itemTextWrap}>
              <Text style={styles.itemTitle}>{item.name}</Text>
              <Text style={styles.itemMeta}>
                {item.category} | {item.priceRange}
              </Text>
              <Text style={styles.itemMeta}>{item.tags.join(', ')}</Text>
            </View>
            <View style={styles.itemActionWrap}>
              <Pressable style={styles.miniButton} onPress={() => onToggleMenuPublish(item.id)}>
                <Text style={styles.miniButtonText}>
                  {item.status === 'published' ? 'Unpublish' : 'Publish'}
                </Text>
              </Pressable>
              <Pressable style={styles.miniButton} onPress={() => onToggleMenuFeatured(item.id)}>
                <Text style={styles.miniButtonText}>
                  {item.featured ? 'Unfeature' : 'Feature'}
                </Text>
              </Pressable>
              <Pressable
                style={[styles.miniButton, styles.miniButtonDanger]}
                onPress={() => onDeleteMenuItem(item.id)}
              >
                <Text style={[styles.miniButtonText, styles.miniButtonDangerText]}>Delete</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Catering Package Management</Text>
        <TextInput
          style={styles.input}
          value={packageName}
          onChangeText={setPackageName}
          placeholder="Package name"
          placeholderTextColor={ADMIN_COLORS.muted}
        />

        <View style={styles.choiceRow}>
          {(['Basic', 'Premium'] as const).map((tier) => {
            const active = packageTier === tier;
            return (
              <Pressable
                key={tier}
                style={[styles.choice, active && styles.choiceActive]}
                onPress={() => setPackageTier(tier)}
              >
                <Text style={[styles.choiceText, active && styles.choiceTextActive]}>{tier}</Text>
              </Pressable>
            );
          })}
        </View>

        <TextInput
          style={styles.input}
          value={packagePrice}
          onChangeText={setPackagePrice}
          placeholder="Base price"
          placeholderTextColor={ADMIN_COLORS.muted}
        />
        <TextInput
          style={[styles.input, styles.multilineInput]}
          value={packageDescription}
          onChangeText={setPackageDescription}
          placeholder="Package description"
          placeholderTextColor={ADMIN_COLORS.muted}
          multiline
          numberOfLines={3}
        />
        <Pressable style={styles.primaryButton} onPress={submitPackage}>
          <Text style={styles.primaryButtonText}>Add package</Text>
        </Pressable>

        {cateringPackages.map((pkg) => (
          <View key={pkg.id} style={styles.itemRow}>
            <View style={styles.itemTextWrap}>
              <Text style={styles.itemTitle}>
                {pkg.name} ({pkg.tier})
              </Text>
              <Text style={styles.itemMeta}>
                {pkg.basePrice} | {pkg.inquiries} inquiries
              </Text>
              <Text style={styles.itemMeta}>{pkg.description}</Text>
            </View>
            <View style={styles.itemActionWrap}>
              <Pressable
                style={styles.miniButton}
                onPress={() => onToggleCateringPackagePublish(pkg.id)}
              >
                <Text style={styles.miniButtonText}>
                  {pkg.status === 'published' ? 'Unpublish' : 'Publish'}
                </Text>
              </Pressable>
              <Pressable
                style={[styles.miniButton, styles.miniButtonDanger]}
                onPress={() => onDeleteCateringPackage(pkg.id)}
              >
                <Text style={[styles.miniButtonText, styles.miniButtonDangerText]}>Delete</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Order Pipeline Control</Text>
        {openOrders.length === 0 ? (
          <Text style={styles.emptyText}>No active orders.</Text>
        ) : (
          openOrders.map((order) => (
            <View key={order.id} style={styles.orderRow}>
              <View style={styles.itemTextWrap}>
                <Text style={styles.itemTitle}>{order.id}</Text>
                <Text style={styles.itemMeta}>
                  {order.customerName} | {order.total} | {order.status.replaceAll('_', ' ')}
                </Text>
              </View>
              <Pressable style={styles.miniButton} onPress={() => onAdvanceOrderStatus(order.id)}>
                <Text style={styles.miniButtonText}>Advance status</Text>
              </Pressable>
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
  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: ADMIN_COLORS.border,
    backgroundColor: ADMIN_COLORS.surface,
    padding: 12,
    gap: 8,
  },
  cardTitle: {
    fontFamily: 'LeagueSpartan_700Bold',
    fontSize: 15,
    color: ADMIN_COLORS.ink,
  },
  featureRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(21, 21, 21, 0.06)',
  },
  featureTextWrap: {
    flex: 1,
    gap: 2,
  },
  featureTitle: {
    fontFamily: 'LeagueSpartan_600SemiBold',
    fontSize: 13,
    color: ADMIN_COLORS.ink,
  },
  featureDesc: {
    fontFamily: 'LeagueSpartan_400Regular',
    fontSize: 11,
    color: ADMIN_COLORS.muted,
  },
  toggleButton: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: ADMIN_COLORS.border,
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
  },
  toggleButtonOn: {
    backgroundColor: ADMIN_COLORS.ink,
    borderColor: ADMIN_COLORS.ink,
  },
  toggleButtonText: {
    fontFamily: 'LeagueSpartan_600SemiBold',
    fontSize: 11,
    color: ADMIN_COLORS.ink,
  },
  toggleButtonTextOn: {
    color: '#FFFFFF',
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
  multilineInput: {
    minHeight: 76,
    textAlignVertical: 'top',
  },
  primaryButton: {
    borderRadius: 12,
    backgroundColor: ADMIN_COLORS.ink,
    paddingVertical: 10,
    paddingHorizontal: 14,
    alignSelf: 'flex-start',
  },
  primaryButtonText: {
    fontFamily: 'LeagueSpartan_700Bold',
    fontSize: 13,
    color: '#FFFFFF',
  },
  itemRow: {
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(21, 21, 21, 0.06)',
    gap: 8,
  },
  orderRow: {
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(21, 21, 21, 0.06)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  itemTextWrap: {
    flex: 1,
    gap: 2,
  },
  itemTitle: {
    fontFamily: 'LeagueSpartan_700Bold',
    fontSize: 13,
    color: ADMIN_COLORS.ink,
  },
  itemMeta: {
    fontFamily: 'LeagueSpartan_400Regular',
    fontSize: 11,
    color: ADMIN_COLORS.muted,
  },
  itemActionWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  miniButton: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: ADMIN_COLORS.border,
    backgroundColor: '#FFFFFF',
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  miniButtonText: {
    fontFamily: 'LeagueSpartan_600SemiBold',
    fontSize: 11,
    color: ADMIN_COLORS.ink,
  },
  miniButtonDanger: {
    borderColor: 'rgba(242, 75, 61, 0.35)',
    backgroundColor: 'rgba(242, 75, 61, 0.1)',
  },
  miniButtonDangerText: {
    color: ADMIN_COLORS.red,
  },
  choiceRow: {
    flexDirection: 'row',
    gap: 8,
  },
  choice: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: ADMIN_COLORS.border,
    backgroundColor: '#FFFFFF',
    paddingVertical: 7,
    paddingHorizontal: 12,
  },
  choiceActive: {
    backgroundColor: ADMIN_COLORS.ink,
    borderColor: ADMIN_COLORS.ink,
  },
  choiceText: {
    fontFamily: 'LeagueSpartan_600SemiBold',
    fontSize: 12,
    color: ADMIN_COLORS.ink,
  },
  choiceTextActive: {
    color: '#FFFFFF',
  },
  emptyText: {
    fontFamily: 'LeagueSpartan_400Regular',
    fontSize: 12,
    color: ADMIN_COLORS.muted,
  },
});

