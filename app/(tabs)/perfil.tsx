import React from 'react';
import { ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { usuarioAtual, veiculosDoUsuario } from '../../data/mock.js';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function PerfilScreen() {
  const colorScheme = useColorScheme() as 'light' | 'dark';
  const theme = Colors[colorScheme];

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}>
        {/* Seção de Perfil do Usuário */}
        <View style={styles.section}>
          <ThemedText type="title" style={styles.sectionTitle}>
            👤 Meu Perfil
          </ThemedText>

          <View style={[styles.card, { borderColor: theme.tint }]}>
            <View style={styles.avatarContainer}>
              <View style={[styles.avatar, { backgroundColor: theme.tint + '30' }]}>
                <ThemedText style={styles.avatarText}>👤</ThemedText>
              </View>
            </View>

            <ThemedText type="defaultSemiBold" style={styles.userName}>
              {usuarioAtual.nome}
            </ThemedText>

            <View style={styles.userInfo}>
              <View style={styles.infoRow}>
                <ThemedText style={styles.infoLabel}>Email:</ThemedText>
                <ThemedText style={styles.infoValue}>{usuarioAtual.email}</ThemedText>
              </View>

              <View style={styles.infoRow}>
                <ThemedText style={styles.infoLabel}>Telefone:</ThemedText>
                <ThemedText style={styles.infoValue}>{usuarioAtual.telefone}</ThemedText>
              </View>

              <View style={styles.infoRow}>
                <ThemedText style={styles.infoLabel}>Membro desde:</ThemedText>
                <ThemedText style={styles.infoValue}>
                  {new Date(usuarioAtual.dataCriacao).toLocaleDateString('pt-BR')}
                </ThemedText>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.editButton, { backgroundColor: theme.tint }]}
              activeOpacity={0.7}>
              <ThemedText style={styles.editButtonText}>Editar Perfil</ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        {/* Seção de Veículos */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
              🚗 Meus Veículos ({veiculosDoUsuario.length})
            </ThemedText>
            <TouchableOpacity activeOpacity={0.7}>
              <ThemedText style={{ color: theme.tint }}>+ Adicionar</ThemedText>
            </TouchableOpacity>
          </View>

          {veiculosDoUsuario.map((veiculo) => (
            <View key={veiculo.id} style={styles.card}>
              <View style={styles.veiculoHeader}>
                <View>
                  <ThemedText type="defaultSemiBold" style={styles.veiculoNome}>
                    {veiculo.marca} {veiculo.modelo}
                  </ThemedText>
                  <ThemedText style={styles.veiculoAno}>{veiculo.ano}</ThemedText>
                </View>
                <ThemedText style={styles.veiculoPlaca}>{veiculo.placa}</ThemedText>
              </View>

              <View style={styles.veiculoInfo}>
                <ThemedText style={styles.veiculoCor}>Cor: {veiculo.cor}</ThemedText>
              </View>
            </View>
          ))}
        </View>

        {/* Seção de Opções */}
        <View style={styles.section}>
          <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
            ⚙️ Opções
          </ThemedText>

          <TouchableOpacity style={styles.optionButton} activeOpacity={0.7}>
            <ThemedText style={styles.optionText}>Histórico de Avaliações</ThemedText>
            <ThemedText style={styles.optionArrow}>›</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionButton} activeOpacity={0.7}>
            <ThemedText style={styles.optionText}>Notificações</ThemedText>
            <ThemedText style={styles.optionArrow}>›</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionButton} activeOpacity={0.7}>
            <ThemedText style={styles.optionText}>Sobre o App</ThemedText>
            <ThemedText style={styles.optionArrow}>›</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.optionButton, styles.logoutButton]} activeOpacity={0.7}>
            <ThemedText style={[styles.optionText, styles.logoutText]}>Sair</ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingVertical: 16,
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  card: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 12,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 40,
  },
  userName: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 16,
  },
  userInfo: {
    gap: 8,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  infoValue: {
    fontSize: 12,
    opacity: 0.7,
    flex: 1,
    textAlign: 'right',
  },
  editButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  editButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  veiculoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  veiculoNome: {
    fontSize: 16,
    marginBottom: 4,
  },
  veiculoAno: {
    fontSize: 12,
    opacity: 0.6,
  },
  veiculoPlaca: {
    fontSize: 14,
    fontWeight: '600',
  },
  veiculoInfo: {
    marginTop: 8,
  },
  veiculoCor: {
    fontSize: 12,
    opacity: 0.7,
  },
  optionButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 8,
  },
  optionText: {
    fontSize: 14,
  },
  optionArrow: {
    fontSize: 18,
    opacity: 0.6,
  },
  logoutButton: {
    borderColor: '#f44336',
    marginTop: 16,
  },
  logoutText: {
    color: '#f44336',
  },
});
