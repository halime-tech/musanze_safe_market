import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius } from '../../theme';

interface PermissionNoticeProps {
  type: 'camera' | 'gallery' | 'media';
  onRetry?: () => void;
}

export function PermissionNotice({ type, onRetry }: PermissionNoticeProps) {
  const config = {
    camera: {
      icon: 'camera-outline' as const,
      title: 'Camera Permission Required',
      message: 'To capture inspection evidence, please allow camera access in your device settings.',
    },
    gallery: {
      icon: 'images-outline' as const,
      title: 'Gallery Permission Required',
      message: 'To select inspection evidence, please allow gallery access in your device settings.',
    },
    media: {
      icon: 'folder-open-outline' as const,
      title: 'Media Permission Required',
      message: 'To attach inspection evidence, please allow camera or gallery access in your device settings.',
    },
  };

  const { icon, title, message } = config[type];

  const openSettings = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:');
    } else {
      Linking.openSettings();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={40} color={colors.warning} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.settingsButton} onPress={openSettings} activeOpacity={0.7}>
          <Ionicons name="settings-outline" size={18} color={colors.textLight} />
          <Text style={styles.settingsButtonText}>Open Settings</Text>
        </TouchableOpacity>
        {onRetry && (
          <TouchableOpacity style={styles.retryButton} onPress={onRetry} activeOpacity={0.7}>
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.warningLight,
    borderWidth: 1,
    borderColor: colors.warning,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    alignItems: 'center',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  title: {
    ...typography.h3,
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  message: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  settingsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
  },
  settingsButtonText: {
    ...typography.bodySmall,
    color: colors.textLight,
    fontWeight: '600',
    marginLeft: spacing.xs,
  },
  retryButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  retryButtonText: {
    ...typography.bodySmall,
    color: colors.primary,
    fontWeight: '600',
  },
});