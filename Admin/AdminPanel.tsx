import { useMemo, useState } from 'react';
import AdminShell from './components/AdminShell';
import CoreModuleManagementScreen from './modules/CoreModuleManagementScreen';
import DashboardScreen from './modules/DashboardScreen';
import NotificationsScreen from './modules/NotificationsScreen';
import ReportsScreen from './modules/ReportsScreen';
import SettingsRolesScreen from './modules/SettingsRolesScreen';
import UserManagementScreen from './modules/UserManagementScreen';
import {
  AdminMember,
  AdminModuleKey,
  AdminRole,
  AnnouncementRecord,
  AnnouncementStatus,
  AuditLog,
  CateringPackageRecord,
  CoreFeatureControl,
  MenuItemRecord,
  NewAdminMemberInput,
  NewAnnouncementInput,
  NewCateringPackageInput,
  NewMenuItemInput,
  NewUserInput,
  OrderRecord,
  RolePermissionMap,
  UserRecord,
} from './types';

type AdminPanelProps = {
  onSignOut: () => void;
};

const ORDER_FLOW: OrderRecord['status'][] = [
  'new',
  'confirmed',
  'preparing',
  'out_for_delivery',
  'delivered',
];

function createId(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

function initialRolePermissions(): RolePermissionMap {
  return {
    super_admin: [
      { key: 'dashboard:view', label: 'View dashboard', enabled: true },
      { key: 'users:manage', label: 'Manage users', enabled: true },
      { key: 'menu:manage', label: 'Manage menu', enabled: true },
      { key: 'catering:manage', label: 'Manage catering packages', enabled: true },
      { key: 'orders:manage', label: 'Manage orders', enabled: true },
      { key: 'reports:view', label: 'View reports', enabled: true },
      { key: 'notifications:publish', label: 'Publish announcements', enabled: true },
      { key: 'settings:manage', label: 'Manage system settings', enabled: true },
      { key: 'roles:manage', label: 'Manage roles & permissions', enabled: true },
    ],
    operations_admin: [
      { key: 'dashboard:view', label: 'View dashboard', enabled: true },
      { key: 'users:manage', label: 'Manage users', enabled: true },
      { key: 'menu:manage', label: 'Manage menu', enabled: false },
      { key: 'catering:manage', label: 'Manage catering packages', enabled: true },
      { key: 'orders:manage', label: 'Manage orders', enabled: true },
      { key: 'reports:view', label: 'View reports', enabled: true },
      { key: 'notifications:publish', label: 'Publish announcements', enabled: false },
      { key: 'settings:manage', label: 'Manage system settings', enabled: false },
      { key: 'roles:manage', label: 'Manage roles & permissions', enabled: false },
    ],
    content_admin: [
      { key: 'dashboard:view', label: 'View dashboard', enabled: true },
      { key: 'users:manage', label: 'Manage users', enabled: false },
      { key: 'menu:manage', label: 'Manage menu', enabled: true },
      { key: 'catering:manage', label: 'Manage catering packages', enabled: true },
      { key: 'orders:manage', label: 'Manage orders', enabled: false },
      { key: 'reports:view', label: 'View reports', enabled: true },
      { key: 'notifications:publish', label: 'Publish announcements', enabled: true },
      { key: 'settings:manage', label: 'Manage system settings', enabled: false },
      { key: 'roles:manage', label: 'Manage roles & permissions', enabled: false },
    ],
    support_admin: [
      { key: 'dashboard:view', label: 'View dashboard', enabled: true },
      { key: 'users:manage', label: 'Manage users', enabled: true },
      { key: 'menu:manage', label: 'Manage menu', enabled: false },
      { key: 'catering:manage', label: 'Manage catering packages', enabled: false },
      { key: 'orders:manage', label: 'Manage orders', enabled: true },
      { key: 'reports:view', label: 'View reports', enabled: true },
      { key: 'notifications:publish', label: 'Publish announcements', enabled: true },
      { key: 'settings:manage', label: 'Manage system settings', enabled: false },
      { key: 'roles:manage', label: 'Manage roles & permissions', enabled: false },
    ],
    viewer: [
      { key: 'dashboard:view', label: 'View dashboard', enabled: true },
      { key: 'users:manage', label: 'Manage users', enabled: false },
      { key: 'menu:manage', label: 'Manage menu', enabled: false },
      { key: 'catering:manage', label: 'Manage catering packages', enabled: false },
      { key: 'orders:manage', label: 'Manage orders', enabled: false },
      { key: 'reports:view', label: 'View reports', enabled: true },
      { key: 'notifications:publish', label: 'Publish announcements', enabled: false },
      { key: 'settings:manage', label: 'Manage system settings', enabled: false },
      { key: 'roles:manage', label: 'Manage roles & permissions', enabled: false },
    ],
  };
}

export default function AdminPanel({ onSignOut }: AdminPanelProps) {
  const [activeModule, setActiveModule] = useState<AdminModuleKey>('dashboard');

  const [users, setUsers] = useState<UserRecord[]>([
    {
      id: 'USR-001',
      name: 'Gabriel Aquino',
      email: 'gabriel.aquino@email.com',
      phone: '0917-200-1021',
      status: 'active',
      totalOrders: 12,
      lastOrderDate: '2026-05-02',
    },
    {
      id: 'USR-002',
      name: 'Leah Santos',
      email: 'leah.santos@email.com',
      phone: '0917-444-6712',
      status: 'suspended',
      totalOrders: 4,
      lastOrderDate: '2026-04-20',
    },
    {
      id: 'USR-003',
      name: 'Marco Reyes',
      email: 'marco.reyes@email.com',
      phone: '0917-123-9920',
      status: 'active',
      totalOrders: 8,
      lastOrderDate: '2026-05-05',
    },
  ]);

  const [menuItems, setMenuItems] = useState<MenuItemRecord[]>([
    {
      id: 'MNU-001',
      name: 'Lemon Herb Roasted Fish',
      category: 'Seafood',
      tags: ['Light', 'Citrus'],
      priceRange: 'PHP 1,800 - 2,200',
      status: 'published',
      featured: true,
    },
    {
      id: 'MNU-002',
      name: 'Beef Caldereta',
      category: 'Beef',
      tags: ['Rich', 'Slow-braised'],
      priceRange: 'PHP 1,600 - 2,000',
      status: 'published',
      featured: true,
    },
    {
      id: 'MNU-003',
      name: 'Halo-Halo Bar',
      category: 'Desserts',
      tags: ['Interactive', 'Dessert'],
      priceRange: 'PHP 1,200 - 1,700',
      status: 'draft',
      featured: false,
    },
  ]);

  const [cateringPackages, setCateringPackages] = useState<CateringPackageRecord[]>([
    {
      id: 'PKG-001',
      name: 'Celebration Banquet Table',
      tier: 'Premium',
      basePrice: 'PHP 18,000',
      status: 'published',
      inquiries: 24,
      description: 'Full table styling with warm service for milestone events.',
    },
    {
      id: 'PKG-002',
      name: 'Celebration Garden Table',
      tier: 'Premium',
      basePrice: 'PHP 15,500',
      status: 'published',
      inquiries: 16,
      description: 'Garden-inspired decor package for semi-outdoor gatherings.',
    },
    {
      id: 'PKG-003',
      name: 'Corporate Lunch Setup',
      tier: 'Basic',
      basePrice: 'PHP 8,500',
      status: 'draft',
      inquiries: 7,
      description: 'Quick corporate service package for meetings and office events.',
    },
  ]);

  const [orders, setOrders] = useState<OrderRecord[]>([
    {
      id: 'ORD-1102',
      customerName: 'Gabriel Aquino',
      itemCount: 6,
      total: 'PHP 9,420',
      status: 'confirmed',
      createdAt: '2026-05-06 08:22',
    },
    {
      id: 'ORD-1103',
      customerName: 'Marco Reyes',
      itemCount: 4,
      total: 'PHP 6,580',
      status: 'preparing',
      createdAt: '2026-05-06 09:10',
    },
    {
      id: 'ORD-1104',
      customerName: 'Leah Santos',
      itemCount: 10,
      total: 'PHP 15,900',
      status: 'new',
      createdAt: '2026-05-06 10:01',
    },
  ]);

  const [announcements, setAnnouncements] = useState<AnnouncementRecord[]>([
    {
      id: 'ANN-001',
      title: "Mother's Day Package Slots Open",
      message: 'Reserve early for guaranteed delivery windows this weekend.',
      audience: 'all-users',
      status: 'published',
      createdAt: '2026-05-04 13:20',
    },
    {
      id: 'ANN-002',
      title: 'Premium Menu Preview',
      message: 'VIP users can now access the June premium set menu.',
      audience: 'vip-clients',
      status: 'scheduled',
      scheduledAt: '2026-05-12 09:00',
      createdAt: '2026-05-05 15:10',
    },
  ]);

  const [coreFeatures, setCoreFeatures] = useState<CoreFeatureControl[]>([
    {
      id: 'home-featured',
      label: 'User Home Featured Trays',
      description: 'Controls featured tray visibility on User/Home.',
      enabled: true,
    },
    {
      id: 'settings-personal',
      label: 'Personal Info Editing',
      description: 'Controls access to User/Sub Settings/PersonalInfoScreen.',
      enabled: true,
    },
    {
      id: 'settings-address',
      label: 'Delivery Address Management',
      description: 'Controls access to User/Sub Settings/DeliveryAddressScreen.',
      enabled: true,
    },
    {
      id: 'settings-payment',
      label: 'Payment Method Management',
      description: 'Controls access to User/Sub Settings/PaymentMethodsScreen.',
      enabled: true,
    },
    {
      id: 'chefbot',
      label: 'ChefBot Access',
      description: 'Controls availability of User/Sub Settings/ChefBot.',
      enabled: true,
    },
    {
      id: 'terms-privacy',
      label: 'Terms & Privacy Modal',
      description: 'Controls policy display from User/settings.',
      enabled: true,
    },
  ]);

  const [adminMembers, setAdminMembers] = useState<AdminMember[]>([
    {
      id: 'ADM-001',
      name: 'Luis Espino',
      email: 'luis.espino@fillathome.com',
      role: 'super_admin',
      status: 'active',
    },
    {
      id: 'ADM-002',
      name: 'Monica Cruz',
      email: 'monica.cruz@fillathome.com',
      role: 'operations_admin',
      status: 'active',
    },
    {
      id: 'ADM-003',
      name: 'Paolo Ramos',
      email: 'paolo.ramos@fillathome.com',
      role: 'content_admin',
      status: 'disabled',
    },
  ]);

  const [selectedRole, setSelectedRole] = useState<AdminRole>('super_admin');
  const [rolePermissions, setRolePermissions] = useState<RolePermissionMap>(initialRolePermissions);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([
    {
      id: 'LOG-001',
      action: 'System',
      detail: 'Admin panel initialized.',
      timestamp: '2026-05-06 14:18',
    },
  ]);

  const pushAuditLog = (action: string, detail: string) => {
    const timestamp = new Date().toLocaleString();
    const log: AuditLog = {
      id: createId('LOG'),
      action,
      detail,
      timestamp,
    };
    setAuditLogs((previous) => [log, ...previous].slice(0, 120));
  };

  const analytics = useMemo(
    () => ({
      totalUsers: users.length,
      activeUsers: users.filter((user) => user.status === 'active').length,
      openOrders: orders.filter((order) => order.status !== 'delivered' && order.status !== 'cancelled')
        .length,
      publishedMenuItems: menuItems.filter((item) => item.status === 'published').length,
      publishedPackages: cateringPackages.filter((item) => item.status === 'published').length,
      publishedAnnouncements: announcements.filter((item) => item.status === 'published').length,
    }),
    [announcements, cateringPackages, menuItems, orders, users]
  );

  const createUser = (payload: NewUserInput) => {
    const createdUser: UserRecord = {
      id: createId('USR').toUpperCase(),
      ...payload,
      status: 'active',
      totalOrders: 0,
      lastOrderDate: 'N/A',
    };
    setUsers((previous) => [createdUser, ...previous]);
    pushAuditLog('User Created', `${createdUser.name} was added.`);
  };

  const updateUser = (userId: string, payload: NewUserInput) => {
    setUsers((previous) =>
      previous.map((user) => (user.id === userId ? { ...user, ...payload } : user))
    );
    pushAuditLog('User Updated', `User ${userId} profile details were updated.`);
  };

  const updateUserStatus = (userId: string, status: UserRecord['status']) => {
    setUsers((previous) =>
      previous.map((user) => (user.id === userId ? { ...user, status } : user))
    );
    pushAuditLog('User Status Updated', `User ${userId} status set to ${status}.`);
  };

  const deleteUser = (userId: string) => {
    setUsers((previous) => previous.filter((user) => user.id !== userId));
    pushAuditLog('User Deleted', `User ${userId} was removed from records.`);
  };

  const createMenuItem = (payload: NewMenuItemInput) => {
    const record: MenuItemRecord = {
      id: createId('MNU').toUpperCase(),
      name: payload.name,
      category: payload.category,
      tags: payload.tags,
      priceRange: payload.priceRange,
      status: 'draft',
      featured: false,
    };
    setMenuItems((previous) => [record, ...previous]);
    pushAuditLog('Menu Item Created', `${record.name} was added as draft.`);
  };

  const toggleMenuPublish = (menuItemId: string) => {
    setMenuItems((previous) =>
      previous.map((item) =>
        item.id === menuItemId
          ? { ...item, status: item.status === 'published' ? 'draft' : 'published' }
          : item
      )
    );
    pushAuditLog('Menu Publish Toggled', `Menu item ${menuItemId} publish state changed.`);
  };

  const toggleMenuFeatured = (menuItemId: string) => {
    setMenuItems((previous) =>
      previous.map((item) => (item.id === menuItemId ? { ...item, featured: !item.featured } : item))
    );
    pushAuditLog('Menu Featured Toggled', `Menu item ${menuItemId} featured flag changed.`);
  };

  const deleteMenuItem = (menuItemId: string) => {
    setMenuItems((previous) => previous.filter((item) => item.id !== menuItemId));
    pushAuditLog('Menu Item Deleted', `Menu item ${menuItemId} deleted.`);
  };

  const createCateringPackage = (payload: NewCateringPackageInput) => {
    const record: CateringPackageRecord = {
      id: createId('PKG').toUpperCase(),
      name: payload.name,
      tier: payload.tier,
      basePrice: payload.basePrice,
      status: 'draft',
      inquiries: 0,
      description: payload.description,
    };
    setCateringPackages((previous) => [record, ...previous]);
    pushAuditLog('Catering Package Created', `${record.name} was added as draft.`);
  };

  const toggleCateringPackagePublish = (packageId: string) => {
    setCateringPackages((previous) =>
      previous.map((pkg) =>
        pkg.id === packageId
          ? { ...pkg, status: pkg.status === 'published' ? 'draft' : 'published' }
          : pkg
      )
    );
    pushAuditLog('Catering Package Toggled', `Package ${packageId} publish state changed.`);
  };

  const deleteCateringPackage = (packageId: string) => {
    setCateringPackages((previous) => previous.filter((pkg) => pkg.id !== packageId));
    pushAuditLog('Catering Package Deleted', `Package ${packageId} deleted.`);
  };

  const advanceOrderStatus = (orderId: string) => {
    setOrders((previous) =>
      previous.map((order) => {
        if (order.id !== orderId || order.status === 'cancelled') {
          return order;
        }
        const index = ORDER_FLOW.indexOf(order.status);
        if (index === -1 || index === ORDER_FLOW.length - 1) {
          return order;
        }
        return { ...order, status: ORDER_FLOW[index + 1] };
      })
    );
    pushAuditLog('Order Progressed', `Order ${orderId} moved to the next status.`);
  };

  const toggleCoreFeature = (featureId: string) => {
    setCoreFeatures((previous) =>
      previous.map((feature) =>
        feature.id === featureId ? { ...feature, enabled: !feature.enabled } : feature
      )
    );
    pushAuditLog('Core Feature Toggled', `Feature ${featureId} was toggled.`);
  };

  const createAnnouncement = (payload: NewAnnouncementInput) => {
    const status: AnnouncementStatus = payload.scheduledAt ? 'scheduled' : 'draft';
    const record: AnnouncementRecord = {
      id: createId('ANN').toUpperCase(),
      title: payload.title,
      message: payload.message,
      audience: payload.audience,
      status,
      scheduledAt: payload.scheduledAt,
      createdAt: new Date().toLocaleString(),
    };
    setAnnouncements((previous) => [record, ...previous]);
    pushAuditLog('Announcement Created', `${record.title} was created (${status}).`);
  };

  const updateAnnouncementStatus = (announcementId: string, status: AnnouncementStatus) => {
    setAnnouncements((previous) =>
      previous.map((announcement) =>
        announcement.id === announcementId ? { ...announcement, status } : announcement
      )
    );
    pushAuditLog(
      'Announcement Status Updated',
      `Announcement ${announcementId} status changed to ${status}.`
    );
  };

  const deleteAnnouncement = (announcementId: string) => {
    setAnnouncements((previous) => previous.filter((item) => item.id !== announcementId));
    pushAuditLog('Announcement Deleted', `Announcement ${announcementId} was deleted.`);
  };

  const createAdminMember = (payload: NewAdminMemberInput) => {
    const member: AdminMember = {
      id: createId('ADM').toUpperCase(),
      name: payload.name,
      email: payload.email,
      role: payload.role,
      status: 'active',
    };
    setAdminMembers((previous) => [member, ...previous]);
    pushAuditLog('Admin Added', `${member.name} added as ${member.role}.`);
  };

  const updateAdminMemberRole = (memberId: string, role: AdminRole) => {
    setAdminMembers((previous) =>
      previous.map((member) => (member.id === memberId ? { ...member, role } : member))
    );
    pushAuditLog('Admin Role Updated', `Admin ${memberId} role changed to ${role}.`);
  };

  const toggleAdminMemberStatus = (memberId: string) => {
    setAdminMembers((previous) =>
      previous.map((member) =>
        member.id === memberId
          ? { ...member, status: member.status === 'active' ? 'disabled' : 'active' }
          : member
      )
    );
    pushAuditLog('Admin Status Updated', `Admin ${memberId} status was toggled.`);
  };

  const deleteAdminMember = (memberId: string) => {
    setAdminMembers((previous) => previous.filter((member) => member.id !== memberId));
    pushAuditLog('Admin Deleted', `Admin ${memberId} was deleted.`);
  };

  const togglePermission = (role: AdminRole, permissionKey: string) => {
    setRolePermissions((previous) => ({
      ...previous,
      [role]: previous[role].map((permission) =>
        permission.key === permissionKey
          ? { ...permission, enabled: !permission.enabled }
          : permission
      ),
    }));
    pushAuditLog('Permission Updated', `Permission ${permissionKey} toggled for ${role}.`);
  };

  const renderModule = () => {
    if (activeModule === 'dashboard') {
      return (
        <DashboardScreen
          analytics={analytics}
          recentOrders={orders}
          recentAuditLogs={auditLogs}
          onOpenModule={setActiveModule}
        />
      );
    }

    if (activeModule === 'users') {
      return (
        <UserManagementScreen
          users={users}
          onCreateUser={createUser}
          onUpdateUser={updateUser}
          onUpdateStatus={updateUserStatus}
          onDeleteUser={deleteUser}
        />
      );
    }

    if (activeModule === 'core') {
      return (
        <CoreModuleManagementScreen
          menuItems={menuItems}
          cateringPackages={cateringPackages}
          orders={orders}
          coreFeatures={coreFeatures}
          onCreateMenuItem={createMenuItem}
          onToggleMenuPublish={toggleMenuPublish}
          onToggleMenuFeatured={toggleMenuFeatured}
          onDeleteMenuItem={deleteMenuItem}
          onCreateCateringPackage={createCateringPackage}
          onToggleCateringPackagePublish={toggleCateringPackagePublish}
          onDeleteCateringPackage={deleteCateringPackage}
          onAdvanceOrderStatus={advanceOrderStatus}
          onToggleCoreFeature={toggleCoreFeature}
        />
      );
    }

    if (activeModule === 'reports') {
      return (
        <ReportsScreen
          analytics={analytics}
          users={users}
          orders={orders}
          menuItems={menuItems}
        />
      );
    }

    if (activeModule === 'notifications') {
      return (
        <NotificationsScreen
          announcements={announcements}
          onCreateAnnouncement={createAnnouncement}
          onUpdateAnnouncementStatus={updateAnnouncementStatus}
          onDeleteAnnouncement={deleteAnnouncement}
        />
      );
    }

    return (
      <SettingsRolesScreen
        adminMembers={adminMembers}
        selectedRole={selectedRole}
        rolePermissions={rolePermissions}
        auditLogs={auditLogs}
        onSelectRole={setSelectedRole}
        onTogglePermission={togglePermission}
        onCreateAdminMember={createAdminMember}
        onUpdateAdminMemberRole={updateAdminMemberRole}
        onToggleAdminMemberStatus={toggleAdminMemberStatus}
        onDeleteAdminMember={deleteAdminMember}
      />
    );
  };

  return (
    <AdminShell activeModule={activeModule} onChangeModule={setActiveModule} onSignOut={onSignOut}>
      {renderModule()}
    </AdminShell>
  );
}

