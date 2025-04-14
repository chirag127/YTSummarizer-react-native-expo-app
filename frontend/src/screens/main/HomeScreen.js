import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { TextInput, Button, Text, Appbar, SegmentedButtons, Snackbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Clipboard from 'expo-clipboard';

// Components
import LoadingIndicator from '../../components/LoadingIndicator';
import ErrorMessage from '../../components/ErrorMessage';
import SummaryCard from '../../components/SummaryCard';

// Utils
import { isValidYouTubeUrl } from '../../utils/youtube';

// Store
import useSummaryStore from '../../store/summaryStore';

const HomeScreen = ({ navigation, route }) => {
  // State
  const [videoUrl, setVideoUrl] = useState('');
  const [summaryType, setSummaryType] = useState('Brief');
  const [summaryLength, setSummaryLength] = useState('Medium');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editSummaryId, setEditSummaryId] = useState(null);

  // Summary store
  const { 
    generateSummary, 
    updateSummary,
    currentSummary, 
    isLoading, 
    error, 
    clearError 
  } = useSummaryStore();

  // Check if we're editing an existing summary
  useEffect(() => {
    if (route.params?.editSummary) {
      const summary = route.params.editSummary;
      setVideoUrl(summary.video_url);
      setSummaryType(summary.summary_type);
      setSummaryLength(summary.summary_length);
      setIsEditing(true);
      setEditSummaryId(summary.id);
      
      // Clear the route params to avoid re-triggering this effect
      navigation.setParams({ editSummary: undefined });
    }
  }, [route.params, navigation]);

  // Handle paste from clipboard
  const handlePasteFromClipboard = async () => {
    const text = await Clipboard.getStringAsync();
    if (text) {
      setVideoUrl(text);
      
      // Show a snackbar if the pasted text is not a valid YouTube URL
      if (!isValidYouTubeUrl(text)) {
        setSnackbarMessage('The pasted text does not appear to be a valid YouTube URL');
        setSnackbarVisible(true);
      }
    }
  };

  // Handle generate summary
  const handleGenerateSummary = async () => {
    // Validate URL
    if (!videoUrl) {
      setSnackbarMessage('Please enter a YouTube video URL');
      setSnackbarVisible(true);
      return;
    }

    if (!isValidYouTubeUrl(videoUrl)) {
      setSnackbarMessage('Please enter a valid YouTube URL');
      setSnackbarVisible(true);
      return;
    }

    try {
      if (isEditing && editSummaryId) {
        // Update existing summary
        await updateSummary(editSummaryId, videoUrl, summaryType, summaryLength);
        setSnackbarMessage('Summary updated successfully');
      } else {
        // Generate new summary
        await generateSummary(videoUrl, summaryType, summaryLength);
        setSnackbarMessage('Summary generated successfully');
      }
      
      // Reset form
      setVideoUrl('');
      setSummaryType('Brief');
      setSummaryLength('Medium');
      setIsEditing(false);
      setEditSummaryId(null);
      
      setSnackbarVisible(true);
    } catch (error) {
      console.error('Error generating summary:', error);
      setSnackbarMessage('Failed to generate summary');
      setSnackbarVisible(true);
    }
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setVideoUrl('');
    setSummaryType('Brief');
    setSummaryLength('Medium');
    setIsEditing(false);
    setEditSummaryId(null);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Appbar.Header>
        <Appbar.Content title="VidSummify" />
      </Appbar.Header>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.formContainer}>
            <Text style={styles.sectionTitle}>
              {isEditing ? 'Edit Summary' : 'Generate New Summary'}
            </Text>

            <View style={styles.urlInputContainer}>
              <TextInput
                label="YouTube Video URL"
                value={videoUrl}
                onChangeText={setVideoUrl}
                mode="outlined"
                style={styles.urlInput}
                placeholder="https://www.youtube.com/watch?v=..."
                autoCapitalize="none"
                left={<TextInput.Icon icon="youtube" />}
              />
              <Button
                mode="contained"
                onPress={handlePasteFromClipboard}
                style={styles.pasteButton}
                icon="content-paste"
              >
                Paste
              </Button>
            </View>

            <Text style={styles.optionLabel}>Summary Type:</Text>
            <SegmentedButtons
              value={summaryType}
              onValueChange={setSummaryType}
              buttons={[
                { value: 'Brief', label: 'Brief' },
                { value: 'Detailed', label: 'Detailed' },
                { value: 'Key Point', label: 'Key Points' },
              ]}
              style={styles.segmentedButtons}
            />

            <Text style={styles.optionLabel}>Summary Length:</Text>
            <SegmentedButtons
              value={summaryLength}
              onValueChange={setSummaryLength}
              buttons={[
                { value: 'Short', label: 'Short' },
                { value: 'Medium', label: 'Medium' },
                { value: 'Long', label: 'Long' },
              ]}
              style={styles.segmentedButtons}
            />

            <View style={styles.actionButtonsContainer}>
              {isEditing && (
                <Button
                  mode="outlined"
                  onPress={handleCancelEdit}
                  style={styles.cancelButton}
                >
                  Cancel
                </Button>
              )}
              <Button
                mode="contained"
                onPress={handleGenerateSummary}
                style={styles.generateButton}
                disabled={isLoading}
                icon={isEditing ? "pencil" : "auto-fix"}
              >
                {isLoading 
                  ? 'Processing...' 
                  : isEditing 
                    ? 'Update Summary' 
                    : 'Generate Summary'
                }
              </Button>
            </View>
          </View>

          {error && (
            <ErrorMessage
              message={error}
              onDismiss={clearError}
            />
          )}

          {isLoading && <LoadingIndicator message="Processing video..." />}

          {currentSummary && (
            <View style={styles.summaryContainer}>
              <Text style={styles.sectionTitle}>Generated Summary</Text>
              <SummaryCard summary={currentSummary} isDetailed={true} />
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        action={{
          label: 'OK',
          onPress: () => setSnackbarVisible(false),
        }}
      >
        {snackbarMessage}
      </Snackbar>
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
  scrollContent: {
    padding: 16,
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  urlInputContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  urlInput: {
    flex: 1,
    marginRight: 8,
  },
  pasteButton: {
    justifyContent: 'center',
  },
  optionLabel: {
    fontSize: 16,
    marginBottom: 8,
    marginTop: 16,
    color: '#555',
  },
  segmentedButtons: {
    marginBottom: 8,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 24,
  },
  cancelButton: {
    marginRight: 8,
  },
  generateButton: {
    minWidth: 180,
  },
  summaryContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
});

export default HomeScreen;
