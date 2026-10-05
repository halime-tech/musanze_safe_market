import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MarketZone } from '../../types/market';
import { StatusChip } from './StatusChip';
import { PriorityBadge } from './PriorityBadge';
import { colors, spacing, typography, borderRadius, shadows } from '../../theme';

interface MarketCardProps {
  zone: MarketZone;
  onPress?: (zone: MarketZone) => void;
}

export function MarketCard({ zone, onPress }: MarketCardProps) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress?.(zone)}
      activeOpacity={0.8}
    >
      <Image source={{ uri: zone.imagePlaceholder }} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name} numberOfLines={1}>
            {zone.name}
          </Text>
          <StatusChip status={zone.status} />
        </View>
        <View style={styles.categoryRow}>
          <Ionicons name="pricetag-outline" size={14} color={colors.textSecondary} />
          <Text style={styles.category}>{zone.category}</Text>
        </View>
        <View style={styles.footer}>
          <PriorityBadge priority={zone.priority} />
          <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
    overflow: 'hidden',
    ...shadows.sm,
  },
  image: {
    width: '100%',
    height: 120,
    backgroundColor: colors.surfaceVariant,
  },
  content: {
    padding: spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  name: {
    ...typography.h3,
    color: colors.text,
    flex: 1,
    marginRight: spacing.sm,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  category: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginLeft: spacing.xs,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});