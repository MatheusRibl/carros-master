import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { FormatUtils } from '../utils/index';
import type { Compartilhamento } from '../types/index';

interface CompartilhamentoCardProps {
  compartilhamento: Compartilhamento;
  onJoin?: () => void;
}

export function CompartilhamentoCard({ compartilhamento, onJoin }: CompartilhamentoCardProps) {
  const colorScheme = useColorScheme() as 'light' | 'dark';
  const theme = Colors[colorScheme];
  const [isExpanded, setIsExpanded] = useState(false);

  const percentualCheio = (compartilhamento.participantes.length / 5) * 100;
  const proximoDesconto = Math.min(percentualCheio + 10, 40);
  const precoAtual = compartilhamento.custo * (1 - percentualCheio / 100);

  return (
    <ThemedView style={[styles.card, isExpanded && styles.cardExpanded]}>
      <TouchableOpacity 
        onPress={() => setIsExpanded(!isExpanded)}
        activeOpacity={0.7}>
        <View style={styles.header}>
          <View style={styles.titleSection}>
            <ThemedText style={styles.economy}>💰 COMPARTILHADO</ThemedText>
            <ThemedText type="defaultSemiBold" style={styles.titulo}>
              {compartilhamento.titulo}
            </ThemedText>
            <ThemedText style={styles.oficina}>
              📍 {compartilhamento.oficina.nome}
            </ThemedText>
          </View>
          <View style={[styles.discountBox, { backgroundColor: theme.tint + '30' }]}>
            <ThemedText style={[styles.discount, { color: theme.tint }]}>
              até {proximoDesconto}% OFF
            </ThemedText>
          </View>
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressLabels}>
            <ThemedText style={styles.progressText}>
              {compartilhamento.participantes.length} / 5 participantes
            </ThemedText>
            <ThemedText style={[styles.priceText, { color: theme.tint }]}>
              {FormatUtils.formatarMoeda(precoAtual)}
            </ThemedText>
          </View>
          <View style={[styles.progressBar, { backgroundColor: theme.tint + '20' }]}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${percentualCheio}%`,
                  backgroundColor: theme.tint,
                },
              ]}
            />
          </View>
        </View>

        {isExpanded && (
          <View style={styles.expandedContent}>
            <View style={styles.divider} />

            <ThemedText style={styles.sectionTitle}>Detalhes</ThemedText>
            <ThemedText style={styles.descricao}>{compartilhamento.descricao}</ThemedText>

            <ThemedText style={styles.sectionTitle}>Participantes</ThemedText>
            <View style={styles.participantesAvatars}>
              {compartilhamento.participantes.map((_, idx) => (
                <View
                  key={idx}
                  style={[styles.avatar, { backgroundColor: theme.tint + '40' }]}>
                  <ThemedText style={styles.avatarText}>{idx + 1}</ThemedText>
                </View>
              ))}
              {compartilhamento.participantes.length < 5 && (
                <View
                  style={[styles.avatar, styles.avatarVago]}>
                  <ThemedText style={styles.avatarText}>+</ThemedText>
                </View>
              )}
            </View>

            <ThemedText style={styles.sectionTitle}>Preço por participante</ThemedText>
            <View style={styles.priceBreakdown}>
              <View style={styles.priceRow}>
                <ThemedText>Preço original:</ThemedText>
                <ThemedText>{FormatUtils.formatarMoeda(compartilhamento.custo)}</ThemedText>
              </View>
              <View style={styles.priceRow}>
                <ThemedText>Desconto ({percentualCheio.toFixed(0)}%):</ThemedText>
                <ThemedText style={{ color: theme.tint }}>
                  -{FormatUtils.formatarMoeda(compartilhamento.custo * (percentualCheio / 100))}
                </ThemedText>
              </View>
              <View style={[styles.priceRow, styles.priceRowBold]}>
                <ThemedText style={styles.priceBold}>Seu preço agora:</ThemedText>
                <ThemedText style={[styles.priceBold, { color: theme.tint }]}>
                  {FormatUtils.formatarMoeda(precoAtual)}
                </ThemedText>
              </View>
            </View>

            <ThemedText style={styles.sectionTitle}>Data</ThemedText>
            <ThemedText style={styles.data}>📅 {compartilhamento.dataAgendamento}</ThemedText>

            <TouchableOpacity 
              style={[styles.joinButton, { backgroundColor: theme.tint }]}
              onPress={onJoin}
              activeOpacity={0.7}>
              <ThemedText style={styles.joinButtonText}>Entrar neste grupo! 🎉</ThemedText>
            </TouchableOpacity>
          </View>
        )}
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  cardExpanded: {
    borderColor: '#0a7ea4',
    borderWidth: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  titleSection: {
    flex: 1,
    marginRight: 8,
  },
  economy: {
    fontSize: 11,
    fontWeight: '700',
    backgroundColor: '#FFD700',
    color: '#333',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 4,
    overflow: 'hidden',
  },
  titulo: {
    fontSize: 15,
    marginBottom: 4,
  },
  oficina: {
    fontSize: 12,
    opacity: 0.7,
  },
  discountBox: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  discount: {
    fontSize: 14,
    fontWeight: '700',
  },
  progressContainer: {
    marginBottom: 12,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600',
  },
  priceText: {
    fontSize: 14,
    fontWeight: '700',
  },
  progressBar: {
    height: 12,
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressFill: {
    height: 12,
    borderRadius: 6,
  },
  expandedContent: {
    marginTop: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 6,
    marginTop: 8,
  },
  descricao: {
    fontSize: 12,
    opacity: 0.7,
    lineHeight: 18,
    marginBottom: 8,
  },
  participantesAvatars: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarVago: {
    borderWidth: 2,
    borderColor: '#ccc',
    borderStyle: 'dashed',
  },
  avatarText: {
    fontSize: 14,
    fontWeight: '700',
  },
  priceBreakdown: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 8,
    gap: 6,
    marginBottom: 12,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 12,
  },
  priceRowBold: {
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 6,
    marginTop: 6,
  },
  priceBold: {
    fontWeight: '700',
  },
  data: {
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 12,
  },
  joinButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  joinButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 14,
  },
});
