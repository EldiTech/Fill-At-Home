import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { ADMIN_COLORS } from '../theme';
import { NewUserInput, UserRecord, UserStatus } from '../types';

type UserManagementScreenProps = {
  users: UserRecord[];
  onCreateUser: (payload: NewUserInput) => void;
  onUpdateUser: (userId: string, payload: NewUserInput) => void;
  onUpdateStatus: (userId: string, status: UserStatus) => void;
  onDeleteUser: (userId: string) => void;
};

const STATUS_OPTIONS: UserStatus[] = ['active', 'suspended', 'deactivated'];

export default function UserManagementScreen({
  users,
  onCreateUser,
  onUpdateUser,
  onUpdateStatus,
  onDeleteUser,
}: UserManagementScreenProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [editingUserId, setEditingUserId] = useState<string | null>(null);

  const actionLabel = editingUserId ? 'Save user changes' : 'Create user';

  const sortedUsers = useMemo(
    () =>
      [...users].sort((a, b) => {
        if (a.status !== b.status) {
          return a.status.localeCompare(b.status);
        }
        return b.totalOrders - a.totalOrders;
      }),
    [users]
  );

  const resetForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setEditingUserId(null);
  };

  const submit = () => {
    const payload: NewUserInput = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
    };

    if (!payload.name || !payload.email || !payload.phone) {
      return;
    }

    if (editingUserId) {
      onUpdateUser(editingUserId, payload);
    } else {
      onCreateUser(payload);
    }
    resetForm();
  };

  const startEdit = (user: UserRecord) => {
    setEditingUserId(user.id);
    setName(user.name);
    setEmail(user.email);
    setPhone(user.phone);
  };

  return (
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <Text style={styles.sectionTitle}>User Management</Text>
      <Text style={styles.sectionSubtitle}>
        Full customer CRUD and account status controls mirroring profile/address/payment features.
      </Text>

      <View style={styles.formCard}>
        <Text style={styles.formTitle}>
          {editingUserId ? 'Edit user' : 'Create user account'}
        </Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Full name"
          placeholderTextColor={ADMIN_COLORS.muted}
        />
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email address"
          placeholderTextColor={ADMIN_COLORS.muted}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          placeholder="Phone number"
          placeholderTextColor={ADMIN_COLORS.muted}
          keyboardType="phone-pad"
        />
        <View style={styles.formActionRow}>
          <Pressable style={styles.primaryButton} onPress={submit}>
            <Text style={styles.primaryButtonText}>{actionLabel}</Text>
          </Pressable>
          {editingUserId ? (
            <Pressable style={styles.secondaryButton} onPress={resetForm}>
              <Text style={styles.secondaryButtonText}>Cancel</Text>
            </Pressable>
          ) : null}
        </View>
      </View>

      <View style={styles.listCard}>
        {sortedUsers.map((user) => (
          <View key={user.id} style={styles.userRow}>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userMeta}>{user.email}</Text>
              <Text style={styles.userMeta}>
                {user.phone} | {user.totalOrders} orders | Last order: {user.lastOrderDate}
              </Text>
            </View>

            <View style={styles.statusWrap}>
              {STATUS_OPTIONS.map((status) => {
                const active = user.status === status;
                return (
                  <Pressable
                    key={status}
                    style={[styles.statusChip, active && styles.statusChipActive]}
                    onPress={() => onUpdateStatus(user.id, status)}
                  >
                    <Text style={[styles.statusChipText, active && styles.statusChipTextActive]}>
                      {status}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <View style={styles.userActionRow}>
              <Pressable style={styles.rowButton} onPress={() => startEdit(user)}>
                <Text style={styles.rowButtonText}>Edit</Text>
              </Pressable>
              <Pressable
                style={[styles.rowButton, styles.rowButtonDanger]}
                onPress={() => onDeleteUser(user.id)}
              >
                <Text style={[styles.rowButtonText, styles.rowButtonDangerText]}>Delete</Text>
              </Pressable>
            </View>
          </View>
        ))}
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
  formCard: {
    borderRadius: 16,
    padding: 12,
    backgroundColor: ADMIN_COLORS.surface,
    borderWidth: 1,
    borderColor: ADMIN_COLORS.border,
    gap: 8,
  },
  formTitle: {
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
  formActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  primaryButton: {
    borderRadius: 12,
    backgroundColor: ADMIN_COLORS.ink,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  primaryButtonText: {
    fontFamily: 'LeagueSpartan_700Bold',
    fontSize: 13,
    color: '#FFFFFF',
  },
  secondaryButton: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: ADMIN_COLORS.border,
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  secondaryButtonText: {
    fontFamily: 'LeagueSpartan_600SemiBold',
    fontSize: 13,
    color: ADMIN_COLORS.ink,
  },
  listCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: ADMIN_COLORS.border,
    backgroundColor: ADMIN_COLORS.surface,
    overflow: 'hidden',
  },
  userRow: {
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(21, 21, 21, 0.06)',
    gap: 8,
  },
  userInfo: {
    gap: 2,
  },
  userName: {
    fontFamily: 'LeagueSpartan_700Bold',
    fontSize: 14,
    color: ADMIN_COLORS.ink,
  },
  userMeta: {
    fontFamily: 'LeagueSpartan_400Regular',
    fontSize: 11,
    color: ADMIN_COLORS.muted,
  },
  statusWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  statusChip: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: ADMIN_COLORS.border,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: '#FFFFFF',
  },
  statusChipActive: {
    backgroundColor: ADMIN_COLORS.ink,
    borderColor: ADMIN_COLORS.ink,
  },
  statusChipText: {
    fontFamily: 'LeagueSpartan_500Medium',
    fontSize: 10,
    color: ADMIN_COLORS.ink,
    textTransform: 'uppercase',
  },
  statusChipTextActive: {
    color: '#FFFFFF',
  },
  userActionRow: {
    flexDirection: 'row',
    gap: 8,
  },
  rowButton: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: ADMIN_COLORS.border,
    backgroundColor: '#FFFFFF',
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  rowButtonText: {
    fontFamily: 'LeagueSpartan_600SemiBold',
    fontSize: 11,
    color: ADMIN_COLORS.ink,
  },
  rowButtonDanger: {
    borderColor: 'rgba(242, 75, 61, 0.35)',
    backgroundColor: 'rgba(242, 75, 61, 0.1)',
  },
  rowButtonDangerText: {
    color: ADMIN_COLORS.red,
  },
});

