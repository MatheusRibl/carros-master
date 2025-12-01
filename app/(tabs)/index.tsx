import React, { useState, useMemo } from 'react';
import { ScrollView, StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { OficinaCard } from '@/components/oficina-card';
import { useMockData } from '../../hooks/use-mock-data';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { SearchUtils } from '../../utils/index';

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'nome' | 'rating'>('rating');
  const [favorites, setFavorites] = useState<string[]>([]);
  const colorScheme = useColorScheme() as 'light' | 'dark';
  const theme = Colors[colorScheme];
  const { oficinas } = useMockData();

  const filteredOficinas = useMemo(() => {
    let result = oficinas.filter((oficina) => {
      if (!searchQuery.trim()) return true;
      
      const query = searchQuery.toLowerCase();
      return (
        SearchUtils.contemBusca(oficina.nome, query) ||
        SearchUtils.contemBusca(oficina.endereco, query) ||
        oficina.especialidades.some((esp) => SearchUtils.contemBusca(esp, query))
      );
    });

    // Ordenar
    if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'nome') {
      result.sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
    }

    return result;
  }, [searchQuery, sortBy, oficinas]);

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

      <View style={styles.filterContainer}>
        <TouchableOpacity 
          style={[
            styles.filterButton,
            sortBy === 'rating' && { backgroundColor: theme.tint + '30' }
          ]}
          onPress={() => setSortBy('rating')}>
          <ThemedText style={[
            styles.filterText,
            sortBy === 'rating' && { color: theme.tint, fontWeight: '600' }
          ]}>
            ⭐ Melhor avaliadas
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[
            styles.filterButton,
            sortBy === 'nome' && { backgroundColor: theme.tint + '30' }
          ]}
          onPress={() => setSortBy('nome')}>
          <ThemedText style={[
            styles.filterText,
            sortBy === 'nome' && { color: theme.tint, fontWeight: '600' }
          ]}>
            A-Z Ordem alfabética
          </ThemedText>
        </TouchableOpacity>
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
              {favorites.length > 0 && ` • ${favorites.length} favorita${favorites.length !== 1 ? 's' : ''}`}
            </ThemedText>
            {filteredOficinas.map((oficina) => (
              <OficinaCard
                key={oficina.id}
                oficina={oficina}
                isFavorite={favorites.includes(oficina.id)}
                onToggleFavorite={() => {
                  setFavorites(prev => 
                    prev.includes(oficina.id)
                      ? prev.filter(id => id !== oficina.id)
                      : [...prev, oficina.id]
                  );
                }}
                onPress={() => {
                  console.log('Clicou em:', oficina.nome);
                }}
              />
            ))}
          </>
        ) : (
          <View style={styles.emptyState}>
            <ThemedText style={styles.emptyStateTitle}>😕 Nenhuma oficina encontrada</ThemedText>
            <ThemedText style={styles.emptyStateText}>
              Tente buscar por outro termo ou especialidade
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
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 12,
    gap: 8,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  filterText: {
    fontSize: 12,
    textAlign: 'center',
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
