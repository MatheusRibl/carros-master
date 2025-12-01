import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { StatusBadge } from '@/components/status-badge';
import { Colors } from '@/constants/theme';
import { FormatUtils, DateUtils } from '../utils/index';
import { useColorScheme } from '@/hooks/use-color-scheme';
import type { Agendamento, Oficina, Servico, Veiculo } from '../types/index.js';

interface AgendamentoItemProps {
  agendamento: Agendamento;
  oficina: Oficina;
  servico: Servico;
  veiculo: Veiculo;
}

const statusColors: Record<string, string> = {
  confirmado: '#4CAF50',
  pendente: '#FFC107',
  concluido: '#2196F3',
  cancelado: '#F44336',
};

const statusLabels: Record<string, string> = {
  confirmado: '✓ Confirmado',
  pendente: '⏳ Pendente',
  concluido: '✓ Concluído',
  cancelado: '✗ Cancelado',
};

export function AgendamentoItem({
  agendamento,
  oficina,
  servico,
  veiculo,
}: AgendamentoItemProps) {
  const colorScheme = useColorScheme() as 'light' | 'dark';
  const theme = Colors[colorScheme];
  const [isExpanded, setIsExpanded] = React.useState(false);

  // Formatar data
  const dataFormatada = DateUtils.formatarDataBr(agendamento.dataAgendamento);
  const tempoFalta = DateUtils.tempoFalta(agendamento.dataAgendamento);
  const ehHoje = DateUtils.ehHoje(agendamento.dataAgendamento);
  const ehAmanha = DateUtils.ehAmanha(agendamento.dataAgendamento);

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.title}>
          <ThemedText type="defaultSemiBold" style={styles.servico}>
            {servico.nome}
          </ThemedText>
          <ThemedText style={styles.oficina}>{oficina.nome}</ThemedText>
        </View>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: statusColors[agendamento.status] + '30' },
          ]}
        >
          <ThemedText style={[styles.status, { color: statusColors[agendamento.status] }]}>
            {statusLabels[agendamento.status]}
          </ThemedText>
        </View>
      </View>

      <View style={styles.details}>
        <View style={styles.detailRow}>
          <ThemedText style={styles.label}>📅 Data:</ThemedText>
          <ThemedText style={styles.value}>
            {dataFormatada} às {agendamento.horaAgendamento}
          </ThemedText>
        </View>

        <View style={styles.detailRow}>
          <ThemedText style={styles.label}>🚗 Veículo:</ThemedText>
          <ThemedText style={styles.value}>
            {veiculo.marca} {veiculo.modelo} ({veiculo.placa})
          </ThemedText>
        </View>

        <View style={styles.detailRow}>
          <ThemedText style={styles.label}>💰 Preço:</ThemedText>
          <ThemedText style={styles.value}>R$ {servico.preco.toFixed(2)}</ThemedText>
        </View>

        {agendamento.observacoes && (
          <View style={styles.detailRow}>
            <ThemedText style={styles.label}>📝 Obs:</ThemedText>
            <ThemedText style={styles.value}>{agendamento.observacoes}</ThemedText>
          </View>
        )}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
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
    marginBottom: 12,
  },
  title: {
    flex: 1,
  },
  servico: {
    fontSize: 15,
    marginBottom: 4,
  },
  oficina: {
    fontSize: 12,
    opacity: 0.6,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  status: {
    fontSize: 12,
    fontWeight: '600',
  },
  details: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
  },
  value: {
    fontSize: 12,
    opacity: 0.7,
    flex: 1,
    textAlign: 'right',
  },
});
