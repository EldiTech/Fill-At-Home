// Global Colors
export const COLORS = {
  orange: '#F4A23A',
  teal: '#2BB9A6',
  red: '#F24B3D',
  ink: '#151515',
  softInk: '#3E3A34',
  muted: '#6F665E',
  surface: '#FFFFFF',
  accent: '#C86A3A',
  accentSoft: '#F7E8DC',
  border: 'rgba(27, 26, 24, 0.08)',
  shadow: 'rgba(0, 0, 0, 0.04)',
  cream: '#FFF4EA',
  mint: '#E9FBF7',
  ivory: '#FBF6F0',
};

// Global SVG Icons
export const NOTIFICATION_ICON_XML =
  '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320 120q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80Zm-160-200h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z"/></svg>';

export const NAV_ICON_XML = {
  home:
    '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/></svg>',
  menu:
    '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M240-80q-33 0-56.5-23.5T160-160v-80h-40v-80h40v-120h-40v-80h40v-120h-40v-80h40v-80q0-33 23.5-56.5T240-880h480q33 0 56.5 23.5T800-800v640q0 33-23.5 56.5T720-80H240Zm0-80h480v-640H240v80h40v80h-40v120h40v80h-40v120h40v80h-40v80Zm0 0v-640 640Zm140-120h60v-160q26-7 43-28.5t17-48.5v-163h-40v151h-30v-151h-40v151h-30v-151h-40v163q0 27 17 48.5t43 28.5v160Zm220 0h60v-400q-50 0-85 35t-35 85v120h60v160Z"/></svg>',
  orders:
    '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="m691-150 139-138-42-42-97 95-39-39-42 43 81 81ZM240-600h480v-80H240v80ZM720-40q-83 0-141.5-58.5T520-240q0-83 58.5-141.5T720-440q83 0 141.5 58.5T920-240q0 83-58.5 141.5T720-40ZM120-80v-680q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v267q-19-9-39-15t-41-9v-243H200v562h243q5 31 15.5 59T486-86l-6 6-60-60-60 60-60-60-60 60-60-60-60 60Zm120-200h203q3-21 9-41t15-39H240v80Zm0-160h284q38-37 88.5-58.5T720-520H240v80Zm-40 242v-562 562Z"/></svg>',
  profile:
    '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M200-246q54-53 125.5-83.5T480-360q83 0 154.5 30.5T760-246v-514H200v514Zm379-235q41-41 41-99t-41-99q-41-41-99-41t-99 41q-41 41-41 99t41 99q41 41 99 41t99-41ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm69-80h422q-44-39-99.5-59.5T480-280q-56 0-112.5 20.5T269-200Zm168.5-337.5Q420-555 420-580t17.5-42.5Q455-640 480-640t42.5 17.5Q540-605 540-580t-17.5 42.5Q505-520 480-520t-42.5-17.5ZM480-503Z"/></svg>',
};

// Navigation Items
export const NAV_ITEMS = [
  {
    key: 'home',
    label: 'Home',
    color: COLORS.orange,
    tone: 'rgba(244, 162, 58, 0.18)',
  },
  {
    key: 'menu',
    label: 'Menu',
    color: COLORS.teal,
    tone: 'rgba(43, 185, 166, 0.18)',
  },
  {
    key: 'orders',
    label: 'Orders',
    color: COLORS.red,
    tone: 'rgba(242, 75, 61, 0.16)',
  },
  {
    key: 'profile',
    label: 'Profile',
    color: COLORS.ink,
    tone: 'rgba(21, 21, 21, 0.08)',
  },
];

// Header Dimensions & Spacing
export const HEADER_DIMENSIONS = {
  logoWidth: 60,
  logoHeight: 60,
  gap: 12,
  marginBottom: 18,
  notificationSize: 40,
  notificationBorderRadius: 20,
};

export const HEADER_TYPOGRAPHY = {
  title: {
    fontFamily: 'LeagueSpartan_700Bold',
    fontSize: 18,
    lineHeight: 22,
    color: COLORS.ink,
    textTransform: 'uppercase' as const,
  },
  subtitle: {
    fontFamily: 'LeagueSpartan_400Regular',
    fontSize: 10,
    letterSpacing: 0.8,
    color: COLORS.softInk,
    textTransform: 'uppercase' as const,
    marginTop: 2,
  },
};

// Navigation Bar Dimensions & Styling
export const NAV_BAR_DIMENSIONS = {
  gap: 8,
  paddingHorizontal: 10,
  paddingVertical: 10,
  borderRadius: 20,
  bottom: 14,
  left: 18,
  right: 18,
};

export const NAV_ITEM_DIMENSIONS = {
  borderRadius: 14,
  paddingVertical: 8,
};

export const NAV_ICON_WRAP_DIMENSIONS = {
  width: 28,
  height: 28,
  borderRadius: 10,
};

export const NAV_TYPOGRAPHY = {
  label: {
    fontFamily: 'LeagueSpartan_500Medium',
    fontSize: 10,
    letterSpacing: 0.8,
    textTransform: 'uppercase' as const,
    marginTop: 6,
  },
};

// Content Padding
export const CONTENT_PADDING = {
  paddingHorizontal: 24,
  paddingTop: 10,
  paddingBottom: 140,
  gap: 16,
};

// Reusable Header Style Object (for StyleSheet.create)
export const headerStyles = {
  heroHeader: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: HEADER_DIMENSIONS.gap,
    marginBottom: HEADER_DIMENSIONS.marginBottom,
  },
  logoLeft: {
    width: HEADER_DIMENSIONS.logoWidth,
    height: HEADER_DIMENSIONS.logoHeight,
  },
  heroTitleWrap: {
    flex: 1,
    justifyContent: 'center',
  },
  heroTitle: {
    fontFamily: 'LeagueSpartan_700Bold',
    fontSize: 18,
    lineHeight: 22,
    color: COLORS.ink,
    textTransform: 'uppercase',
  },
  heroSubtitle: {
    fontFamily: 'LeagueSpartan_400Regular',
    fontSize: 10,
    letterSpacing: 0.8,
    color: COLORS.softInk,
    textTransform: 'uppercase',
    marginTop: 2,
  },
  notificationButton: {
    width: HEADER_DIMENSIONS.notificationSize,
    height: HEADER_DIMENSIONS.notificationSize,
    borderRadius: HEADER_DIMENSIONS.notificationBorderRadius,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(21, 21, 21, 0.12)',
  },
};

// Reusable Navigation Bar Style Object (for StyleSheet.create)
export const navBarStyles = {
  navBar: {
    position: 'absolute',
    left: NAV_BAR_DIMENSIONS.left,
    right: NAV_BAR_DIMENSIONS.right,
    bottom: NAV_BAR_DIMENSIONS.bottom,
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
    fontFamily: 'LeagueSpartan_500Medium',
    fontSize: 10,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: COLORS.softInk,
    marginTop: 6,
  },
  navTextActive: {
    color: COLORS.ink,
  },
};
