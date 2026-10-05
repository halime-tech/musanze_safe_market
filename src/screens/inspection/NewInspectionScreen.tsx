import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { AppHeader } from '../../components/common/AppHeader';
import { FormField } from '../../components/common/FormField';
import { PrimaryButton } from '../../components/common/PrimaryButton';
import { CategorySelector } from '../../components/inspection/CategorySelector';
import { RiskLevelSelector } from '../../components/inspection/RiskLevelSelector';
import { ConsentCheckbox } from '../../components/inspection/ConsentCheckbox';
import { ImagePicker } from '../../components/media/ImagePicker';
import { useInspection } from '../../state/InspectionContext';
import { validateForm, isFormValid } from '../../utils/validation';
import { ValidationErrors } from '../../types/inspection';
import { NewInspectionStackParamList } from '../../navigation/types';
import { colors, spacing, typography } from '../../theme';

type NavigationProp = NativeStackNavigationProp<NewInspectionStackParamList, 'InspectionForm'>;

interface NewInspectionScreenProps {
  navigation: NavigationProp;
}

export function NewInspectionScreen({ navigation }: NewInspectionScreenProps) {
  const { formData, updateFormField } = useInspection();
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleFieldChange = (field: keyof typeof formData, value: any) => {
    updateFormField(field, value);
    if (touched[field]) {
      const newErrors = validateForm({ ...formData, [field]: value });
      setErrors((prev) => ({ ...prev, [field]: newErrors[field] }));
    }
  };

  const handleBlur = (field: keyof typeof formData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const newErrors = validateForm(formData);
    setErrors((prev) => ({ ...prev, [field]: newErrors[field] }));
  };

  const handleSubmit = () => {
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);
    setTouched({
      vendorAlias: true,
      stallCode: true,
      category: true,
      contactNumber: true,
      riskLevel: true,
      consent: true,
      imageUri: true,
    });

    if (!isFormValid(formData)) {
      Alert.alert(
        'Validation Error',
        'Please fix the errors below before continuing.',
        [{ text: 'OK' }]
      );
      return;
    }

    navigation.navigate('Review');
  };

  return (
    <View style={styles.container}>
      <AppHeader title="New Inspection" subtitle="Record vendor details" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Vendor Information</Text>

          <FormField
            label="Vendor Alias"
            required
            icon="person-outline"
            placeholder="e.g., Mama Nyiramatunda"
            value={formData.vendorAlias}
            onChangeText={(text) => handleFieldChange('vendorAlias', text)}
            onBlur={() => handleBlur('vendorAlias')}
            error={touched.vendorAlias ? errors.vendorAlias : undefined}
            hint="Use a fictional alias for the vendor"
            autoCapitalize="words"
          />

          <FormField
            label="Stall Code"
            required
            icon="barcode-outline"
            placeholder="e.g., MUS-001"
            value={formData.stallCode}
            onChangeText={(text) => handleFieldChange('stallCode', text.toUpperCase())}
            onBlur={() => handleBlur('stallCode')}
            error={touched.stallCode ? errors.stallCode : undefined}
            hint="Format: MUS-XXX"
            autoCapitalize="characters"
            maxLength={7}
          />

          <FormField
            label="Contact Number"
            required
            icon="call-outline"
            placeholder="e.g., 0788123456"
            value={formData.contactNumber}
            onChangeText={(text) => handleFieldChange('contactNumber', text.replace(/\D/g, ''))}
            onBlur={() => handleBlur('contactNumber')}
            error={touched.contactNumber ? errors.contactNumber : undefined}
            hint="Rwanda format: 07XXXXXXXX"
            keyboardType="phone-pad"
            maxLength={10}
          />

          <CategorySelector
            selectedValue={formData.category}
            onSelect={(value) => handleFieldChange('category', value)}
            error={touched.category ? errors.category : undefined}
          />

          <RiskLevelSelector
            selectedValue={formData.riskLevel}
            onSelect={(value) => handleFieldChange('riskLevel', value)}
            error={touched.riskLevel ? errors.riskLevel : undefined}
          />
        </View>

        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Evidence</Text>

          <ImagePicker
            imageUri={formData.imageUri}
            onImageSelected={(uri) => handleFieldChange('imageUri', uri)}
            error={touched.imageUri ? errors.imageUri : undefined}
          />
        </View>

        <View style={styles.formSection}>
          <ConsentCheckbox
            checked={formData.consent}
            onToggle={() => handleFieldChange('consent', !formData.consent)}
            error={touched.consent ? errors.consent : undefined}
          />
        </View>

        <View style={styles.buttonContainer}>
          <PrimaryButton
            title="Review Inspection"
            onPress={handleSubmit}
            icon="arrow-forward"
            iconPosition="right"
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
  formSection: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.text,
    marginBottom: spacing.md,
  },
  buttonContainer: {
    marginTop: spacing.md,
  },
});