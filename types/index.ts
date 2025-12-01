// Tipos de dados para o app de agendamento de manutenção mecânica

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  foto?: string;
  dataCriacao: string;
}

export interface Veiculo {
  id: string;
  usuarioId: string;
  marca: string;
  modelo: string;
  ano: number;
  placa: string;
  cor: string;
}

export interface Oficina {
  id: string;
  nome: string;
  endereco: string;
  telefone: string;
  email: string;
  rating: number;
  avaliacoes: number;
  foto?: string;
  especialidades: string[];
  horarioAbertura: string;
  horarioFechamento: string;
  diasFuncionamento: string[];
}

export interface Servico {
  id: string;
  oficinaId: string;
  nome: string;
  descricao: string;
  preco: number;
  tempoEstimado: number; // em minutos
  categoria: 'manutencao' | 'reparo' | 'inspecao' | 'limpeza';
}

export interface Agendamento {
  id: string;
  usuarioId: string;
  veiculoId: string;
  oficinaId: string;
  servicoId: string;
  dataAgendamento: string; // ISO format
  horaAgendamento: string; // HH:mm
  status: 'pendente' | 'confirmado' | 'em_andamento' | 'concluido' | 'cancelado';
  observacoes?: string;
  dataCriacao: string;
}

export interface Avaliacao {
  id: string;
  agendamentoId: string;
  usuarioId: string;
  oficinaId: string;
  rating: number; // 1-5
  comentario: string;
  dataCriacao: string;
}
