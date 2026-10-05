import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { AppHeader } from '../../components/common/AppHeader';
import { useInspection } from '../../state/InspectionContext';
import { formatTimestamp } from '../../utils/formatters';
import { RecordsStackParamList } from '../../navigation/types';
import { colors, spacing, typography, borderRadius, shadows } from '../../theme';

type DetailsRouteProp = RouteProp<RecordsStackParamList, 'InspectionDetails'>;

interface InspectionDetailsScreenProps {
  route: DetailsRouteProp;
}

export function InspectionDetailsScreen({ route }: InspectionDetailsScreenProps) {
  const { recordId } = route.params;
  const { getRecordById } = useInspection();
  const record = getRecordById(recordId);

  if (!record) {
    return (
      <ScreenContainer>
        <AppHeader title="Details" subtitle="Record not found" />
        <View style={styles.notFound}>
          <Ionicons name="alert-circle-outline" size={64} color={colors.error} />
          <Text style={styles.notFoundText}>Record not found</Text>
        </View>
      </ScreenContainer>
    );
  }

  const renderField = (label: string, value: string, icon: keyof typeof Ionicons.glyphMap) => (
    <View style={styles.fieldRow}>
      <View style={styles.fieldIcon}>
        <Ionicons name={icon} size={18} color={colors.primary} />
      </View>
      <View style={styles.fieldContent}>
        <Text style={styles.fieldLabel}>{label}</Text>
        <Text style={styles.fieldValue}>{value}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <AppHeader title="Inspection Details" subtitle={record.stallCode} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.groupCodeBanner}>
          <Ionicons name="shield-checkmark" size={20} color={colors.textLight} />
          <Text style={styles.groupCodeText}>{record.groupCode}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Vendor Information</Text>
          {renderField('Vendor Alias', record.vendorAlias, 'person-outline')}
          {renderField('Stall Code', record.stallCode, 'barcode-outline')}
          {renderField('Category', record.category, 'pricetag-outline')}
          {renderField('Contact Number', record.contactNumber, 'call-outline')}
          {renderField('Risk Level', record.riskLevel.toUpperCase(), 'warning-outline')}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Evidence Image</Text>
          {record.imageUri ? (
            <Image source={{ uri: record.imageUri }} style={styles.image} resizeMode="cover" />
          ) : (
            <View style={styles.noImage}>
              <Ionicons name="image-outline" size={40} color={colors.textSecondary} />
              <Text style={styles.noImageText}>No image attached</Text>
            </View>
          )}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Metadata</Text>
          <View style={styles.metaRow}>
            <Ionicons name="time-outline" size={18} color={colors.textSecondary} />
            <Text style={styles.metaText}>{formatTimestamp(new Date(record.timestamp))}</Text>
          </View>
          <View style={styles.metaRow}>
            <Ionicons name="finger-print-outline" size={18} color={colors.textSecondary} />
            <Text style={styles.metaText}>ID: {record.id}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  groupCodeBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  groupCodeText: {
    ...typography.h3,
    color: colors.textLight,
    marginLeft: spacing.sm,
    letterSpacing: 1,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  cardTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.md,
  },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  fieldIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.successLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  fieldContent: {
    flex: 1,
  },
  fieldLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  fieldValue: {
    ...typography.body,
    color: colors.text,
    fontWeight: '600',
    marginTop: 2,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: borderRadius.md,
  },
  noImage: {
    height: 120,
    backgroundColor: colors.surfaceVariant,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noImageText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  metaText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginLeft: spacing.sm,
  },
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notFoundText: {
    ...typography.h3,
    color: colors.textSecondary,
    marginTop: spacing.md,
  },
});