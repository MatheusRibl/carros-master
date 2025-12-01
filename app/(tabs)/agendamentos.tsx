import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { AgendamentoItem } from '@/components/agendamento-item';
import { useMockData } from '../../hooks/use-mock-data';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import type { Agendamento } from '../../types/index';

export default function AgendamentosScreen() {
  const colorScheme = useColorScheme() as 'light' | 'dark';
  const theme = Colors[colorScheme];
  const { agendamentos, getOficinaById, getServicoById, getVeiculoById } = useMockData();
  const [filterStatus, setFilterStatus] = React.useState<Agendamento['status'] | 'todos'>('todos');

  const filteredAgendamentos = useMemo(() => {
    if (filterStatus === 'todos') return agendamentos;
    return agendamentos.filter(a => a.status === filterStatus);
  }, [agendamentos, filterStatus]);

  const agendamentosOrdenados = useMemo(() => {
    return [...filteredAgendamentos].sort((a, b) => 
      new Date(b.dataAgendamento).getTime() - new Date(a.dataAgendamento).getTime()
    );
  }, [filteredAgendamentos]);

  const statusCounts = useMemo(() => ({
    todos: agendamentos.length,
    confirmado: agendamentos.filter(a => a.status === 'confirmado').length,
    pendente: agendamentos.filter(a => a.status === 'pendente').length,
    concluido: agendamentos.filter(a => a.status === 'concluido').length,
  }), [agendamentos]);

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title">📅 Meus Agendamentos</ThemedText>
        <ThemedText style={styles.subtitle}>
          {agendamentos.length} agendamento{agendamentos.length !== 1 ? 's' : ''}
        </ThemedText>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterScroll}
        contentContainerStyle={styles.filterContent}>
        {(['todos', 'confirmado', 'pendente', 'concluido'] as const).map((status) => (
          <TouchableOpacity
            key={status}
            style={[
              styles.filterButton,
              filterStatus === status && styles.filterButtonActive
            ]}
            onPress={() => setFilterStatus(status)}>
            <ThemedText style={[
              styles.filterText,
              filterStatus === status && styles.filterTextActive
            ]}>
              {status === 'todos' && `✓ Todos (${statusCounts.todos})`}
              {status === 'confirmado' && `✓ Confirmado (${statusCounts.confirmado})`}
              {status === 'pendente' && `⏳ Pendente (${statusCounts.pendente})`}
              {status === 'concluido' && `✓ Concluído (${statusCounts.concluido})`}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}>
        {agendamentosOrdenados.length > 0 ? (
          agendamentosOrdenados.map((agendamento: any) => {
            const veiculo = getVeiculoById(agendamento.veiculoId);
            const oficina = getOficinaById(agendamento.oficinaId);
            const servico = getServicoById(agendamento.servicoId);

            if (!veiculo || !oficina || !servico) return null;

            return (
              <AgendamentoItem
                key={agendamento.id}
                agendamento={agendamento}
                oficina={oficina}
                servico={servico}
                veiculo={veiculo}
              />
            );
          })
        ) : (
          <View style={styles.emptyState}>
            <ThemedText style={styles.emptyStateTitle}>
              {filterStatus === 'todos' ? '📭 Nenhum agendamento' : '🔍 Nenhum encontrado'}
            </ThemedText>
            <ThemedText style={styles.emptyStateText}>
              {filterStatus === 'todos' 
                ? 'Você ainda não agendou nenhum serviço. Vá até Início para agendar!'
                : `Nenhum agendamento com status "${filterStatus}".`}
            </ThemedText>
          </View>
        )}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  subtitle: {
    fontSize: 13,
    opacity: 0.6,
    marginTop: 4,
  },
  filterScroll: {
    paddingVertical: 12,
  },
  filterContent: {
    paddingHorizontal: 12,
    gap: 8,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  filterButtonActive: {
    borderWidth: 2,
    borderColor: '#0a7ea4',
    backgroundColor: '#0a7ea4' + '15',
  },
  filterText: {
    fontSize: 12,
    fontWeight: '500',
  },
  filterTextActive: {
    fontWeight: '700',
    color: '#0a7ea4',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingVertical: 8,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyStateTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    opacity: 0.6,
    textAlign: 'center',
    paddingHorizontal: 32,
  },
});
