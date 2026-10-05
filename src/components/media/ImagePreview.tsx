import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius } from '../../theme';

interface ImagePreviewProps {
  uri: string;
  onRemove: () => void;
  onReplace: () => void;
}

export function ImagePreview({ uri, onRemove, onReplace }: ImagePreviewProps) {
  return (
    <View style={styles.container}>
      <Image source={{ uri }} style={styles.image} resizeMode="cover" />
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.actionButton} onPress={onReplace} activeOpacity={0.7}>
          <Ionicons name="refresh" size={20} color={colors.textLight} />
          <Text style={styles.actionText}>Replace</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.removeButton]}
          onPress={onRemove}
          activeOpacity={0.7}
        >
          <Ionicons name="trash" size={20} color={colors.textLight} />
          <Text style={styles.actionText}>Remove</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.successBadge}>
        <Ionicons name="checkmark-circle" size={16} color={colors.success} />
        <Text style={styles.successText}>Image attached</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: borderRadius.md,
    overflow: 'hidden',
    backgroundColor: colors.surfaceVariant,
  },
  image: {
    width: '100%',
    height: 200,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: spacing.md,
    gap: spacing.md,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.round,
  },
  removeButton: {
    backgroundColor: 'rgba(211, 47, 47, 0.7)',
  },
  actionText: {
    ...typography.caption,
    color: colors.textLight,
    fontWeight: '600',
    marginLeft: spacing.xs,
  },
  successBadge: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.round,
  },
  successText: {
    ...typography.caption,
    color: colors.success,
    fontWeight: '600',
    marginLeft: 4,
  },
});