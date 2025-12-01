/**
 * 📱 GUIA PRÁTICO - COMO USAR AS FEATURES
 */

// ============================================================================
// 1. BUSCAR OFICINAS COM FILTROS AVANÇADOS
// ============================================================================

import { useMockData } from '@/hooks/use-mock-data';
import { SearchUtils } from '@/utils/index';

export function ExemploHome() {
  const { oficinas } = useMockData();
  
  // Buscar com normalização (remove acentos, maiúsculas)
  const termo = "carro"; // "CáRrO" funcionaria igual
  
  const resultado = oficinas.filter((oficina) => {
    return (
      SearchUtils.contemBusca(oficina.nome, termo) ||
      SearchUtils.contemBusca(oficina.endereco, termo) ||
      oficina.especialidades.some(esp => SearchUtils.contemBusca(esp, termo))
    );
  });
  
  // Ordenar por rating
  resultado.sort((a, b) => b.rating - a.rating);
  
  return resultado;
}

// ============================================================================
// 2. GERENCIAR FAVORITAS
// ============================================================================

export function ExemploFavoritas() {
  const [favorites, setFavorites] = React.useState<string[]>([]);
  
  // Adicionar/remover
  const toggleFavorite = (oficinaId: string) => {
    setFavorites(prev =>
      prev.includes(oficinaId)
        ? prev.filter(id => id !== oficinaId)  // Remove
        : [...prev, oficinaId]                  // Adiciona
    );
  };
  
  // Mostrar só favoritas
  const favoritas = oficinas.filter(o => favorites.includes(o.id));
  
  return favorites.length;
}

// ============================================================================
// 3. TRABALHAR COM AGENDAMENTOS E STATUS
// ============================================================================

import { useMockData } from '@/hooks/use-mock-data';
import { DateUtils } from '@/utils/index';
import type { Agendamento } from '@/types/index';

export function ExemploAgendamentos() {
  const { agendamentos, getOficinaById, getServicoById, getVeiculoById } = useMockData();
  
  // Filtrar por status
  const confirmados = agendamentos.filter(a => a.status === 'confirmado');
  const pendentes = agendamentos.filter(a => a.status === 'pendente');
  const proximos = agendamentos.filter(a => a.status === 'em_andamento');
  
  // Para cada agendamento, obter dados relacionados
  agendamentos.forEach(agendamento => {
    const oficina = getOficinaById(agendamento.oficinaId);
    const servico = getServicoById(agendamento.servicoId);
    const veiculo = getVeiculoById(agendamento.veiculoId);
    
    // Usar dados para renderizar
    console.log(`${veiculo?.marca} levado para ${oficina?.nome}`);
  });
  
  // Calcular quanto tempo falta
  agendamentos.forEach(ag => {
    const tempoFalta = DateUtils.tempoFalta(ag.dataAgendamento);
    const ehHoje = DateUtils.ehHoje(ag.dataAgendamento);
    
    if (ehHoje) {
      console.log(`HOJE - faltam ${tempoFalta}`);
    }
  });
}

// ============================================================================
// 4. COMPARTILHAMENTOS - ECONOMY COLABORATIVA
// ============================================================================

import { useColaborativeFeatures } from '@/hooks/use-collaborative-features';

export function ExemploCompartilhamentos() {
  const { compartilhamentos, criarCompartilhamento, adicionarParticipante } =
    useColaborativeFeatures();
  
  // Buscar compartilhamentos abertos
  const abertos = compartilhamentos.filter(c => c.status === 'aberto');
  
  // Calcular desconto progressivo
  abertos.forEach(comp => {
    const percentualCheio = (comp.participantes.length / 5) * 100;
    const desconto = percentualCheio; // % de desconto
    const novoPreco = comp.custo * (1 - desconto / 100);
    
    console.log(`${comp.titulo}: ${desconto}% OFF = R$ ${novoPreco}`);
  });
  
  // Criar novo compartilhamento
  const novo = criarCompartilhamento({
    titulo: 'Balanceamento em grupo',
    descricao: 'Vamos balancear os carros juntos!',
    custo: 200,
    participantes: ['user1'],
    oficina: compartilhamentos[0].oficina,
    servico: compartilhamentos[0].servico,
    dataAgendamento: '2024-12-20',
    status: 'aberto',
  });
  
  // Usuário entra no grupo
  const resultado = adicionarParticipante(novo.id, 'user2');
  console.log(`Novo preço com seu desconto: R$ ${resultado.novoPreco}`);
}

// ============================================================================
// 5. COMUNIDADES
// ============================================================================

import { useColaborativeFeatures } from '@/hooks/use-collaborative-features';

