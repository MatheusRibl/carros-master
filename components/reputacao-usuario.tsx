import React from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

interface ReputacaoUsuarioProps {
  usuarioId: string;
}

export function ReputacaoUsuario({ usuarioId }: ReputacaoUsuarioProps) {
  const colorScheme = useColorScheme() as 'light' | 'dark';
  const theme = Colors[colorScheme];

  const reputacao = {
    score: 4.7,
    totalAvaliacoes: 24,
    servicosCompletados: 18,
    recomendacoes: 12,
    badges: [
      { emoji: '⭐', titulo: 'Usuário Confiável', descricao: '10+ avaliações com 4+ stars' },
      { emoji: '🤝', titulo: 'Colaborativo', descricao: 'Participou de 5+ compartilhamentos' },
      { emoji: '💬', titulo: 'Ativo na Comunidade', descricao 'Membro de 3+ comunidades' },
    ],
  };

  const reviews = [
    { autor: 'João Silva', rating: 5, texto: 'Ótimo! Recomendo demais.', data: '2024-11-15' },
    { autor: 'Maria Santos', rating: 4, texto: 'Muito bom, voltaria a contratar.', data: '2024-11-10' },
  ];

  return (
    <ThemedView style={styles.container}>
      <View style={styles.scoreSection}>
        <View style={styles.scoreBox}>
          <ThemedText style={[styles.score, { color: theme.tint }]}>
            {reputacao.score}
          </ThemedText>
          <ThemedText style={styles.scoreLabel}>Reputação</ThemedText>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <ThemedText style={styles.statValue}>{reputacao.totalAvaliacoes}</ThemedText>
            <ThemedText style={styles.statLabel}>Avaliações</ThemedText>
          </View>
          <View style={styles.stat}>
            <ThemedText style={styles.statValue}>{reputacao.servicosCompletados}</ThemedText>
            <ThemedText style={styles.statLabel}>Serviços</ThemedText>
          </View>
          <View style={styles.stat}>
            <ThemedText style={styles.statValue}>{reputacao.recomendacoes}</ThemedText>
            <ThemedText style={styles.statLabel}>Recomendações</ThemedText>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>🏅 Badges</ThemedText>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.badgesList}>
          {reputacao.badges.map((badge, idx) => (
            <TouchableOpacity key={idx} style={styles.badge} activeOpacity={0.7}>
              <ThemedText style={styles.badgeEmoji}>{badge.emoji}</ThemedText>
              <ThemedText style={styles.badgeTitle}>{badge.titulo}</ThemedText>
              <ThemedText style={styles.badgeDesc}>{badge.descricao}</ThemedText>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>⭐ Avaliações Recentes</ThemedText>
        {reviews.map((review, idx) => (
          <View key={idx} style={styles.review}>
            <View style={styles.reviewHeader}>
              <ThemedText style={styles.reviewer}>{review.autor}</ThemedText>
              <View style={styles.ratingStars}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <ThemedText key={i} style={styles.star}>
                    {i < review.rating ? '⭐' : '☆'}
                  </ThemedText>
                ))}
              </View>
            </View>
            <ThemedText style={styles.reviewText}>{review.texto}</ThemedText>
            <ThemedText style={styles.reviewDate}>{review.data}</ThemedText>
          </View>
        ))}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  scoreSection: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  scoreBox: {
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#0a7ea4',
    minWidth: 120,
  },
  score: {
    fontSize: 32,
    fontWeight: '700',
  },
  scoreLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  statsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 11,
    opacity: 0.6,
    marginTop: 4,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 12,
  },
  badgesList: {
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  badge: {
    width: 100,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    alignItems: 'center',
    marginRight: 8,
  },
  badgeEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  badgeTitle: {
    fontSize: 11,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 4,
  },
  badgeDesc: {
    fontSize: 9,
    opacity: 0.6,
    textAlign: 'center',
  },
  review: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewer: {
    fontWeight: '700',
    fontSize: 12,
  },
  ratingStars: {
    flexDirection: 'row',
    gap: 2,
  },
  star: {
    fontSize: 12,
  },
  reviewText: {
    fontSize: 12,
    opacity: 0.8,
    marginBottom: 4,
    lineHeight: 16,
  },
  reviewDate: {
    fontSize: 10,
    opacity: 0.5,
  },
});
