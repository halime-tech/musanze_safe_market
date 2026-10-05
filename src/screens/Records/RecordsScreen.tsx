import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { AppHeader } from '../../components/common/AppHeader';
import { EmptyState } from '../../components/common/EmptyState';
import { useInspection } from '../../state/InspectionContext';
import { formatTimestamp } from '../../utils/formatters';
import { RecordsStackParamList } from '../../navigation/types';
import { InspectionRecord } from '../../types/inspection';
import { colors, spacing, typography, borderRadius, shadows } from '../../theme';

type NavigationProp = NativeStackNavigationProp<RecordsStackParamList, 'RecordsList'>;

interface RecordsScreenProps {
  navigation: NavigationProp;
}

export function RecordsScreen({ navigation }: RecordsScreenProps) {
  const { records } = useInspection();

  const handleRecordPress = (record: InspectionRecord) => {
    navigation.navigate('InspectionDetails', { recordId: record.id });
  };

  const renderRecord = ({ item }: { item: InspectionRecord }) => (
    <TouchableOpacity
      style={styles.recordCard}
      onPress={() => handleRecordPress(item)}
      activeOpacity={0.8}
    >
      <View style={styles.recordHeader}>
        <View style={styles.recordIcon}>
          <Ionicons name="document-text" size={20} color={colors.primary} />
        </View>
        <View style={styles.recordInfo}>
          <Text style={styles.recordAlias}>{item.vendorAlias}</Text>
          <Text style={styles.recordStall}>{item.stallCode}</Text>
        </View>
        <View style={[styles.riskBadge, { backgroundColor: getRiskColor(item.riskLevel) }]}>
          <Text style={styles.riskText}>{item.riskLevel.toUpperCase()}</Text>
        </View>
      </View>
      <View style={styles.recordFooter}>
        <View style={styles.footerItem}>
          <Ionicons name="pricetag-outline" size={14} color={colors.textSecondary} />
          <Text style={styles.footerText}>{item.category}</Text>
        </View>
        <View style={styles.footerItem}>
          <Ionicons name="time-outline" size={14} color={colors.textSecondary} />
          <Text style={styles.footerText}>{formatTimestamp(new Date(item.timestamp))}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (records.length === 0) {
    return (
      <View style={styles.container}>
        <AppHeader title="Records" subtitle="Inspection history" />
        <EmptyState
          icon="document-text-outline"
          title="No Inspections Yet"
          message="Completed inspections will appear here. Start a new inspection to create your first record."
          actionLabel="New Inspection"
          onAction={() => navigation.navigate('RecordsList')}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <AppHeader title="Records" subtitle={`${records.length} inspection(s)`} />
      <FlatList
        data={records}
        keyExtractor={(item) => item.id}
        renderItem={renderRecord}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

function getRiskColor(risk: string): string {
  switch (risk) {
    case 'high':
      return colors.errorLight;
    case 'medium':
      return colors.warningLight;
    default:
      return colors.successLight;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    padding: spacing.md,
  },
  recordCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  recordHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  recordIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.successLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  recordInfo: {
    flex: 1,
  },
  recordAlias: {
    ...typography.body,
    fontWeight: '600',
    color: colors.text,
  },
  recordStall: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  riskBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  riskText: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.text,
  },
  recordFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: colors.divider,
    paddingTop: spacing.sm,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerText: {
    ...typography.caption,
    color: colors.textSecondary,
    marginLeft: spacing.xs,
  },
});