export type AdminModuleKey =
  | 'dashboard'
  | 'users'
  | 'core'
  | 'reports'
  | 'notifications'
  | 'settings';

export type UserStatus = 'active' | 'suspended' | 'deactivated';
export type MenuItemStatus = 'published' | 'draft';
export type CateringPackageStatus = 'published' | 'draft';
export type OrderStatus =
  | 'new'
  | 'confirmed'
  | 'preparing'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled';
export type AnnouncementStatus = 'draft' | 'scheduled' | 'published' | 'archived';
export type AnnouncementAudience = 'all-users' | 'active-users' | 'vip-clients';
export type AdminRole =
  | 'super_admin'
  | 'operations_admin'
  | 'content_admin'
  | 'support_admin'
  | 'viewer';
export type AdminMemberStatus = 'active' | 'disabled';

export type PermissionKey =
  | 'dashboard:view'
  | 'users:manage'
  | 'menu:manage'
  | 'catering:manage'
  | 'orders:manage'
  | 'reports:view'
  | 'notifications:publish'
  | 'settings:manage'
  | 'roles:manage';

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: UserStatus;
  totalOrders: number;
  lastOrderDate: string;
}

export interface MenuItemRecord {
  id: string;
  name: string;
  category: string;
  tags: string[];
  priceRange: string;
  status: MenuItemStatus;
  featured: boolean;
}

export interface CateringPackageRecord {
  id: string;
  name: string;
  tier: 'Basic' | 'Premium';
  basePrice: string;
  status: CateringPackageStatus;
  inquiries: number;
  description: string;
}

export interface OrderRecord {
  id: string;
  customerName: string;
  itemCount: number;
  total: string;
  status: OrderStatus;
  createdAt: string;
}

export interface AnnouncementRecord {
  id: string;
  title: string;
  message: string;
  audience: AnnouncementAudience;
  status: AnnouncementStatus;
  scheduledAt?: string;
  createdAt: string;
}

export interface CoreFeatureControl {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

export interface RolePermissionSetting {
  key: PermissionKey;
  label: string;
  enabled: boolean;
}

export type RolePermissionMap = Record<AdminRole, RolePermissionSetting[]>;

export interface AdminMember {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  status: AdminMemberStatus;
}

export interface AuditLog {
  id: string;
  action: string;
  detail: string;
  timestamp: string;
}

export interface AdminAnalyticsSnapshot {
  totalUsers: number;
  activeUsers: number;
  openOrders: number;
  publishedMenuItems: number;
  publishedPackages: number;
  publishedAnnouncements: number;
}

export type NewUserInput = Pick<UserRecord, 'name' | 'email' | 'phone'>;

export interface NewMenuItemInput {
  name: string;
  category: string;
  tags: string[];
  priceRange: string;
}

export interface NewCateringPackageInput {
  name: string;
  tier: 'Basic' | 'Premium';
  basePrice: string;
  description: string;
}

export interface NewAnnouncementInput {
  title: string;
  message: string;
  audience: AnnouncementAudience;
  scheduledAt?: string;
}

export interface NewAdminMemberInput {
  name: string;
  email: string;
  role: AdminRole;
}

