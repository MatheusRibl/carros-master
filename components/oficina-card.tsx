import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Linking } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { FormatUtils } from '../utils/index';
import type { Oficina } from '../types/index.js';

interface OficinaCardProps {
  oficina: Oficina;
  onPress?: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

export function OficinaCard({ oficina, onPress, isFavorite = false, onToggleFavorite }: OficinaCardProps) {
  const colorScheme = useColorScheme() as 'light' | 'dark';
  const theme = Colors[colorScheme];
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCall = () => {
    Linking.openURL(`tel:${oficina.telefone}`);
  };

  const handleEmail = () => {
    Linking.openURL(`mailto:${oficina.email}`);
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <ThemedView style={[styles.card, isExpanded && styles.cardExpanded]}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <ThemedText type="defaultSemiBold" style={styles.nome}>
              {oficina.nome}
            </ThemedText>
          </View>
          <TouchableOpacity 
            onPress={onToggleFavorite}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <ThemedText style={styles.favoriteIcon}>
              {isFavorite ? '❤️' : '🤍'}
            </ThemedText>
          </TouchableOpacity>
        </View>

        <View style={styles.ratingRow}>
          <View style={styles.rating}>
            <ThemedText style={styles.ratingText}>⭐ {oficina.rating.toFixed(1)}</ThemedText>
            <ThemedText style={styles.avaliacoes}>({oficina.avaliacoes} avaliações)</ThemedText>
          </View>
          <ThemedText style={styles.statusIndicator}>
            {oficina.diasFuncionamento.length === 7 ? '🟢 Aberto' : '🟡 Limitado'}
          </ThemedText>
        </View>

        <ThemedText style={styles.endereco}>📍 {oficina.endereco}</ThemedText>

        <View style={styles.horario}>
          <ThemedText style={styles.horarioText}>
            🕐 {oficina.horarioAbertura} - {oficina.horarioFechamento}
          </ThemedText>
        </View>

        <View style={styles.especialidades}>
          {oficina.especialidades.slice(0, 3).map((esp, idx) => (
            <View key={idx} style={[styles.badge, { backgroundColor: theme.tint + '30' }]}>
              <ThemedText style={[styles.badgeText, { color: theme.tint }]}>
                {esp}
              </ThemedText>
            </View>
          ))}
          {oficina.especialidades.length > 3 && (
            <ThemedText style={styles.moreIndicator}>+{oficina.especialidades.length - 3}</ThemedText>
          )}
        </View>

        {isExpanded && (
          <View style={styles.expandedContent}>
            <View style={styles.divider} />
            <View style={styles.contactButtons}>
              <TouchableOpacity 
                style={[styles.contactButton, { backgroundColor: theme.tint + '20' }]}
                onPress={handleCall}>
                <ThemedText style={[styles.contactButtonText, { color: theme.tint }]}>
                  📞 Ligar
                </ThemedText>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.contactButton, { backgroundColor: theme.tint + '20' }]}
                onPress={handleEmail}>
                <ThemedText style={[styles.contactButtonText, { color: theme.tint }]}>
                  ✉️ Email
                </ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <TouchableOpacity 
          onPress={() => setIsExpanded(!isExpanded)}
          style={styles.expandButton}>
          <ThemedText style={styles.expandButtonText}>
            {isExpanded ? '▲ Menos detalhes' : '▼ Mais detalhes'}
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  cardExpanded: {
    borderColor: '#0a7ea4',
    borderWidth: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  titleContainer: {
    flex: 1,
    marginRight: 8,
  },
  nome: {
    fontSize: 16,
    fontWeight: '600',
  },
  favoriteIcon: {
    fontSize: 20,
  },
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
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
  statusIndicator: {
    fontSize: 12,
    fontWeight: '500',
  },
  endereco: {
    fontSize: 13,
    opacity: 0.7,
    marginBottom: 6,
    lineHeight: 18,
  },
  horario: {
    marginBottom: 8,
  },
  horarioText: {
    fontSize: 13,
    fontWeight: '500',
  },
  especialidades: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 12,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  moreIndicator: {
    fontSize: 12,
    fontWeight: '500',
    paddingHorizontal: 10,
    paddingVertical: 6,
    opacity: 0.6,
  },
  expandedContent: {
    marginTop: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginBottom: 12,
  },
  contactButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  contactButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  contactButtonText: {
    fontWeight: '600',
    fontSize: 13,
  },
  expandButton: {
    paddingVertical: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  expandButtonText: {
    fontSize: 12,
    opacity: 0.6,
    fontWeight: '500',
  },
});
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
