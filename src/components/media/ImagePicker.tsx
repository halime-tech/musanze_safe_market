import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import * as ImagePickerModule from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { ImagePreview } from './ImagePreview';
import { PermissionNotice } from './PermissionNotice';
import { colors, spacing, typography, borderRadius } from '../../theme';
import { requestCameraPermission, requestGalleryPermission, showPermissionDeniedAlert } from '../../utils/permissions';

interface ImagePickerProps {
  imageUri: string | null;
  onImageSelected: (uri: string | null) => void;
  error?: string;
}

export function ImagePicker({ imageUri, onImageSelected, error }: ImagePickerProps) {
  const [showPermissionNotice, setShowPermissionNotice] = React.useState(false);

  const handleCameraPress = async () => {
    const granted = await requestCameraPermission();
    if (!granted) {
      setShowPermissionNotice(true);
      return;
    }

    const result = await ImagePickerModule.launchCameraAsync({
      mediaTypes: ImagePickerModule.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });

    if (result.canceled) {
      Alert.alert('No Image', 'You cancelled the camera. You can try again or continue without an image.');
      return;
    }

    if (result.assets && result.assets.length > 0) {
      onImageSelected(result.assets[0].uri);
    }
  };

  const handleGalleryPress = async () => {
    const granted = await requestGalleryPermission();
    if (!granted) {
      setShowPermissionNotice(true);
      return;
    }

    const result = await ImagePickerModule.launchImageLibraryAsync({
      mediaTypes: ImagePickerModule.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });

    if (result.canceled) {
      Alert.alert('No Image', 'You cancelled the gallery picker. You can try again or continue without an image.');
      return;
    }

    if (result.assets && result.assets.length > 0) {
      onImageSelected(result.assets[0].uri);
    }
  };

  const handleRemove = () => {
    Alert.alert(
      'Remove Image',
      'Are you sure you want to remove the evidence image?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Remove', style: 'destructive', onPress: () => onImageSelected(null) },
      ]
    );
  };

  const handleReplace = async () => {
    Alert.alert(
      'Replace Image',
      'Choose a source for the new image',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Camera', onPress: handleCameraPress },
        { text: 'Gallery', onPress: handleGalleryPress },
      ]
    );
  };

  if (showPermissionNotice && !imageUri) {
    return (
      <PermissionNotice
        type="media"
        onRetry={() => setShowPermissionNotice(false)}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>Evidence Image</Text>
        <Text style={styles.required}>*</Text>
      </View>

      {imageUri ? (
        <ImagePreview
          uri={imageUri}
          onRemove={handleRemove}
          onReplace={handleReplace}
        />
      ) : (
        <View style={styles.pickerButtons}>
          <TouchableOpacity
            style={styles.pickerButton}
            onPress={handleCameraPress}
            activeOpacity={0.7}
          >
            <Ionicons name="camera-outline" size={32} color={colors.primary} />
            <Text style={styles.pickerButtonText}>Take Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.pickerButton}
            onPress={handleGalleryPress}
            activeOpacity={0.7}
          >
            <Ionicons name="images-outline" size={32} color={colors.primary} />
            <Text style={styles.pickerButtonText}>Choose from Gallery</Text>
          </TouchableOpacity>
        </View>
      )}

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
  pickerButtons: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  pickerButton: {
    flex: 1,
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.border,
    borderStyle: 'dashed',
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickerButtonText: {
    ...typography.bodySmall,
    color: colors.primary,
    marginTop: spacing.sm,
    fontWeight: '600',
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