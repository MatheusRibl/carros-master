import { MaterialSymbol, SymbolWeight } from 'expo-symbols';
import React from 'react';
import { OpaqueColorValue, StyleProp, ViewStyle } from 'react-native';

export interface IconSymbolProps {
  name: string;
  size?: number;
  color?: string | OpaqueColorValue;
  style?: StyleProp<ViewStyle>;
  weight?: SymbolWeight;
}

export function IconSymbol({
  name,
  size = 24,
  color,
  style,
  weight = 'regular',
}: IconSymbolProps) {
  return (
    <MaterialSymbol
      name={name}
      size={size}
      color={color}
      weight={weight}
      style={style}
    />
  );
}
