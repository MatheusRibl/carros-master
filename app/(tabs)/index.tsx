import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, TextInput } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { OficinaCard } from '@/components/oficina-card';
import { oficinas } from '../../data/mock.js';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const colorScheme = useColorScheme() as 'light' | 'dark';
  const theme = Colors[colorScheme];

  const filteredOficinas = oficinas.filter(
    (oficina) =>
      oficina.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
      oficina.especialidades.some((esp) =>
        esp.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title">🚗 Oficinas</ThemedText>
        <ThemedText style={styles.subtitle}>Encontre a melhor oficina para seu carro</ThemedText>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={[
            styles.searchInput,
            {
              backgroundColor: colorScheme === 'dark' ? '#333' : '#f5f5f5',
              color: theme.text,
              borderColor: theme.tint,
            },
          ]}
          placeholder="Buscar oficina ou serviço..."
          placeholderTextColor={colorScheme === 'dark' ? '#999' : '#ccc'}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}>
        {filteredOficinas.length > 0 ? (
          <>
            <ThemedText style={styles.resultCount}>
              {filteredOficinas.length} oficina{filteredOficinas.length !== 1 ? 's' : ''} encontrada
              {filteredOficinas.length !== 1 ? 's' : ''}
            </ThemedText>
            {filteredOficinas.map((oficina) => (
              <OficinaCard
                key={oficina.id}
                oficina={oficina}
                onPress={() => {
                  console.log('Clicou em:', oficina.nome);
                }}
              />
            ))}
          </>
        ) : (
          <View style={styles.emptyState}>
            <ThemedText style={styles.emptyStateTitle}>Nenhuma oficina encontrada</ThemedText>
            <ThemedText style={styles.emptyStateText}>
              Tente buscar por outro termo
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
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingVertical: 8,
  },
  resultCount: {
    paddingHorizontal: 16,
    fontSize: 12,
    opacity: 0.6,
    marginBottom: 8,
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
  },
});
