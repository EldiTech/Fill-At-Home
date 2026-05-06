import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { ADMIN_COLORS } from '../theme';
import {
  AnnouncementAudience,
  AnnouncementRecord,
  AnnouncementStatus,
  NewAnnouncementInput,
} from '../types';

type NotificationsScreenProps = {
  announcements: AnnouncementRecord[];
  onCreateAnnouncement: (payload: NewAnnouncementInput) => void;
  onUpdateAnnouncementStatus: (announcementId: string, status: AnnouncementStatus) => void;
  onDeleteAnnouncement: (announcementId: string) => void;
};

const AUDIENCE_OPTIONS: AnnouncementAudience[] = ['all-users', 'active-users', 'vip-clients'];

export default function NotificationsScreen({
  announcements,
  onCreateAnnouncement,
  onUpdateAnnouncementStatus,
  onDeleteAnnouncement,
}: NotificationsScreenProps) {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [audience, setAudience] = useState<AnnouncementAudience>('all-users');
  const [scheduledAt, setScheduledAt] = useState('');

  const submit = () => {
    const payload: NewAnnouncementInput = {
      title: title.trim(),
      message: message.trim(),
      audience,
      scheduledAt: scheduledAt.trim() || undefined,
    };
    if (!payload.title || !payload.message) {
      return;
    }
    onCreateAnnouncement(payload);
    setTitle('');
    setMessage('');
    setAudience('all-users');
    setScheduledAt('');
  };

  return (
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <Text style={styles.sectionTitle}>Notifications & Announcements</Text>
      <Text style={styles.sectionSubtitle}>
        Publish targeted updates to users and monitor delivery readiness.
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Create announcement</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Announcement title"
          placeholderTextColor={ADMIN_COLORS.muted}
        />
        <TextInput
          style={[styles.input, styles.messageInput]}
          value={message}
          onChangeText={setMessage}
          placeholder="Announcement message"
          placeholderTextColor={ADMIN_COLORS.muted}
          multiline
          numberOfLines={4}
        />
        <Text style={styles.inlineLabel}>Audience</Text>
        <View style={styles.choiceRow}>
          {AUDIENCE_OPTIONS.map((option) => {
            const active = audience === option;
            return (
              <Pressable
                key={option}
                style={[styles.choice, active && styles.choiceActive]}
                onPress={() => setAudience(option)}
              >
                <Text style={[styles.choiceText, active && styles.choiceTextActive]}>{option}</Text>
              </Pressable>
            );
          })}
        </View>
        <TextInput
          style={styles.input}
          value={scheduledAt}
          onChangeText={setScheduledAt}
          placeholder="Schedule (optional) e.g. 2026-05-20 09:00"
          placeholderTextColor={ADMIN_COLORS.muted}
        />
        <Pressable style={styles.primaryButton} onPress={submit}>
          <Text style={styles.primaryButtonText}>Save announcement</Text>
        </Pressable>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Announcement queue</Text>
        {announcements.length === 0 ? (
          <Text style={styles.emptyText}>No announcements yet.</Text>
        ) : (
          announcements.map((announcement) => (
            <View key={announcement.id} style={styles.row}>
              <View style={styles.rowTextWrap}>
                <Text style={styles.rowTitle}>{announcement.title}</Text>
                <Text style={styles.rowMeta}>
                  {announcement.audience} | Created {announcement.createdAt}
                </Text>
                <Text style={styles.rowMessage}>{announcement.message}</Text>
                {announcement.scheduledAt ? (
                  <Text style={styles.rowMeta}>Scheduled: {announcement.scheduledAt}</Text>
                ) : null}
              </View>

              <View style={styles.actionWrap}>
                <Text style={styles.statusLabel}>{announcement.status}</Text>
                {announcement.status !== 'published' ? (
                  <Pressable
                    style={styles.miniButton}
                    onPress={() => onUpdateAnnouncementStatus(announcement.id, 'published')}
                  >
                    <Text style={styles.miniButtonText}>Publish</Text>
                  </Pressable>
                ) : (
                  <Pressable
                    style={styles.miniButton}
                    onPress={() => onUpdateAnnouncementStatus(announcement.id, 'archived')}
                  >
                    <Text style={styles.miniButtonText}>Archive</Text>
                  </Pressable>
                )}
                {announcement.status !== 'draft' ? (
                  <Pressable
                    style={styles.miniButton}
                    onPress={() => onUpdateAnnouncementStatus(announcement.id, 'draft')}
                  >
                    <Text style={styles.miniButtonText}>Set draft</Text>
                  </Pressable>
                ) : null}
                <Pressable
                  style={[styles.miniButton, styles.miniButtonDanger]}
                  onPress={() => onDeleteAnnouncement(announcement.id)}
                >
                  <Text style={[styles.miniButtonText, styles.miniButtonDangerText]}>Delete</Text>
                </Pressable>
              </View>
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
  messageInput: {
    minHeight: 90,
    textAlignVertical: 'top',
  },
  inlineLabel: {
    fontFamily: 'LeagueSpartan_600SemiBold',
    fontSize: 12,
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
  row: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(21, 21, 21, 0.06)',
    paddingTop: 10,
    gap: 8,
  },
  rowTextWrap: {
    gap: 2,
  },
  rowTitle: {
    fontFamily: 'LeagueSpartan_700Bold',
    fontSize: 14,
    color: ADMIN_COLORS.ink,
  },
  rowMeta: {
    fontFamily: 'LeagueSpartan_400Regular',
    fontSize: 11,
    color: ADMIN_COLORS.muted,
  },
  rowMessage: {
    fontFamily: 'LeagueSpartan_400Regular',
    fontSize: 12,
    color: ADMIN_COLORS.softInk,
    marginTop: 4,
  },
  statusLabel: {
    fontFamily: 'LeagueSpartan_700Bold',
    fontSize: 11,
    color: ADMIN_COLORS.blue,
    textTransform: 'uppercase',
  },
  actionWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
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
  emptyText: {
    fontFamily: 'LeagueSpartan_400Regular',
    fontSize: 12,
    color: ADMIN_COLORS.muted,
  },
});

