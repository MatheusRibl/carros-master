import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView, Share } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

interface ReferenceWidgetProps {
  usuarioId: string;
}

export function ReferenceWidget({ usuarioId }: ReferenceWidgetProps) {
  const colorScheme = useColorScheme() as 'light' | 'dark';
  const theme = Colors[colorScheme];
  const [copied, setCopied] = useState(false);

  const codigoReferencia = `REFERENCIA_${usuarioId.toUpperCase().slice(0, 6)}`;
  const descontoReferencia = 'R$ 50,00';

  const handleCopyCode = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Juntem-se a mim no app de agendamento mecânico! Use o código ${codigoReferencia} e receba R$ 50 de desconto. Vamos economizar juntos! 🚗💰`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.title}>🎁 Indique e Ganhe</ThemedText>
        <ThemedText style={styles.subtitle}>Compartilhe com amigos e receba descontos</ThemedText>
      </View>

      <View style={[styles.referenceCard, { backgroundColor: theme.tint + '10', borderColor: theme.tint }]}>
        <ThemedText style={styles.cardTitle}>Seu código de referência</ThemedText>

        <View style={[styles.codeBox, { backgroundColor: theme.tint + '20', borderColor: theme.tint }]}>
          <ThemedText style={[styles.code, { color: theme.tint }]}>
            {codigoReferencia}
          </ThemedText>
        </View>

        <View style={styles.benefitsContainer}>
          <View style={styles.benefit}>
            <ThemedText style={styles.benefitEmoji}>🎯</ThemedText>
            <ThemedText style={styles.benefitText}>Você ganha {descontoReferencia}</ThemedText>
          </View>
          <View style={styles.benefit}>
            <ThemedText style={styles.benefitEmoji}>👥</ThemedText>
            <ThemedText style={styles.benefitText}>Seu amigo ganha {descontoReferencia}</ThemedText>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.tint }]}
            onPress={handleCopyCode}
            activeOpacity={0.7}>
            <ThemedText style={styles.buttonText}>
              {copied ? '✓ Copiado!' : '📋 Copiar código'}
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.shareButton]}
            onPress={handleShare}
            activeOpacity={0.7}>
            <ThemedText style={[styles.buttonText, styles.shareButtonText]}>
              📤 Compartilhar
            </ThemedText>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <ThemedText style={styles.statValue}>5</ThemedText>
          <ThemedText style={styles.statLabel}>Indicações</ThemedText>
        </View>
        <View style={styles.stat}>
          <ThemedText style={styles.statValue}>3</ThemedText>
          <ThemedText style={styles.statLabel}>Convertidas</ThemedText>
        </View>
        <View style={styles.stat}>
          <ThemedText style={[styles.statValue, { color: theme.tint }]}>
            R$ 150
          </ThemedText>
          <ThemedText style={styles.statLabel}>Economizado</ThemedText>
        </View>
      </View>

      <View style={styles.historyContainer}>
        <ThemedText style={styles.historyTitle}>📊 Histórico de indicações</ThemedText>

        {[
          { nome: 'Ana Silva', status: 'Convertida', data: '2024-11-20', valor: 'R$ 50' },
          { nome: 'Carlos Santos', status: 'Pendente', data: '2024-11-15', valor: 'Aguardando' },
          { nome: 'Marina Costa', status: 'Convertida', data: '2024-11-10', valor: 'R$ 50' },
        ].map((referencia, idx) => (
          <View key={idx} style={styles.historyItem}>
            <View style={styles.historyInfo}>
              <ThemedText style={styles.historyName}>{referencia.nome}</ThemedText>
              <ThemedText style={styles.historyDate}>{referencia.data}</ThemedText>
            </View>
            <View style={styles.historyStatus}>
              <View
                style={[
                  styles.statusBadge,
                  {
                    backgroundColor:
                      referencia.status === 'Convertida'
                        ? '#E8F5E9'
                        : '#FFF3E0',
                  },
                ]}>
                <ThemedText
                  style={[
                    styles.statusText,
                    {
                      color:
                        referencia.status === 'Convertida'
                          ? '#2E7D32'
                          : '#E65100',
                    },
                  ]}>
                  {referencia.status}
                </ThemedText>
              </View>
              <ThemedText style={styles.historyValue}>{referencia.valor}</ThemedText>
            </View>
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
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    opacity: 0.6,
  },
  referenceCard: {
    borderWidth: 2,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 12,
  },
  codeBox: {
    borderWidth: 2,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  code: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 1,
  },
  benefitsContainer: {
    gap: 8,
    marginBottom: 12,
  },
  benefit: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  benefitEmoji: {
    fontSize: 16,
  },
  benefitText: {
    fontSize: 12,
    fontWeight: '500',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  shareButton: {
    borderWidth: 1,
    borderColor: '#0a7ea4',
    backgroundColor: 'transparent',
  },
  buttonText: {
    fontWeight: '700',
    fontSize: 12,
    color: 'white',
  },
  shareButtonText: {
    color: '#0a7ea4',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 11,
    opacity: 0.6,
    marginTop: 4,
  },
  historyContainer: {
    marginTop: 20,
  },
  historyTitle: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 12,
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  historyInfo: {
    flex: 1,
  },
  historyName: {
    fontWeight: '600',
    fontSize: 12,
    marginBottom: 2,
  },
  historyDate: {
    fontSize: 11,
    opacity: 0.5,
  },
  historyStatus: {
    alignItems: 'flex-end',
    gap: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  historyValue: {
    fontSize: 12,
    fontWeight: '700',
  },
});
