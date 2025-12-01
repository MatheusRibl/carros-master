import { useMemo } from 'react';
import {
  usuarioAtual,
  veiculosDoUsuario,
  oficinas,
  servicos,
  agendamentosDoUsuario,
} from '../data/mock.js';
import type { Oficina, Veiculo, Servico, Agendamento, Usuario } from '../types/index';

interface UseMockDataReturn {
  usuario: Usuario;
  veiculos: Veiculo[];
  oficinas: Oficina[];
  servicos: Servico[];
  agendamentos: Agendamento[];
  getOficinaById: (id: string) => Oficina | undefined;
  getVeiculoById: (id: string) => Veiculo | undefined;
  getServicoById: (id: string) => Servico | undefined;
  getAgendamentoDetails: (agendamento: Agendamento) => {
    agendamento: Agendamento;
    oficina: Oficina | undefined;
    servico: Servico | undefined;
    veiculo: Veiculo | undefined;
  };
  getAgendamentosPorStatus: (status: Agendamento['status']) => Agendamento[];
}

export function useMockData(): UseMockDataReturn {
  const getOficinaById = useMemo(
    () => (id: string) => oficinas.find((o) => o.id === id),
    []
  );

  const getVeiculoById = useMemo(
    () => (id: string) => veiculosDoUsuario.find((v) => v.id === id),
    []
  );

  const getServicoById = useMemo(
    () => (id: string) => servicos.find((s) => s.id === id),
    []
  );

  const getAgendamentoDetails = useMemo(
    () => (agendamento: Agendamento) => ({
      agendamento,
      oficina: getOficinaById(agendamento.oficinaId),
      servico: getServicoById(agendamento.servicoId),
      veiculo: getVeiculoById(agendamento.veiculoId),
    }),
    [getOficinaById, getServicoById, getVeiculoById]
  );

  const getAgendamentosPorStatus = useMemo(
    () => (status: Agendamento['status']) =>
      agendamentosDoUsuario.filter((a) => a.status === status),
    []
  );

  return {
    usuario: usuarioAtual,
    veiculos: veiculosDoUsuario,
    oficinas,
    servicos,
    agendamentos: agendamentosDoUsuario,
    getOficinaById,
    getVeiculoById,
    getServicoById,
    getAgendamentoDetails,
    getAgendamentosPorStatus,
  };
}
