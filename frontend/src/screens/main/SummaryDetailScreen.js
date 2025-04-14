import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Share, Linking, Alert } from 'react-native';
import { Appbar, Text, Button, Card, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Markdown from 'react-native-markdown-display';

// Components
import LoadingIndicator from '../../components/LoadingIndicator';
import ErrorMessage from '../../components/ErrorMessage';
import TTSControls from '../../components/TTSControls';

// Utils
import { formatDate } from '../../utils/formatters';

// Store
import useSummaryStore from '../../store/summaryStore';

const SummaryDetailScreen = ({ navigation, route }) => {
  // Get summary ID from route params
  const { summaryId } = route.params || {};
  
  // State
  const [summary, setSummary] = useState(null);
  
  // Summary store
  const { 
    fetchSummaryById, 
    deleteSummary,
    isLoading, 
    error, 
    clearError 
  } = useSummaryStore();
  
  // Fetch summary on mount
  useEffect(() => {
    if (summaryId) {
      const loadSummary = async () => {
        const data = await fetchSummaryById(summaryId);
        if (data) {
          setSummary(data);
        }
      };
      
      loadSummary();
    }
  }, [summaryId, fetchSummaryById]);
  
  // Handle back navigation
  const handleBack = () => {
    navigation.goBack();
  };
  
  // Handle edit summary
  const handleEdit = () => {
    navigation.navigate('Home', { editSummary: summary });
  };
  
  // Handle delete summary
  const handleDelete = () => {
    Alert.alert(
      'Delete Summary',
      'Are you sure you want to delete this summary? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: async () => {
            await deleteSummary(summaryId);
            navigation.goBack();
          }
        },
      ]
    );
  };
  
  // Handle share summary
  const handleShare = async () => {
    if (!summary) return;
    
    try {
      const title = summary.video_title || 'Video Summary';
      const message = `Summary for "${title}":\n\n${summary.summary_text}\n\nOriginal Video: ${summary.video_url}`;
      
      await Share.share({
        message,
        title: `Summary for ${title}`,
      });
    } catch (error) {
      console.error('Error sharing summary:', error);
    }
  };
  
  // Handle open video
  const handleOpenVideo = async () => {
    if (!summary?.video_url) return;
    
    try {
      const canOpen = await Linking.canOpenURL(summary.video_url);
      if (canOpen) {
        await Linking.openURL(summary.video_url);
      }
    } catch (error) {
      console.error('Error opening video URL:', error);
    }
  };
  
  // If loading, show loading indicator
  if (isLoading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Appbar.Header>
          <Appbar.BackAction onPress={handleBack} />
          <Appbar.Content title="Summary Details" />
        </Appbar.Header>
        <LoadingIndicator fullScreen message="Loading summary..." />
      </SafeAreaView>
    );
  }
  
  // If error, show error message
  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Appbar.Header>
          <Appbar.BackAction onPress={handleBack} />
          <Appbar.Content title="Summary Details" />
        </Appbar.Header>
        <ErrorMessage
          message={error}
          onDismiss={clearError}
          onRetry={() => fetchSummaryById(summaryId)}
        />
      </SafeAreaView>
    );
  }
  
  // If no summary, show message
  if (!summary) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Appbar.Header>
          <Appbar.BackAction onPress={handleBack} />
          <Appbar.Content title="Summary Details" />
        </Appbar.Header>
        <View style={styles.centerContainer}>
          <Text>Summary not found</Text>
        </View>
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <Appbar.Header>
        <Appbar.BackAction onPress={handleBack} />
        <Appbar.Content title="Summary Details" />
        <Appbar.Action icon="pencil" onPress={handleEdit} />
        <Appbar.Action icon="delete" onPress={handleDelete} />
        <Appbar.Action icon="share" onPress={handleShare} />
      </Appbar.Header>
      
      <ScrollView style={styles.container}>
        <Card style={styles.card}>
          <Card.Cover 
            source={{ 
              uri: summary.video_thumbnail_url || 
                'https://via.placeholder.com/640x360?text=No+Thumbnail' 
            }} 
            style={styles.thumbnail}
          />
          
          <Card.Content>
            <View style={styles.headerContainer}>
              <Text style={styles.title} onPress={handleOpenVideo}>
                {summary.video_title || '[Title Unavailable]'}
              </Text>
              <Text style={styles.date}>{formatDate(summary.created_at)}</Text>
            </View>
            
            <View style={styles.metaContainer}>
              <View style={styles.metaItem}>
                <Text style={styles.metaLabel}>Type:</Text>
                <Text style={styles.metaValue}>{summary.summary_type}</Text>
              </View>
              <View style={styles.metaItem}>
                <Text style={styles.metaLabel}>Length:</Text>
                <Text style={styles.metaValue}>{summary.summary_length}</Text>
              </View>
            </View>
            
            <Button 
              mode="outlined" 
              icon="youtube" 
              onPress={handleOpenVideo}
              style={styles.videoButton}
            >
              Watch Original Video
            </Button>
            
            <TTSControls text={summary.summary_text} />
            
            <Divider style={styles.divider} />
            
            <Text style={styles.summaryLabel}>Summary:</Text>
            <View style={styles.markdownContainer}>
              <Markdown>{summary.summary_text}</Markdown>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
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
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    margin: 16,
    elevation: 4,
  },
  thumbnail: {
    height: 200,
  },
  headerContainer: {
    marginTop: 16,
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
  metaContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  metaItem: {
    flexDirection: 'row',
    marginRight: 16,
  },
  metaLabel: {
    fontSize: 14,
    color: '#666',
    marginRight: 4,
  },
  metaValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
  },
  videoButton: {
    marginBottom: 16,
  },
  divider: {
    marginVertical: 16,
  },
  summaryLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  markdownContainer: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
  },
});

export default SummaryDetailScreen;
