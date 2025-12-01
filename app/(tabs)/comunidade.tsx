import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { CompartilhamentoCard } from '@/components/compartilhamento-card';
import { useColaborativeFeatures } from '../../hooks/use-collaborative-features';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

export default function ComunidadeScreen() {
  const colorScheme = useColorScheme() as 'light' | 'dark';
  const theme = Colors[colorScheme];
  const { compartilhamentos, comunidades } = useColaborativeFeatures();
  const [activeTab, setActiveTab] = useState<'compartilhamentos' | 'comunidades'>('compartilhamentos');

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title">🤝 Comunidade</ThemedText>
        <ThemedText style={styles.subtitle}>Economize junto, ganhe mais</ThemedText>
      </View>

      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'compartilhamentos' && styles.tabActive,
            { borderBottomColor: activeTab === 'compartilhamentos' ? theme.tint : '#ccc' },
          ]}
          onPress={() => setActiveTab('compartilhamentos')}>
          <ThemedText style={[styles.tabText, activeTab === 'compartilhamentos' && styles.tabTextActive]}>
            💰 Compartilhamentos ({compartilhamentos.length})
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'comunidades' && styles.tabActive,
            { borderBottomColor: activeTab === 'comunidades' ? theme.tint : '#ccc' },
          ]}
          onPress={() => setActiveTab('comunidades')}>
          <ThemedText style={[styles.tabText, activeTab === 'comunidades' && styles.tabTextActive]}>
            👥 Comunidades ({comunidades.length})
          </ThemedText>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}>
        {activeTab === 'compartilhamentos' ? (
          <>
            <View style={styles.infoBox}>
              <ThemedText style={styles.infoTitle}>💡 Como funciona?</ThemedText>
              <ThemedText style={styles.infoText}>
                Quanto mais pessoas compartilham um serviço, maior é o desconto! Você pode economizar até 40% juntando força com outros proprietários.
              </ThemedText>
            </View>

            {compartilhamentos.map((comp) => (
              <CompartilhamentoCard
                key={comp.id}
                compartilhamento={comp}
                onJoin={() => {
                  alert('Você entrou no grupo! 🎉 Seus amigos vão receber uma indicação.');
                }}
              />
            ))}

            <TouchableOpacity 
              style={[styles.createButton, { backgroundColor: theme.tint }]}
              activeOpacity={0.7}>
              <ThemedText style={styles.createButtonText}>+ Criar novo compartilhamento</ThemedText>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <View style={styles.infoBox}>
              <ThemedText style={styles.infoTitle}>👥 Conecte-se com outros</ThemedText>
              <ThemedText style={styles.infoText}>
                Junte-se a comunidades de proprietários e compartilhe experiências, dicas e recomendações.
              </ThemedText>
            </View>

            {comunidades.map((comunidade) => (
              <TouchableOpacity
                key={comunidade.id}
                style={[styles.comunidadeCard, { borderLeftColor: theme.tint, borderLeftWidth: 4 }]}
                activeOpacity={0.7}>
                <View style={styles.comunidadeHeader}>
                  <View style={styles.comunidadeTitleSection}>
                    <ThemedText type="defaultSemiBold" style={styles.comunidadeTitle}>
                      {comunidade.nome}
                    </ThemedText>
                    <ThemedText style={styles.comunidadeTema}>
                      #{comunidade.tema.replace(/([A-Z])/g, ' $1').toLowerCase()}
                    </ThemedText>
                  </View>
                  <View style={[styles.membrosBox, { backgroundColor: theme.tint + '20' }]}>
                    <ThemedText style={[styles.membros, { color: theme.tint }]}>
                      👥 {comunidade.membros}
                    </ThemedText>
                  </View>
                </View>

                <ThemedText style={styles.comunidadeDesc}>
                  {comunidade.descricao}
                </ThemedText>

                <TouchableOpacity 
                  style={[styles.joinComunidadeButton, { backgroundColor: theme.tint }]}
                  activeOpacity={0.7}>
                  <ThemedText style={styles.joinComunidadeText}>Entrar na comunidade</ThemedText>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}

            <TouchableOpacity 
              style={[styles.createButton, { backgroundColor: theme.tint }]}
              activeOpacity={0.7}>
              <ThemedText style={styles.createButtonText}>+ Criar comunidade</ThemedText>
            </TouchableOpacity>
          </>
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
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
    alignItems: 'center',
  },
  tabActive: {
    borderBottomColor: '#0a7ea4',
  },
  tabText: {
    fontSize: 12,
    fontWeight: '500',
    opacity: 0.6,
  },
  tabTextActive: {
    opacity: 1,
    fontWeight: '700',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingVertical: 12,
  },
  infoBox: {
    marginHorizontal: 16,
    marginVertical: 12,
    padding: 12,
    backgroundColor: '#E3F2FD',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#0a7ea4',
  },
  infoTitle: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 12,
    opacity: 0.8,
    lineHeight: 18,
  },
  comunidadeCard: {
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  comunidadeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  comunidadeTitleSection: {
    flex: 1,
  },
  comunidadeTitle: {
    fontSize: 14,
    marginBottom: 4,
  },
  comunidadeTema: {
    fontSize: 11,
    opacity: 0.6,
    fontWeight: '500',
  },
  membrosBox: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  membros: {
    fontSize: 12,
    fontWeight: '700',
  },
  comunidadeDesc: {
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 8,
    lineHeight: 16,
  },
  joinComunidadeButton: {
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  joinComunidadeText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 12,
  },
  createButton: {
    marginHorizontal: 16,
    marginVertical: 16,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  createButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 13,
  },
});
