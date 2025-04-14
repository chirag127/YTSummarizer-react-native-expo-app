import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, RefreshControl, Alert } from 'react-native';
import { Appbar, Text, Searchbar, Chip, Button, Dialog, Portal } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

// Components
import LoadingIndicator from '../../components/LoadingIndicator';
import ErrorMessage from '../../components/ErrorMessage';
import SummaryCard from '../../components/SummaryCard';

// Store
import useSummaryStore from '../../store/summaryStore';

const HistoryScreen = ({ navigation }) => {
  // State
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSummaries, setFilteredSummaries] = useState([]);
  const [activeFilters, setActiveFilters] = useState({
    type: null,
    length: null
  });
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [summaryToDelete, setSummaryToDelete] = useState(null);

  // Summary store
  const { 
    summaries, 
    fetchSummaries, 
    deleteSummary,
    isLoading, 
    error, 
    clearError 
  } = useSummaryStore();

  // Fetch summaries on mount
  useEffect(() => {
    fetchSummaries();
  }, [fetchSummaries]);

  // Filter summaries when search query or filters change
  useEffect(() => {
    let filtered = [...summaries];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(summary => 
        (summary.video_title && summary.video_title.toLowerCase().includes(query)) ||
        (summary.summary_text && summary.summary_text.toLowerCase().includes(query)) ||
        (summary.video_url && summary.video_url.toLowerCase().includes(query))
      );
    }
    
    // Apply type filter
    if (activeFilters.type) {
      filtered = filtered.filter(summary => 
        summary.summary_type === activeFilters.type
      );
    }
    
    // Apply length filter
    if (activeFilters.length) {
      filtered = filtered.filter(summary => 
        summary.summary_length === activeFilters.length
      );
    }
    
    setFilteredSummaries(filtered);
  }, [summaries, searchQuery, activeFilters]);

  // Handle refresh
  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchSummaries();
    setRefreshing(false);
  };

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Handle filter toggle
  const toggleFilter = (type, value) => {
    setActiveFilters(prev => ({
      ...prev,
      [type]: prev[type] === value ? null : value
    }));
  };

  // Handle clear filters
  const clearFilters = () => {
    setActiveFilters({
      type: null,
      length: null
    });
    setSearchQuery('');
  };

  // Handle delete summary
  const handleDeleteSummary = (id) => {
    setSummaryToDelete(id);
    setDeleteDialogVisible(true);
  };

  // Confirm delete summary
  const confirmDeleteSummary = async () => {
    if (summaryToDelete) {
      await deleteSummary(summaryToDelete);
      setDeleteDialogVisible(false);
      setSummaryToDelete(null);
    }
  };

  // Handle view summary detail
  const handleViewSummaryDetail = (summaryId) => {
    navigation.navigate('SummaryDetail', { summaryId });
  };

  // Render summary item
  const renderSummaryItem = ({ item }) => (
    <SummaryCard 
      summary={item} 
      onDelete={handleDeleteSummary}
      onPress={() => handleViewSummaryDetail(item.id)}
    />
  );

  // Render empty state
  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>
        {searchQuery || activeFilters.type || activeFilters.length
          ? 'No summaries match your filters'
          : 'No summaries yet. Generate your first summary on the Home screen!'}
      </Text>
      {(searchQuery || activeFilters.type || activeFilters.length) && (
        <Button 
          mode="outlined" 
          onPress={clearFilters}
          style={styles.clearFiltersButton}
        >
          Clear Filters
        </Button>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Appbar.Header>
        <Appbar.Content title="History" />
      </Appbar.Header>

      <View style={styles.container}>
        <Searchbar
          placeholder="Search summaries"
          onChangeText={handleSearch}
          value={searchQuery}
          style={styles.searchBar}
        />

        <View style={styles.filtersContainer}>
          <Text style={styles.filtersLabel}>Filters:</Text>
          <View style={styles.chipContainer}>
            <Chip 
              selected={activeFilters.type === 'Brief'} 
              onPress={() => toggleFilter('type', 'Brief')}
              style={styles.chip}
            >
              Brief
            </Chip>
            <Chip 
              selected={activeFilters.type === 'Detailed'} 
              onPress={() => toggleFilter('type', 'Detailed')}
              style={styles.chip}
            >
              Detailed
            </Chip>
            <Chip 
              selected={activeFilters.type === 'Key Point'} 
              onPress={() => toggleFilter('type', 'Key Point')}
              style={styles.chip}
            >
              Key Points
            </Chip>
          </View>
          <View style={styles.chipContainer}>
            <Chip 
              selected={activeFilters.length === 'Short'} 
              onPress={() => toggleFilter('length', 'Short')}
              style={styles.chip}
            >
              Short
            </Chip>
            <Chip 
              selected={activeFilters.length === 'Medium'} 
              onPress={() => toggleFilter('length', 'Medium')}
              style={styles.chip}
            >
              Medium
            </Chip>
            <Chip 
              selected={activeFilters.length === 'Long'} 
              onPress={() => toggleFilter('length', 'Long')}
              style={styles.chip}
            >
              Long
            </Chip>
          </View>
        </View>

        {error && (
          <ErrorMessage
            message={error}
            onDismiss={clearError}
            onRetry={fetchSummaries}
          />
        )}

        <FlatList
          data={filteredSummaries}
          renderItem={renderSummaryItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={['#6200ee']}
            />
          }
          ListEmptyComponent={renderEmptyState}
        />

        {isLoading && !refreshing && <LoadingIndicator />}

        <Portal>
          <Dialog
            visible={deleteDialogVisible}
            onDismiss={() => setDeleteDialogVisible(false)}
          >
            <Dialog.Title>Delete Summary</Dialog.Title>
            <Dialog.Content>
              <Text>Are you sure you want to delete this summary? This action cannot be undone.</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setDeleteDialogVisible(false)}>Cancel</Button>
              <Button onPress={confirmDeleteSummary}>Delete</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
  },
  searchBar: {
    margin: 16,
    elevation: 2,
  },
  filtersContainer: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  filtersLabel: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  chip: {
    marginRight: 8,
    marginBottom: 8,
  },
  listContent: {
    padding: 8,
    paddingBottom: 24,
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
  clearFiltersButton: {
    marginTop: 8,
  },
});

export default HistoryScreen;
