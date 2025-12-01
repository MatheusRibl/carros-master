import { useState, useCallback } from 'react';
import type { Comunidade, Compartilhamento, Referencia } from '../types/index';

export function useColaborativeFeatures() {
  const [comunidades] = useState<Comunidade[]>([
    {
      id: '1',
      nome: 'Proprietários de Corolla',
      descricao: 'Comunidade para donos de Toyota Corolla compartilharem experiências',
      membros: 234,
      tema: 'carros',
      criador: 'user1',
      dataCriacao: '2024-01-15',
    },
    {
      id: '2',
      nome: 'Economia Colaborativa SP',
      descricao: 'Grupo para compartilhar custos de manutenção',
      membros: 1200,
      tema: 'economia',
      criador: 'user2',
      dataCriacao: '2023-06-20',
    },
  ]);

  const [compartilhamentos] = useState<Compartilhamento[]>([
    {
      id: 'comp1',
      titulo: 'Serviço de Revisão em Grupo - 30% de desconto',
      descricao: 'Revisão completa na AutoCar. Quanto mais gente, maior o desconto!',
      custo: 450,
      participantes: ['user1', 'user2'],
      oficina: {
        id: '1',
        nome: 'AutoCar',
        endereco: 'Rua A, 123',
        telefone: '1133334444',
        email: 'contato@autocar.com',
        rating: 4.8,
        avaliacoes: 156,
        especialidades: ['Revisão', 'Alinhamento'],
        horarioAbertura: '08:00',
        horarioFechamento: '18:00',
        diasFuncionamento: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'],
      },
      servico: {
        id: 'serv1',
        oficinaId: '1',
        nome: 'Revisão Completa',
        descricao: 'Revisão completa do veículo',
        preco: 450,
        tempoEstimado: 120,
        categoria: 'manutencao',
      },
      dataAgendamento: '2024-12-15',
      status: 'aberto',
    },
  ]);

  const [referencias] = useState<Referencia[]>([
    {
      id: 'ref1',
      usuarioReferidor: 'user1',
      usuarioIndicado: 'user3',
      desconto: 50,
      dataCriacao: '2024-11-20',
      utilizada: false,
    },
  ]);

  const criarCompartilhamento = useCallback((data: Omit<Compartilhamento, 'id'>) => {
    const novo: Compartilhamento = {
      ...data,
      id: `comp${Date.now()}`,
    };
    return novo;
  }, []);

  const adicionarParticipante = useCallback(
    (compartilhamentoId: string, usuarioId: string) => {
      return {
        sucesso: true,
        novoPreco: 400,
        proximoPreco: 350,
      };
    },
    []
  );

  const obterComunidadesDoUsuario = useCallback((usuarioId: string) => {
    return comunidades.filter((c) => Math.random() > 0.5);
  }, [comunidades]);

  const buscarCompartilhamentosProximos = useCallback((lat: number, lng: number) => {
    return compartilhamentos;
  }, [compartilhamentos]);

  return {
    comunidades,
    compartilhamentos,
    referencias,
    criarCompartilhamento,
    adicionarParticipante,
    obterComunidadesDoUsuario,
    buscarCompartilhamentosProximos,
  };
}
