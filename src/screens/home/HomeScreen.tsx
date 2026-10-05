import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { AppHeader } from '../../components/common/AppHeader';
import { MarketCard } from '../../components/market/MarketCard';
import { EmptyState } from '../../components/common/EmptyState';
import { marketZones } from '../../data/marketData';
import { MarketZone } from '../../types/market';
import { useInspections } from '../../state/useInspections';
import { colors, spacing, typography, borderRadius, shadows } from '../../theme';
import { APP_CONFIG } from '../../config/appConfig';

export function HomeScreen() {
  const [showEmptyState, setShowEmptyState] = useState(false);
  const { records } = useInspections();

  const handleZonePress = (zone: MarketZone) => {
    // Navigate to inspection form with zone pre-selected
    // This is a simplified handler
  };

  const renderHeader = () => (
    <View style={styles.headerContent}>
      <View style={styles.pilotBanner}>
        <Text style={styles.pilotTitle}>{APP_CONFIG.pilotName}</Text>
        <Text style={styles.pilotSubtitle}>Field Inspection Prototype</Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{marketZones.length}</Text>
          <Text style={styles.statLabel}>Market Zones</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{records.length}</Text>
          <Text style={styles.statLabel}>Inspections</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {marketZones.filter((z) => z.status === 'open').length}
          </Text>
          <Text style={styles.statLabel}>Active Zones</Text>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Market Zones</Text>
        <TouchableOpacity onPress={() => setShowEmptyState(!showEmptyState)}>
          <Text style={styles.toggleText}>
            {showEmptyState ? 'Show Zones' : 'Show Empty State'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (showEmptyState) {
    return (
      <ScreenContainer padded={false}>
        <AppHeader title="Home" subtitle="Market Overview" />
        <EmptyState
          icon="storefront-outline"
          title="No Market Zones"
          message="Market zones will appear here once they are assigned to your inspection route."
          actionLabel="Refresh Zones"
          onAction={() => setShowEmptyState(false)}
        />
      </ScreenContainer>
    );
  }

  return (
    <View style={styles.container}>
      <AppHeader title="Home" subtitle="Market Overview" />
      <FlatList
        data={marketZones}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MarketCard zone={item} onPress={handleZonePress} />
        )}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    padding: spacing.md,
  },
  headerContent: {
    marginBottom: spacing.md,
  },
  pilotBanner: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    ...shadows.sm,
  },
  pilotTitle: {
    ...typography.h3,
    color: colors.primary,
  },
  pilotSubtitle: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    alignItems: 'center',
    ...shadows.sm,
  },
  statNumber: {
    ...typography.h2,
    color: colors.primary,
  },
  statLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.text,
  },
  toggleText: {
    ...typography.bodySmall,
    color: colors.primary,
    fontWeight: '600',
  },
});