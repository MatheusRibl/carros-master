import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import type { Agendamento } from '../types/index';

interface StatusBadgeProps {
  status: Agendamento['status'];
}

const statusConfig: Record<Agendamento['status'], {emoji: string; label: string; bgColor: string; textColor: string}> = {
  confirmado: { emoji: '✓', label: 'Confirmado', bgColor: '#E8F5E9', textColor: '#2E7D32' },
  pendente: { emoji: '⏳', label: 'Pendente', bgColor: '#FFF3E0', textColor: '#E65100' },
  em_andamento: { emoji: '🔄', label: 'Em Andamento', bgColor: '#E3F2FD', textColor: '#1565C0' },
  concluido: { emoji: '✓✓', label: 'Concluído', bgColor: '#F1F8E9', textColor: '#558B2F' },
  cancelado: { emoji: '✕', label: 'Cancelado', bgColor: '#FFEBEE', textColor: '#C62828' },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <View style={[styles.badge, { backgroundColor: config.bgColor }]}>
      <ThemedText style={[styles.badgeText, { color: config.textColor }]}>
        {config.emoji} {config.label}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
