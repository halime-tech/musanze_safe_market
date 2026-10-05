import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius } from '../../theme';

interface ConsentCheckboxProps {
  checked: boolean;
  onToggle: () => void;
  error?: string;
}

export function ConsentCheckbox({ checked, onToggle, error }: ConsentCheckboxProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.checkboxRow, error && styles.checkboxRowError]}
        onPress={onToggle}
        activeOpacity={0.7}
      >
        <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
          {checked && <Ionicons name="checkmark" size={16} color={colors.textLight} />}
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.label}>
            I confirm that the information provided is accurate and I consent to the inspection.
          </Text>
          <Text style={styles.required}>*</Text>
        </View>
      </TouchableOpacity>
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
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    padding: spacing.md,
  },
  checkboxRowError: {
    borderColor: colors.error,
    backgroundColor: colors.errorLight,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: borderRadius.sm,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  label: {
    ...typography.bodySmall,
    color: colors.text,
    flex: 1,
  },
  required: {
    ...typography.label,
    color: colors.error,
    marginLeft: 2,
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