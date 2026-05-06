import React, { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, CONTENT_PADDING, NAV_BAR_DIMENSIONS } from '../constants';
import BottomNavBar from '../components/BottomNavBar';
import TopHeader from '../components/TopHeader';

type ChefBotProps = {
  onBack?: () => void;
  onHome?: () => void;
  onMenu?: () => void;
  onOrders?: () => void;
  onProfile?: () => void;
};

export default function ChefBot({ onBack, onHome, onMenu, onOrders, onProfile }: ChefBotProps) {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Array<{ id: string; from: 'user' | 'bot'; text: string }>>([]);
  const inputRef = useRef<TextInput | null>(null);
  const fade = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();

  useEffect(() => {
    Animated.timing(fade, { toValue: 1, duration: 420, useNativeDriver: true }).start();
  }, [fade]);

  function send() {
    if (!query.trim()) return;
    const userMsg = { id: Date.now().toString(), from: 'user' as const, text: query };
    setMessages((m) => [...m, userMsg]);
    setQuery('');
    // placeholder bot reply
    setTimeout(() => {
      setMessages((m) => [...m, { id: Date.now().toString(), from: 'bot', text: `ChefBot: Suggestion for "${userMsg.text}"` }]);
    }, 700);
  }

  return (
    <View style={styles.screen}>
      <SafeAreaView style={styles.safeArea}>
        <Animated.View style={[styles.headerWrap, { opacity: fade }]}>
          <TopHeader subtitle="ChefBot" />
        </Animated.View>

        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <View style={styles.chatWrap}>
            {messages.length === 0 && (
              <View style={styles.placeholderCard}>
                <Text style={styles.placeholderTitle}>Ask ChefBot</Text>
                <Text style={styles.placeholderText}>Get catering suggestions, portions, and menu ideas.</Text>
              </View>
            )}

            {messages.map((m) => (
              <View key={m.id} style={[styles.messageRow, m.from === 'user' ? styles.userRow : styles.botRow]}>
                <Text style={m.from === 'user' ? styles.userText : styles.botText}>{m.text}</Text>
              </View>
            ))}
          </View>
        </ScrollView>

        <View style={[styles.composer, { bottom: insets.bottom + 90 }]}>
          <TextInput
            ref={inputRef}
            style={styles.input}
            placeholder="Ask ChefBot..."
            placeholderTextColor={COLORS.muted}
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={send}
            returnKeyType="send"
          />
          <Pressable style={styles.sendButton} onPress={send}>
            <Text style={styles.sendText}>Send</Text>
          </Pressable>
        </View>

        <BottomNavBar
          activeKey="profile"
          onNavigate={(key) => {
            if (key === 'home') onHome?.();
            if (key === 'menu') onMenu?.();
            if (key === 'orders') onOrders?.();
            if (key === 'profile') onProfile?.();
          }}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FFFFFF' },
  safeArea: { flex: 1 },
  headerWrap: { paddingHorizontal: CONTENT_PADDING.paddingHorizontal, paddingTop: CONTENT_PADDING.paddingTop },
  content: { paddingHorizontal: CONTENT_PADDING.paddingHorizontal, paddingBottom: CONTENT_PADDING.paddingBottom },
  chatWrap: { paddingTop: 12 },
  placeholderCard: { padding: 18, borderRadius: 14, backgroundColor: '#FFF8F0', borderWidth: 1, borderColor: COLORS.border },
  placeholderTitle: { fontFamily: 'LeagueSpartan_700Bold', fontSize: 16, color: COLORS.ink },
  placeholderText: { fontFamily: 'LeagueSpartan_400Regular', fontSize: 12, color: COLORS.softInk, marginTop: 6 },
  messageRow: { maxWidth: '80%', padding: 12, borderRadius: 12 },
  userRow: { alignSelf: 'flex-end', backgroundColor: COLORS.orange },
  botRow: { alignSelf: 'flex-start', backgroundColor: '#F6F6F6' },
  userText: { color: '#fff', fontFamily: 'LeagueSpartan_500Medium' },
  botText: { color: COLORS.ink, fontFamily: 'LeagueSpartan_400Regular' },
  composer: { position: 'absolute', left: NAV_BAR_DIMENSIONS.left, right: NAV_BAR_DIMENSIONS.right, flexDirection: 'row', alignItems: 'center', padding: 8, backgroundColor: '#FFFFFF' },
  input: { flex: 1, paddingVertical: 12, paddingHorizontal: 14, borderRadius: 14, borderWidth: 1, borderColor: COLORS.border, backgroundColor: '#FFFFFF', fontFamily: 'LeagueSpartan_400Regular' },
  sendButton: { paddingVertical: 12, paddingHorizontal: 14, borderRadius: 12, backgroundColor: COLORS.orange },
  sendText: { color: '#fff', fontFamily: 'LeagueSpartan_700Bold' },
});
