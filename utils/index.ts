/**
 * Funções utilitárias para o app de agendamento
 */

export const DateUtils = {
  /**
   * Formata data para formato brasileiro (dd/mm/yyyy)
   */
  formatarDataBr: (data: string | Date): string => {
    const date = typeof data === 'string' ? new Date(data) : data;
    return date.toLocaleDateString('pt-BR');
  },

  /**
   * Formata data e hora
   */
  formatarDataHora: (data: string, hora: string): string => {
    const date = new Date(data);
    return `${date.toLocaleDateString('pt-BR')} às ${hora}`;
  },

  /**
   * Retorna quanto tempo falta até a data
   */
  tempoFalta: (data: string): string => {
    const now = new Date();
    const target = new Date(data);
    const diff = target.getTime() - now.getTime();

    if (diff < 0) return 'Passou';

    const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (dias > 0) return `${dias}d ${horas}h`;
    return `${horas}h`;
  },

  /**
   * Verifica se é hoje
   */
  ehHoje: (data: string): boolean => {
    const date = new Date(data);
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  },

  /**
   * Verifica se é amanhã
   */
  ehAmanha: (data: string): boolean => {
    const date = new Date(data);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return (
      date.getDate() === tomorrow.getDate() &&
      date.getMonth() === tomorrow.getMonth() &&
      date.getFullYear() === tomorrow.getFullYear()
    );
  },
};

export const FormatUtils = {
  /**
   * Formata telefone (XX) XXXXX-XXXX
   */
  formatarTelefone: (telefone: string): string => {
    const numbers = telefone.replace(/\D/g, '');
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
  },

  /**
   * Formata placa de carro (XXX-XXXX)
   */
  formatarPlaca: (placa: string): string => {
    return `${placa.slice(0, 3)}-${placa.slice(3)}`;
  },

  /**
   * Formata valor em real
   */
  formatarMoeda: (valor: number): string => {
    return `R$ ${valor.toFixed(2).replace('.', ',')}`;
  },

  /**
   * Formata tempo em minutos para texto legível
   */
  formatarTempo: (minutos: number): string => {
    if (minutos < 60) return `${minutos}min`;
    const horas = Math.floor(minutos / 60);
    const mins = minutos % 60;
    if (mins === 0) return `${horas}h`;
    return `${horas}h ${mins}min`;
  },
};

export const ValidationUtils = {
  /**
   * Valida email
   */
  ehEmailValido: (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  },

  /**
   * Valida telefone brasileiro
   */
  ehTelefoneValido: (telefone: string): boolean => {
    const numbers = telefone.replace(/\D/g, '');
    return numbers.length === 11;
  },

  /**
   * Valida placa de carro
   */
  ehPlacaValida: (placa: string): boolean => {
    return placa.length === 8 && /^[A-Z]{3}\d{4}$/.test(placa.replace('-', ''));
  },
};

export const SearchUtils = {
  /**
   * Normaliza texto para busca (remove acentos, converte para minúsculas)
   */
  normalizarParaBusca: (texto: string): string => {
    return texto
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  },

  /**
   * Verifica se texto contém query (busca com normalização)
   */
  contemBusca: (texto: string, query: string): boolean => {
    return SearchUtils.normalizarParaBusca(texto).includes(
      SearchUtils.normalizarParaBusca(query)
    );
  },
};