export function ExemploComunidades() {
  const { comunidades, obterComunidadesDoUsuario } = useColaborativeFeatures();
  
  // Comunidades disponíveis
  console.log(`Total de comunidades: ${comunidades.length}`);
  
  // Comunidades que o usuário está
  const minhasComunidades = obterComunidadesDoUsuario('user1');
  console.log(`Minhas comunidades: ${minhasComunidades.length}`);
  
  // Filtrar por tema
  const carros = comunidades.filter(c => c.tema === 'carros');
  const economia = comunidades.filter(c => c.tema === 'economia');
}

// ============================================================================
// 6. REPUTAÇÃO E AVALIAÇÕES
// ============================================================================

export function ExemploReputacao() {
  // No componente ReputacaoUsuario
  // Mostra automaticamente:
  // - Score (ex: 4.7)
  // - Total de avaliações (ex: 24)
  // - Serviços completados (ex: 18)
  // - Badges desbloqueadas
  // - Reviews recentes
  
  return (
    <View>
      {/* <ReputacaoUsuario usuarioId={usuarioId} /> */}
    </View>
  );
}

// ============================================================================
// 7. REFERÊNCIAS E PROGRAMA DE INDICAÇÃO
// ============================================================================

export function ExemploReferencia() {
  // No componente ReferenceWidget
  // Mostra automaticamente:
  // - Código pessoal (ex: REF_ABC123)
  // - Benefícios (R$ 50 para você e amigo)
  // - Histórico de indicações
  // - Status (Convertida/Pendente)
  // - Botões: Copiar / Compartilhar
  
  // No background, a app pode:
  const codigoReferencia = 'REF_ABC123';
  const proximosDescontos = 50; // R$ 50
  
  // Quando alguém usa o código:
  // 1. Ambos ganham desconto
  // 2. Status muda para "Convertida"
  // 3. Ambos são notificados
}

// ============================================================================
// 8. FORMATAÇÃO E VALIDAÇÃO
// ============================================================================

import { FormatUtils, ValidationUtils, DateUtils } from '@/utils/index';

export function ExemploUtils() {
  // FORMATAÇÃO
  console.log(FormatUtils.formatarMoeda(450.99));        // "R$ 450,99"
  console.log(FormatUtils.formatarTelefone('1133334444')); // "(11) 33334-4444"
  console.log(FormatUtils.formatarPlaca('ABC1234'));     // "ABC-1234"
  console.log(FormatUtils.formatarTempo(150));           // "2h 30min"
  
  // VALIDAÇÃO
  console.log(ValidationUtils.ehEmailValido('user@email.com')); // true
  console.log(ValidationUtils.ehTelefoneValido('11999999999')); // true
  console.log(ValidationUtils.ehPlacaValida('ABC1234'));        // true
  
  // DATA
  console.log(DateUtils.formatarDataBr('2024-12-15'));    // "15/12/2024"
  console.log(DateUtils.tempoFalta('2024-12-20T10:00')); // "5d 2h"
  console.log(DateUtils.ehHoje('2024-12-01'));           // true (hoje)
  console.log(DateUtils.ehAmanha('2024-12-02'));         // true (amanhã)
}

// ============================================================================
// 9. TEMAS CLARO/ESCURO
// ============================================================================

import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

export function ExemploTema() {
  const colorScheme = useColorScheme() as 'light' | 'dark';
  const theme = Colors[colorScheme];
  
  return {
    backgroundColor: theme.background,
    textColor: theme.text,
    accentColor: theme.tint,
    iconColor: theme.icon,
  };
}

// ============================================================================
// 10. INTEGRAÇÃO COMPLETA - EXEMPLO TELA
// ============================================================================

import React, { useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';

export function TelaCompletoExemplo() {
  const { oficinas } = useMockData();
  const { compartilhamentos } = useColaborativeFeatures();
  const [searchQuery, setSearchQuery] = useState('');
  const [filtro, setFiltro] = useState<'todas' | 'compartilhadas'>('todas');
  
  const resultado = oficinas.filter(o => {
    const temBusca = SearchUtils.contemBusca(o.nome, searchQuery);
    
    if (filtro === 'compartilhadas') {
      return temBusca && compartilhamentos.some(c => c.oficina.id === o.id);
    }
    
    return temBusca;
  });
  
  return (
    <ScrollView>
      {/* Campo de busca */}
      {/* Filtros */}
      {/* Lista de oficinas */}
      {resultado.map(oficina => (
        // Renderizar card
        <div key={oficina.id} />
      ))}
    </ScrollView>
  );
}

export default {};
