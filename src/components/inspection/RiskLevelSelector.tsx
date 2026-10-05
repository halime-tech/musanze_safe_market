import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RiskLevel } from '../../types/inspection';
import { RISK_LEVELS } from '../../data/constants';
import { colors, spacing, typography, borderRadius } from '../../theme';

interface RiskLevelSelectorProps {
  selectedValue: RiskLevel;
  onSelect: (value: RiskLevel) => void;
  error?: string;
}

const riskColors: Record<RiskLevel, { color: string; bgColor: string }> = {
  low: { color: colors.priorityLow, bgColor: colors.successLight },
  medium: { color: colors.priorityMedium, bgColor: colors.warningLight },
  high: { color: colors.priorityHigh, bgColor: colors.errorLight },
};

export function RiskLevelSelector({ selectedValue, onSelect, error }: RiskLevelSelectorProps) {
  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>Risk Level</Text>
        <Text style={styles.required}>*</Text>
      </View>
      {RISK_LEVELS.map((level) => {
        const isSelected = selectedValue === level.value;
        const riskStyle = riskColors[level.value];

        return (
          <TouchableOpacity
            key={level.value}
            style={[
              styles.option,
              isSelected && { backgroundColor: riskStyle.bgColor, borderColor: riskStyle.color },
            ]}
            onPress={() => onSelect(level.value)}
            activeOpacity={0.7}
          >
            <View style={[styles.radio, isSelected && { borderColor: riskStyle.color }]}>
              {isSelected && <View style={[styles.radioInner, { backgroundColor: riskStyle.color }]} />}
            </View>
            <View style={styles.optionContent}>
              <Text style={[styles.optionLabel, isSelected && { color: riskStyle.color }]}>
                {level.label}
              </Text>
              <Text style={styles.optionDescription}>{level.description}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
      {error && (
        <View style={styles.messageRow}>
          <Ionicons name="alert-circle" size={14} color={colors.error} />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  label: {
    ...typography.label,
    color: colors.text,
  },
  required: {
    ...typography.label,
    color: colors.error,
    marginLeft: 2,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  optionContent: {
    flex: 1,
  },
  optionLabel: {
    ...typography.body,
    fontWeight: '600',
    color: colors.text,
  },
  optionDescription: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  errorText: {
    ...typography.caption,
    color: colors.error,
    marginLeft: spacing.xs,
  },
});