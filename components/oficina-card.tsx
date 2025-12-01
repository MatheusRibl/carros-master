import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import type { Oficina } from '../types/index.js';

interface OficinaCardProps {
  oficina: Oficina;
  onPress?: () => void;
}

export function OficinaCard({ oficina, onPress }: OficinaCardProps) {
  const colorScheme = useColorScheme() as 'light' | 'dark';
  const theme = Colors[colorScheme];

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <ThemedView style={styles.card}>
        <View style={styles.header}>
          <ThemedText type="defaultSemiBold" style={styles.nome}>
            {oficina.nome}
          </ThemedText>
          <View style={styles.rating}>
            <ThemedText style={styles.ratingText}>⭐ {oficina.rating}</ThemedText>
            <ThemedText style={styles.avaliacoes}>({oficina.avaliacoes})</ThemedText>
          </View>
        </View>

        <ThemedText style={styles.endereco}>{oficina.endereco}</ThemedText>

        <View style={styles.horario}>
          <ThemedText style={styles.horarioText}>
            🕐 {oficina.horarioAbertura} - {oficina.horarioFechamento}
          </ThemedText>
        </View>

        <View style={styles.especialidades}>
          {oficina.especialidades.slice(0, 2).map((esp, idx) => (
            <View key={idx} style={[styles.badge, { backgroundColor: theme.tint + '30' }]}>
              <ThemedText style={styles.badgeText}>{esp}</ThemedText>
            </View>
          ))}
        </View>

        <View style={styles.footer}>
          <ThemedText style={styles.telefone}>📞 {oficina.telefone}</ThemedText>
        </View>
      </ThemedView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  nome: {
    fontSize: 16,
    flex: 1,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
  },
  avaliacoes: {
    fontSize: 12,
    opacity: 0.6,
  },
  endereco: {
    fontSize: 13,
    opacity: 0.7,
    marginBottom: 6,
  },
  horario: {
    marginBottom: 8,
  },
  horarioText: {
    fontSize: 13,
  },
  especialidades: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 8,
    flexWrap: 'wrap',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 12,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 8,
  },
  telefone: {
    fontSize: 12,
    opacity: 0.7,
  },
});
