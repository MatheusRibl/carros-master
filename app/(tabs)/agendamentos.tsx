import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { AgendamentoItem } from '@/components/agendamento-item';
import {
  agendamentosDoUsuario,
  veiculosDoUsuario,
  oficinas,
  servicos,
} from '../../data/mock.js';

export default function AgendamentosScreen() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title">📅 Meus Agendamentos</ThemedText>
        <ThemedText style={styles.subtitle}>
          {agendamentosDoUsuario.length} agendamento
          {agendamentosDoUsuario.length !== 1 ? 's' : ''}
        </ThemedText>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}>
        {agendamentosDoUsuario.length > 0 ? (
          agendamentosDoUsuario.map((agendamento) => {
            const veiculo = veiculosDoUsuario.find((v: any) => v.id === agendamento.veiculoId);
            const oficina = oficinas.find((o: any) => o.id === agendamento.oficinaId);
            const servico = servicos.find((s: any) => s.id === agendamento.servicoId);

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
            <ThemedText style={styles.emptyStateTitle}>Nenhum agendamento</ThemedText>
            <ThemedText style={styles.emptyStateText}>
              Você ainda não agendou nenhum serviço. Vá até Início para agendar!
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
