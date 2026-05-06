import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { ADMIN_COLORS } from '../theme';
import {
  AdminMember,
  AdminRole,
  AuditLog,
  NewAdminMemberInput,
  RolePermissionMap,
} from '../types';

type SettingsRolesScreenProps = {
  adminMembers: AdminMember[];
  selectedRole: AdminRole;
  rolePermissions: RolePermissionMap;
  auditLogs: AuditLog[];
  onSelectRole: (role: AdminRole) => void;
  onTogglePermission: (role: AdminRole, permissionKey: string) => void;
  onCreateAdminMember: (payload: NewAdminMemberInput) => void;
  onUpdateAdminMemberRole: (memberId: string, role: AdminRole) => void;
  onToggleAdminMemberStatus: (memberId: string) => void;
  onDeleteAdminMember: (memberId: string) => void;
};

const ROLES: AdminRole[] = [
  'super_admin',
  'operations_admin',
  'content_admin',
  'support_admin',
  'viewer',
];

export default function SettingsRolesScreen({
  adminMembers,
  selectedRole,
  rolePermissions,
  auditLogs,
  onSelectRole,
  onTogglePermission,
  onCreateAdminMember,
  onUpdateAdminMemberRole,
  onToggleAdminMemberStatus,
  onDeleteAdminMember,
}: SettingsRolesScreenProps) {
  const [memberName, setMemberName] = useState('');
  const [memberEmail, setMemberEmail] = useState('');
  const [memberRole, setMemberRole] = useState<AdminRole>('viewer');

  const activePermissions = rolePermissions[selectedRole];
  const activeMemberCount = useMemo(
    () => adminMembers.filter((member) => member.status === 'active').length,
    [adminMembers]
  );

  const addMember = () => {
    const payload: NewAdminMemberInput = {
      name: memberName.trim(),
      email: memberEmail.trim(),
      role: memberRole,
    };
    if (!payload.name || !payload.email) {
      return;
    }
    onCreateAdminMember(payload);
    setMemberName('');
    setMemberEmail('');
    setMemberRole('viewer');
  };

  return (
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <Text style={styles.sectionTitle}>System Settings & Role Management</Text>
      <Text style={styles.sectionSubtitle}>
        Configure admin access, permission scope, and governance logs.
      </Text>

      <View style={styles.summaryRow}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Total Admin Members</Text>
          <Text style={styles.summaryValue}>{adminMembers.length}</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Active Admin Members</Text>
          <Text style={styles.summaryValue}>{activeMemberCount}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Admin Accounts</Text>
        <TextInput
          style={styles.input}
          value={memberName}
          onChangeText={setMemberName}
          placeholder="Admin name"
          placeholderTextColor={ADMIN_COLORS.muted}
        />
        <TextInput
          style={styles.input}
          value={memberEmail}
          onChangeText={setMemberEmail}
          placeholder="Admin email"
          placeholderTextColor={ADMIN_COLORS.muted}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <View style={styles.choiceRow}>
          {ROLES.map((role) => {
            const active = memberRole === role;
            return (
              <Pressable
                key={role}
                style={[styles.choice, active && styles.choiceActive]}
                onPress={() => setMemberRole(role)}
              >
                <Text style={[styles.choiceText, active && styles.choiceTextActive]}>{role}</Text>
              </Pressable>
            );
          })}
        </View>

        <Pressable style={styles.primaryButton} onPress={addMember}>
          <Text style={styles.primaryButtonText}>Add admin member</Text>
        </Pressable>

        {adminMembers.map((member) => (
          <View key={member.id} style={styles.memberRow}>
            <View style={styles.memberInfo}>
              <Text style={styles.memberName}>{member.name}</Text>
              <Text style={styles.memberMeta}>
                {member.email} | {member.role}
              </Text>
            </View>
            <View style={styles.memberActions}>
              <Pressable
                style={styles.miniButton}
                onPress={() =>
                  onUpdateAdminMemberRole(
                    member.id,
                    ROLES[(ROLES.indexOf(member.role) + 1) % ROLES.length]
                  )
                }
              >
                <Text style={styles.miniButtonText}>Cycle role</Text>
              </Pressable>
              <Pressable
                style={styles.miniButton}
                onPress={() => onToggleAdminMemberStatus(member.id)}
              >
                <Text style={styles.miniButtonText}>
                  {member.status === 'active' ? 'Disable' : 'Enable'}
                </Text>
              </Pressable>
              <Pressable
                style={[styles.miniButton, styles.miniButtonDanger]}
                onPress={() => onDeleteAdminMember(member.id)}
              >
                <Text style={[styles.miniButtonText, styles.miniButtonDangerText]}>Delete</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Role Permission Matrix</Text>
        <View style={styles.choiceRow}>
          {ROLES.map((role) => {
            const active = selectedRole === role;
            return (
              <Pressable
                key={role}
                style={[styles.choice, active && styles.choiceActive]}
                onPress={() => onSelectRole(role)}
              >
                <Text style={[styles.choiceText, active && styles.choiceTextActive]}>{role}</Text>
              </Pressable>
            );
          })}
        </View>

        {activePermissions.map((permission) => (
          <View key={permission.key} style={styles.permissionRow}>
            <Text style={styles.permissionLabel}>{permission.label}</Text>
            <Pressable
              style={[styles.toggleButton, permission.enabled && styles.toggleButtonOn]}
              onPress={() => onTogglePermission(selectedRole, permission.key)}
            >
              <Text style={[styles.toggleButtonText, permission.enabled && styles.toggleButtonTextOn]}>
                {permission.enabled ? 'Allowed' : 'Blocked'}
              </Text>
            </Pressable>
          </View>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Audit Log</Text>
        {auditLogs.length === 0 ? (
          <Text style={styles.emptyText}>No logs yet.</Text>
        ) : (
          auditLogs.slice(0, 16).map((log) => (
            <View key={log.id} style={styles.logRow}>
              <Text style={styles.logAction}>{log.action}</Text>
              <Text style={styles.logDetail}>{log.detail}</Text>
              <Text style={styles.logTimestamp}>{log.timestamp}</Text>
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
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  summaryCard: {
    width: '48%',
    borderRadius: 14,
    padding: 12,
    backgroundColor: ADMIN_COLORS.surface,
    borderWidth: 1,
    borderColor: ADMIN_COLORS.border,
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
    gap: 8,
  },
  cardTitle: {
    fontFamily: 'LeagueSpartan_700Bold',
    fontSize: 15,
    color: ADMIN_COLORS.ink,
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
  choiceRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  choice: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: ADMIN_COLORS.border,
    backgroundColor: '#FFFFFF',
    paddingVertical: 7,
    paddingHorizontal: 10,
  },
  choiceActive: {
    backgroundColor: ADMIN_COLORS.ink,
    borderColor: ADMIN_COLORS.ink,
  },
  choiceText: {
    fontFamily: 'LeagueSpartan_600SemiBold',
    fontSize: 11,
    color: ADMIN_COLORS.ink,
    textTransform: 'capitalize',
  },
  choiceTextActive: {
    color: '#FFFFFF',
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
  memberRow: {
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(21, 21, 21, 0.06)',
    gap: 8,
  },
  memberInfo: {
    gap: 2,
  },
  memberName: {
    fontFamily: 'LeagueSpartan_700Bold',
    fontSize: 13,
    color: ADMIN_COLORS.ink,
  },
  memberMeta: {
    fontFamily: 'LeagueSpartan_400Regular',
    fontSize: 11,
    color: ADMIN_COLORS.muted,
  },
  memberActions: {
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
  permissionRow: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(21, 21, 21, 0.06)',
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  permissionLabel: {
    flex: 1,
    fontFamily: 'LeagueSpartan_500Medium',
    fontSize: 12,
    color: ADMIN_COLORS.ink,
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
  logRow: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(21, 21, 21, 0.06)',
    paddingTop: 10,
    gap: 2,
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
  },
  logTimestamp: {
    fontFamily: 'LeagueSpartan_400Regular',
    fontSize: 10,
    color: ADMIN_COLORS.muted,
    marginTop: 3,
  },
  emptyText: {
    fontFamily: 'LeagueSpartan_400Regular',
    fontSize: 12,
    color: ADMIN_COLORS.muted,
  },
});

