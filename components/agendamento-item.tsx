import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import type { Agendamento, Oficina, Servico, Veiculo } from '../types/index.js';

interface AgendamentoItemProps {
  agendamento: Agendamento;
  oficina: Oficina;
  servico: Servico;
  veiculo: Veiculo;
}

const statusLabels: Record<string, string> = {
  pendente: '⏳ Pendente',
  confirmado: '✅ Confirmado',
  em_andamento: '🔧 Em Andamento',
  concluido: '✔️ Concluído',
  cancelado: '❌ Cancelado',
};

const statusColors: Record<string, string> = {
  pendente: '#FFA500',
  confirmado: '#4CAF50',
  em_andamento: '#2196F3',
  concluido: '#4CAF50',
  cancelado: '#F44336',
};

export function AgendamentoItem({
  agendamento,
  oficina,
  servico,
  veiculo,
}: AgendamentoItemProps) {
  // Formatar data
  const data = new Date(agendamento.dataAgendamento);
  const dataFormatada = data.toLocaleDateString('pt-BR', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
  });

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
