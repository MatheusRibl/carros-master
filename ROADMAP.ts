/**
 * 🚗 APP DE AGENDAMENTO MECÂNICO - MELHORIAS IMPLEMENTADAS
 * 
 * Conceito: Aplicativo social/colaborativo que conecta proprietários de carros
 * com oficinas, promovendo economia colaborativa e comunidade
 */

// ============================================================================
// 1️⃣ NOVO: FEATURES SOCIAIS/COLABORATIVAS
// ============================================================================

/**
 * COMPARTILHAMENTOS (Economia Colaborativa)
 * - Usuários podem agrupar-se para serviços
 * - Quanto mais gente, maior o desconto (até 40%)
 * - Exemplo: "Revisão em grupo - 30% off"
 * 
 * Componente: CompartilhamentoCard
 * Hook: useColaborativeFeatures()
 */

/**
 * COMUNIDADES
 * - Grupos por tema: Carros, Economia, Vizinhança
 * - Compartilhamento de dicas e experiências
 * - Networking entre proprietários
 * 
 * Tela: comunidade.tsx (Nova aba na navegação)
 */

/**
 * SISTEMA DE REPUTAÇÃO
 * - Score de 0-5 para cada usuário
 * - Badges por desempenho
 * - Histórico de avaliações
 * 
 * Componente: ReputacaoUsuario
 */

/**
 * PROGRAMA DE REFERÊNCIA
 * - Código pessoal para indicar amigos
 * - Ambos ganham desconto (R$ 50)
 * - Histórico de indicações com status
 * 
 * Componente: ReferenceWidget
 */

// ============================================================================
// 2️⃣ MELHORIAS NA UX/UI
// ============================================================================

/**
 * OFICINA CARD MELHORADO
 * - Expandível para mostrar mais detalhes
 * - Botões para Ligar/Email
 * - Sistema de favoritos (❤️)
 * - Indicador de status (Aberto/Limitado)
 * 
 * Path: components/oficina-card.tsx
 */

/**
 * AGENDAMENTO ITEM MELHORADO
 * - Indicadores de "HOJE" e "AMANHÃ"
 * - Countdown do agendamento
 * - Status com cores personalizadas
 * - Ações rápidas (Ligar/Mensagem)
 * 
 * Path: components/agendamento-item.tsx
 */

/**
 * TELA HOME COM FILTROS
 * - Busca com normalização (sem acentos)
 * - Ordenação: Rating / Alfabética
 * - Contador de favoritas
 * 
 * Path: app/(tabs)/index.tsx
 */

/**
 * TELA AGENDAMENTOS COM ABAS
 * - Filtro por status (Todos/Confirmado/Pendente/Concluído)
 * - Contadores de cada status
 * - Ordenação por data
 * 
 * Path: app/(tabs)/agendamentos.tsx
 */

// ============================================================================
// 3️⃣ NOVOS HOOKS E UTILITIES
// ============================================================================

/**
 * use-mock-data.ts
 * - Centraliza acesso aos dados
 * - Funções helper: getOficinaById(), getVeiculoById(), etc
 * - Memoization para performance
 */

/**
 * use-collaborative-features.ts
 * - Gerencia compartilhamentos
 * - Gerencia comunidades
 * - Gerencia referências
 */

/**
 * utils/index.ts - Helpers
 * 
 * DateUtils:
 * - formatarDataBr()
 * - tempoFalta()
 * - ehHoje(), ehAmanha()
 * 
 * FormatUtils:
 * - formatarTelefone()
 * - formatarPlaca()
 * - formatarMoeda()
 * - formatarTempo()
 * 
 * ValidationUtils:
 * - ehEmailValido()
 * - ehTelefoneValido()
 * - ehPlacaValida()
 * 
 * SearchUtils:
 * - normalizarParaBusca()
 * - contemBusca()
 */

// ============================================================================
// 4️⃣ TIPOS NOVOS
// ============================================================================

/**
 * export interface Comunidade
 * export interface Compartilhamento
 * export interface Referencia
 * export interface Avaliacao (melhorado)
 * 
 * Path: types/index.ts
 */

// ============================================================================
// 5️⃣ ESTRUTURA DE ARQUIVOS
// ============================================================================

/**
app/(tabs)/
  ├── index.tsx (Home - Busca de oficinas)
  ├── agendamentos.tsx (Agendamentos com filtros)
  ├── comunidade.tsx (NOVO - Compartilhamentos + Comunidades)
  ├── perfil.tsx (Perfil com Reputação + Referências)
  └── _layout.tsx (4 abas + navegação)

components/
  ├── oficina-card.tsx (Melhorado - expandível)
  ├── agendamento-item.tsx (Melhorado - status coloridos)
  ├── status-badge.tsx (NOVO - componente de status)
  ├── compartilhamento-card.tsx (NOVO - desconto progressivo)
  ├── reputacao-usuario.tsx (NOVO - score + badges)
  ├── reference-widget.tsx (NOVO - referência + histórico)
  ├── themed-text.tsx
  ├── themed-view.tsx
  ├── haptic-tab.tsx
  └── ui/icon-symbol.tsx

hooks/
  ├── use-color-scheme.ts
  ├── use-mock-data.ts (NOVO - centraliza dados)
  └── use-collaborative-features.ts (NOVO - features sociais)

data/
  ├── mock.ts (Dados + tipos)
  └── mock.js (Re-export para Metro)

types/
  └── index.ts (Interfaces + tipos novos)

utils/
  └── index.ts (NOVO - helpers para formato/validação)

constants/
  └── theme.ts (Cores + tema)
*/

// ============================================================================
// 6️⃣ EXEMPLOS DE USO
// ============================================================================

/**
 * COMPARTILHAMENTO
 * 
 * const { compartilhamentos } = useColaborativeFeatures();
 * 
 * <CompartilhamentoCard
 *   compartilhamento={comp}
 *   onJoin={() => {
 *     alert('Você entrou! Seus amigos vão receber notificação.');
 *   }}
 * />
 */

/**
 * REPUTAÇÃO
 * 
 * <ReputacaoUsuario usuarioId={usuarioAtual.id} />
 * 
 * Mostra: Score, Badges, Reviews, Histórico
 */

/**
 * REFERÊNCIA
 * 
 * <ReferenceWidget usuarioId={usuarioAtual.id} />
 * 
 * Mostra: Código, Benefícios, Histórico, Botões Share/Copy
 */

/**
 * FORMATAÇÃO
 * 
 * FormatUtils.formatarMoeda(450) → "R$ 450,00"
 * FormatUtils.formatarPlaca("ABC1234") → "ABC-1234"
 * FormatUtils.formatarTempo(120) → "2h"
 * DateUtils.tempoFalta(date) → "2d 5h"
 * DateUtils.ehHoje(date) → true/false
 */

// ============================================================================
// 7️⃣ PRÓXIMOS PASSOS SUGERIDOS
// ============================================================================

/**
 * 1. Chat em tempo real entre usuários e oficinas
 * 2. Notificações push (Status dos agendamentos)
 * 3. Mapa com localização de oficinas próximas
 * 4. Pagamento integrado (Stripe, PayPal)
 * 5. Histórico e relatórios de gastos
 * 6. Sistema de cupons/promoções
 * 7. Integração com calendário do celular
 * 8. Dark mode mais refinado
 * 9. Gamificação (Pontos, Leaderboard)
 * 10. Analytics de uso
 */

export default {};
