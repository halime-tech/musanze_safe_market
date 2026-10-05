import { Alert, Linking, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export async function requestCameraPermission(): Promise<boolean> {
  const { status } = await ImagePicker.requestCameraPermissionsAsync();
  return status === 'granted';
}

export async function requestGalleryPermission(): Promise<boolean> {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  return status === 'granted';
}

export function showPermissionDeniedAlert(type: 'camera' | 'gallery'): void {
  const title = 'Permission Required';
  const message = type === 'camera'
    ? 'Camera access is needed to capture inspection evidence. Please enable it in settings.'
    : 'Gallery access is needed to select inspection evidence. Please enable it in settings.';

  Alert.alert(title, message, [
    { text: 'Cancel', style: 'cancel' },
    {
      text: 'Open Settings',
      onPress: () => {
        if (Platform.OS === 'ios') {
          Linking.openURL('app-settings:');
        } else {
          Linking.openSettings();
        }
      },
    },
  ]);
}

export function showPickerCancelledAlert(): void {
  Alert.alert(
    'No Image Selected',
    'You cancelled the image picker. You can try again or continue without an image.',
    [{ text: 'OK' }]
  );
}