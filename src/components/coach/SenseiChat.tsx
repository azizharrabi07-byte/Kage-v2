import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import Animated, { FadeInUp, FadeIn } from 'react-native-reanimated';
import { KageText } from '@/components/ui/KageText';
import { useColors, spacing } from '@/theme';
import { getTimeBasedGreeting, getCoachMessage } from './coachData';

interface ChatMessage {
  id: string;
  sender: 'sensei' | 'user';
  text: string;
  timestamp: Date;
}

const quickActions = [
  { label: 'MOTIVATE', context: 'motivation' as const },
  { label: 'STREAK', context: 'streak' as const },
  { label: 'RECOVERY', context: 'recovery' as const },
  { label: 'WORKOUT', context: 'workout_start' as const },
];

export function SenseiChat() {
  const colors = useColors();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '0',
      sender: 'sensei',
      text: getTimeBasedGreeting(),
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
  }, [messages]);

  const addSenseiReply = (userText: string) => {
    const userMsg: ChatMessage = {
      id: `u_${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: new Date(),
    };

    const reply = generateReply(userText);
    const senseiMsg: ChatMessage = {
      id: `s_${Date.now() + 1}`,
      sender: 'sensei',
      text: reply,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg, senseiMsg]);
  };

  const handleQuickAction = (context: 'motivation' | 'streak' | 'recovery' | 'workout_start') => {
    const label = quickActions.find((a) => a.context === context)?.label || '';
    addSenseiReply(`/${label.toLowerCase()}`);
  };

  const handleSend = () => {
    const text = inputText.trim();
    if (!text) return;
    setInputText('');
    addSenseiReply(text);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      {/* Quick Actions */}
      <Animated.View
        entering={FadeInUp.delay(200).duration(500).springify()}
        style={{
          flexDirection: 'row',
          gap: 6,
          paddingHorizontal: spacing.lg,
          paddingBottom: spacing.sm,
        }}
      >
        {quickActions.map((action) => (
          <TouchableOpacity
            key={action.context}
            onPress={() => handleQuickAction(action.context)}
            style={{
              paddingHorizontal: 14,
              paddingVertical: 8,
              borderRadius: 20,
              backgroundColor: colors.glass.medium,
              borderWidth: 1,
              borderColor: colors.glass.border,
            }}
          >
            <KageText
              variant="caption"
              style={{
                fontSize: 9,
                letterSpacing: 1.5,
                color: colors.accent.neon,
              }}
            >
              {action.label}
            </KageText>
          </TouchableOpacity>
        ))}
      </Animated.View>

      {/* Chat Messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingHorizontal: spacing.lg,
          paddingTop: spacing.sm,
          paddingBottom: spacing.md,
        }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <Animated.View
            entering={FadeIn.delay(index * 50).duration(400)}
            style={{
              flexDirection: item.sender === 'sensei' ? 'row' : 'row-reverse',
              gap: 8,
              marginBottom: 12,
              alignItems: 'flex-end',
            }}
          >
            {item.sender === 'sensei' && (
              <View
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  borderWidth: 1.5,
                  borderColor: colors.accent.neon,
                  backgroundColor: colors.glass.medium,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <KageText variant="kanji" style={{ fontSize: 14, color: colors.accent.neon }}>先</KageText>
              </View>
            )}
            <View
              style={{
                maxWidth: '78%',
                borderRadius: 14,
                padding: spacing.md,
                backgroundColor: item.sender === 'sensei' ? colors.glass.medium : colors.accent.primary,
                borderWidth: 1,
                borderColor: item.sender === 'sensei' ? colors.glass.border : colors.accent.neon + '44',
              }}
            >
              <KageText
                variant="body"
                style={{
                  fontSize: 13,
                  lineHeight: 19,
                  color: item.sender === 'sensei' ? colors.text.primary : '#F5F0E8',
                  fontStyle: item.sender === 'sensei' ? 'italic' : 'normal',
                }}
              >
                {item.text}
              </KageText>
            </View>
          </Animated.View>
        )}
      />

      {/* Input */}
      <View
        style={{
          flexDirection: 'row',
          gap: 8,
          paddingHorizontal: spacing.lg,
          paddingVertical: spacing.md,
          paddingBottom: spacing.md + 8,
          borderTopWidth: 1,
          borderTopColor: colors.glass.border,
          backgroundColor: colors.bg.primary,
        }}
      >
        <TextInput
          value={inputText}
          onChangeText={setInputText}
          placeholder="Speak to Sensei..."
          placeholderTextColor={colors.text.muted}
          onSubmitEditing={handleSend}
          style={{
            flex: 1,
            backgroundColor: colors.glass.medium,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: colors.glass.border,
            paddingHorizontal: spacing.md,
            paddingVertical: 10,
            color: colors.text.primary,
            fontFamily: 'Inter-Regular',
            fontSize: 13,
          }}
        />
        <TouchableOpacity
          onPress={handleSend}
          disabled={!inputText.trim()}
          style={{
            width: 42,
            height: 42,
            borderRadius: 21,
            backgroundColor: inputText.trim() ? colors.accent.primary : colors.glass.medium,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: inputText.trim() ? colors.accent.neon : colors.glass.border,
          }}
        >
          <KageText variant="body" style={{ fontSize: 16, color: inputText.trim() ? '#F5F0E8' : colors.text.muted }}>
            ➤
          </KageText>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

function generateReply(userText: string): string {
  const lower = userText.toLowerCase();

  if (lower.includes('/motivation') || lower.includes('motivat')) {
    return getCoachMessage('motivation');
  }
  if (lower.includes('/streak') || lower.includes('streak')) {
    return getCoachMessage('streak');
  }
  if (lower.includes('/recovery') || lower.includes('recover') || lower.includes('rest') || lower.includes('tired')) {
    return getCoachMessage('recovery');
  }
  if (lower.includes('/workout') || lower.includes('workout') || lower.includes('train')) {
    return getCoachMessage('workout_start');
  }
  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
    return 'Greetings, warrior. How may I guide you today?';
  }
  if (lower.includes('rank') || lower.includes('level') || lower.includes('xp')) {
    return 'Your rank reflects your discipline. Train consistently and the shadows will lift.';
  }
  if (lower.includes('thank')) {
    return 'The path is yours to walk. I merely light the way.';
  }

  const fallbacks = [
    'The warrior\'s path is one of discipline. What troubles you?',
    'In the void between effort and rest, growth occurs.',
    'Your journey is unique. Trust the process.',
    'Silence is also an answer. Sometimes the question is the lesson.',
    'Every master was once a beginner. Keep walking the path.',
  ];
  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
}
