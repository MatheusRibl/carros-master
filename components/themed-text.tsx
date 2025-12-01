import React from 'react';
import { Text, type TextProps } from 'react-native';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'subtitle' | 'defaultSemiBold' | 'link';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const colorScheme = useColorScheme() as 'light' | 'dark';
  const color = colorScheme === 'light' ? lightColor : darkColor;
  const defaultColor = Colors[colorScheme].text;

  return (
    <Text
      {...rest}
      style={[
        { color: color || defaultColor },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'link' ? styles.link : undefined,
        style,
      ]}
    />
  );
}

const styles = {
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600' as const,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold' as const,
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold' as const,
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
};
