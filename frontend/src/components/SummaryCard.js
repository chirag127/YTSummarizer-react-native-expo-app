import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Linking, Share } from 'react-native';
import { Card, Title, Paragraph, Button, IconButton } from 'react-native-paper';
import Markdown from 'react-native-markdown-display';
import { useNavigation } from '@react-navigation/native';

// Utils
import { formatDate, truncateText } from '../utils/formatters';
import { extractVideoId, getThumbnailUrl } from '../utils/youtube';

// Stores
import useTTSStore from '../store/ttsStore';
import useSummaryStore from '../store/summaryStore';

/**
 * Summary card component
 * @param {Object} props - Component props
 * @param {Object} props.summary - Summary object
 * @param {boolean} props.isDetailed - Whether to show detailed view
 * @param {Function} props.onDelete - Delete callback
 */
const SummaryCard = ({ 
  summary, 
  isDetailed = false,
  onDelete
}) => {
  const navigation = useNavigation();
  const { speak, stop, isSpeaking } = useTTSStore();
  const { deleteSummary } = useSummaryStore();

  // Extract video ID and get thumbnail URL
  const videoId = extractVideoId(summary.video_url);
  const thumbnailUrl = summary.video_thumbnail_url || (videoId ? getThumbnailUrl(videoId) : null);
  
  // Handle opening the original video
  const handleOpenVideo = async () => {
    if (summary.video_url) {
      const canOpen = await Linking.canOpenURL(summary.video_url);
      if (canOpen) {
        await Linking.openURL(summary.video_url);
      }
    }
  };

  // Handle sharing the summary
  const handleShare = async () => {
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

  // Handle text-to-speech
  const handleSpeak = () => {
    if (isSpeaking) {
      stop();
    } else {
      speak(summary.summary_text);
    }
  };

  // Handle editing the summary
  const handleEdit = () => {
    navigation.navigate('Home', { 
      editSummary: summary 
    });
  };

  // Handle deleting the summary
  const handleDelete = async () => {
    if (onDelete) {
      onDelete(summary.id);
    } else {
      await deleteSummary(summary.id);
    }
  };

  // Handle navigation to detail view
  const handleViewDetail = () => {
    if (!isDetailed) {
      navigation.navigate('SummaryDetail', { summaryId: summary.id });
    }
  };

  return (
    <Card style={styles.card}>
      <TouchableOpacity onPress={handleOpenVideo}>
        <Card.Cover 
          source={{ uri: thumbnailUrl || 'https://via.placeholder.com/640x360?text=No+Thumbnail' }} 
          style={styles.thumbnail}
        />
      </TouchableOpacity>
      
      <Card.Content>
        <TouchableOpacity onPress={handleOpenVideo}>
          <Title style={styles.title}>{summary.video_title || '[Title Unavailable]'}</Title>
        </TouchableOpacity>
        
        <View style={styles.metaContainer}>
          <Paragraph style={styles.meta}>Type: {summary.summary_type}</Paragraph>
          <Paragraph style={styles.meta}>Length: {summary.summary_length}</Paragraph>
          <Paragraph style={styles.date}>{formatDate(summary.created_at)}</Paragraph>
        </View>
        
        {isDetailed ? (
          <View style={styles.summaryContent}>
            <Markdown>{summary.summary_text}</Markdown>
          </View>
        ) : (
          <TouchableOpacity onPress={handleViewDetail}>
            <Paragraph style={styles.summaryPreview}>
              {truncateText(summary.summary_text, 150)}
            </Paragraph>
            <Paragraph style={styles.readMore}>Read more</Paragraph>
          </TouchableOpacity>
        )}
      </Card.Content>
      
      <Card.Actions style={styles.actions}>
        <Button 
          icon={isSpeaking ? "stop" : "text-to-speech"} 
          onPress={handleSpeak}
        >
          {isSpeaking ? "Stop" : "Read Aloud"}
        </Button>
        <Button icon="share" onPress={handleShare}>Share</Button>
        <IconButton icon="pencil" onPress={handleEdit} />
        <IconButton icon="delete" onPress={handleDelete} />
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 4,
  },
  thumbnail: {
    height: 180,
  },
  title: {
    marginTop: 8,
    fontSize: 18,
  },
  metaContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
    marginBottom: 8,
  },
  meta: {
    fontSize: 12,
    color: '#666',
    marginRight: 8,
  },
  date: {
    fontSize: 12,
    color: '#666',
  },
  summaryContent: {
    marginTop: 8,
  },
  summaryPreview: {
    marginTop: 8,
    color: '#333',
  },
  readMore: {
    color: '#6200ee',
    marginTop: 4,
  },
  actions: {
    justifyContent: 'space-between',
  },
});

export default SummaryCard;
