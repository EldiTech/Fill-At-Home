import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SvgXml } from 'react-native-svg';
import {
  COLORS,
  NAV_BAR_DIMENSIONS,
  NAV_ICON_WRAP_DIMENSIONS,
  NAV_ICON_XML,
  NAV_ITEMS,
  NAV_ITEM_DIMENSIONS,
  NAV_TYPOGRAPHY,
} from '../constants';

type NavKey = (typeof NAV_ITEMS)[number]['key'];

type BottomNavBarProps = {
  activeKey: NavKey;
  onNavigate?: (key: NavKey) => void;
};

export default function BottomNavBar({ activeKey, onNavigate }: BottomNavBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.navBar, { bottom: insets.bottom + 8 }]}>
      {NAV_ITEMS.map((item) => {
        const isActive = item.key === activeKey;
        return (
          <Pressable
            key={item.key}
            style={[
              styles.navItem,
              isActive && [
                styles.navItemActive,
                { backgroundColor: item.tone, borderColor: item.color },
              ],
            ]}
            onPress={() => onNavigate?.(item.key as NavKey)}
          >
            <View style={styles.navIconWrap}>
              <SvgXml
                xml={NAV_ICON_XML[item.key as keyof typeof NAV_ICON_XML]}
                width={24}
                height={24}
                color={isActive ? item.color : COLORS.softInk}
              />
            </View>
            <Text style={[styles.navText, isActive && styles.navTextActive]}>{item.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  navBar: {
    position: 'absolute',
    left: NAV_BAR_DIMENSIONS.left,
    right: NAV_BAR_DIMENSIONS.right,
    flexDirection: 'row',
    alignItems: 'center',
    gap: NAV_BAR_DIMENSIONS.gap,
    paddingHorizontal: NAV_BAR_DIMENSIONS.paddingHorizontal,
    paddingVertical: NAV_BAR_DIMENSIONS.paddingVertical,
    borderRadius: NAV_BAR_DIMENSIONS.borderRadius,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(21, 21, 21, 0.08)',
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: NAV_ITEM_DIMENSIONS.paddingVertical,
    borderRadius: NAV_ITEM_DIMENSIONS.borderRadius,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  navItemActive: {
    borderWidth: 1,
  },
  navIconWrap: {
    width: NAV_ICON_WRAP_DIMENSIONS.width,
    height: NAV_ICON_WRAP_DIMENSIONS.height,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: NAV_ICON_WRAP_DIMENSIONS.borderRadius,
  },
  navText: {
    fontFamily: NAV_TYPOGRAPHY.label.fontFamily,
    fontSize: NAV_TYPOGRAPHY.label.fontSize,
    letterSpacing: NAV_TYPOGRAPHY.label.letterSpacing,
    textTransform: NAV_TYPOGRAPHY.label.textTransform,
    color: COLORS.softInk,
    marginTop: NAV_TYPOGRAPHY.label.marginTop,
  },
  navTextActive: {
    color: COLORS.ink,
  },
});
