import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { AppHeader } from '../../components/common/AppHeader';
import { PrimaryButton } from '../../components/common/PrimaryButton';
import { useInspection } from '../../state/InspectionContext';
import { formatTimestamp } from '../../utils/formatters';
import { APP_CONFIG } from '../../config/appConfig';
import { NewInspectionStackParamList } from '../../navigation/types';
import { colors, spacing, typography, borderRadius, shadows } from '../../theme';

type NavigationProp = NativeStackNavigationProp<NewInspectionStackParamList, 'Review'>;
type ReviewRouteProp = RouteProp<NewInspectionStackParamList, 'Review'>;

interface ReviewScreenProps {
  navigation: NavigationProp;
  route: ReviewRouteProp;
}

export function ReviewScreen({ navigation }: ReviewScreenProps) {
  const { formData, addRecord, resetForm } = useInspection();
  const timestamp = new Date();

  const handleSave = () => {
    addRecord(formData);
    Alert.alert(
      'Inspection Saved',
      'The inspection record has been saved successfully.',
      [
        {
          text: 'OK',
          onPress: () => {
            resetForm();
            navigation.navigate('InspectionForm');
          },
        },
      ]
    );
  };

  const handleEdit = () => {
    navigation.goBack();
  };

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
      <AppHeader title="Review" subtitle="Confirm inspection details" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.groupCodeBanner}>
          <Ionicons name="shield-checkmark" size={20} color={colors.textLight} />
          <Text style={styles.groupCodeText}>{APP_CONFIG.groupCode}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Vendor Information</Text>
          {renderField('Vendor Alias', formData.vendorAlias, 'person-outline')}
          {renderField('Stall Code', formData.stallCode, 'barcode-outline')}
          {renderField('Category', formData.category, 'pricetag-outline')}
          {renderField('Contact Number', formData.contactNumber, 'call-outline')}
          {renderField('Risk Level', formData.riskLevel.toUpperCase(), 'warning-outline')}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Evidence Image</Text>
          {formData.imageUri ? (
            <Image source={{ uri: formData.imageUri }} style={styles.image} resizeMode="cover" />
          ) : (
            <View style={styles.noImage}>
              <Ionicons name="image-outline" size={40} color={colors.textSecondary} />
              <Text style={styles.noImageText}>No image attached</Text>
            </View>
          )}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Consent & Timestamp</Text>
          <View style={styles.consentRow}>
            <Ionicons
              name={formData.consent ? 'checkmark-circle' : 'close-circle'}
              size={20}
              color={formData.consent ? colors.success : colors.error}
            />
            <Text style={styles.consentText}>
              {formData.consent ? 'Consent confirmed' : 'Consent not confirmed'}
            </Text>
          </View>
          <View style={styles.timestampRow}>
            <Ionicons name="time-outline" size={18} color={colors.textSecondary} />
            <Text style={styles.timestampText}>{formatTimestamp(timestamp)}</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <PrimaryButton
            title="Save Inspection"
            onPress={handleSave}
            icon="checkmark-circle-outline"
            size="large"
          />
          <View style={styles.spacer} />
          <PrimaryButton
            title="Edit Details"
            onPress={handleEdit}
            variant="outline"
            icon="create-outline"
            size="large"
          />
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
  consentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  consentText: {
    ...typography.body,
    color: colors.text,
    marginLeft: spacing.sm,
  },
  timestampRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timestampText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginLeft: spacing.sm,
  },
  buttonContainer: {
    marginTop: spacing.md,
  },
  spacer: {
    height: spacing.md,
  },
});