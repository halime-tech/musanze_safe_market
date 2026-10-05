import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MarketStatus } from '../../types/market';
import { colors, spacing, typography, borderRadius } from '../../theme';

interface StatusChipProps {
  status: MarketStatus;
}

const statusConfig: Record<MarketStatus, { label: string; color: string; bgColor: string; icon: keyof typeof Ionicons.glyphMap }> = {
  open: {
    label: 'Open',
    color: colors.statusOpen,
    bgColor: colors.successLight,
    icon: 'checkmark-circle',
  },
  closed: {
    label: 'Closed',
    color: colors.statusClosed,
    bgColor: colors.errorLight,
    icon: 'close-circle',
  },
  maintenance: {
    label: 'Maintenance',
    color: colors.statusMaintenance,
    bgColor: colors.warningLight,
    icon: 'construct',
  },
};

export function StatusChip({ status }: StatusChipProps) {
  const config = statusConfig[status];

  return (
    <View style={[styles.chip, { backgroundColor: config.bgColor }]}>
      <Ionicons name={config.icon} size={12} color={config.color} />
      <Text style={[styles.label, { color: config.color }]}>{config.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.round,
  },
  label: {
    ...typography.caption,
    fontWeight: '600',
    marginLeft: 4,
  },
});