import React from 'react';
import { View, type ViewProps } from 'react-native';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedViewProps) {
  const colorScheme = useColorScheme() as 'light' | 'dark';
  const backgroundColor = colorScheme === 'light' ? lightColor : darkColor;
  const defaultBackgroundColor = Colors[colorScheme].background;

  return (
    <View
      {...otherProps}
      style={[
        { backgroundColor: backgroundColor || defaultBackgroundColor },
        style,
      ]}
    />
  );
}
