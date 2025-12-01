import React from 'react';
import { TouchableOpacity } from 'react-native';
import * as Haptics from 'expo-haptics';

export function HapticTab(props: any) {
  return (
    <TouchableOpacity
      {...props}
      onPress={(...args) => {
        if (Platform.OS === 'web') {
          // No haptic feedback on web
        } else {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        props.onPress?.(...args);
      }}
    />
  );
}

import { Platform } from 'react-native';
