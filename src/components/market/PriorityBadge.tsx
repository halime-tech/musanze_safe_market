import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { InspectionPriority } from '../../types/market';
import { colors, spacing, typography, borderRadius } from '../../theme';

interface PriorityBadgeProps {
  priority: InspectionPriority;
}

const priorityConfig: Record<InspectionPriority, { label: string; color: string; icon: keyof typeof Ionicons.glyphMap }> = {
  low: {
    label: 'Low Priority',
    color: colors.priorityLow,
    icon: 'arrow-down',
  },
  medium: {
    label: 'Medium Priority',
    color: colors.priorityMedium,
    icon: 'remove',
  },
  high: {
    label: 'High Priority',
    color: colors.priorityHigh,
    icon: 'arrow-up',
  },
};

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  const config = priorityConfig[priority];

  return (
    <View style={styles.badge}>
      <Ionicons name={config.icon} size={12} color={config.color} />
      <Text style={[styles.label, { color: config.color }]}>{config.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    ...typography.caption,
    fontWeight: '600',
    marginLeft: 4,
  },
});