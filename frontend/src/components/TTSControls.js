import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, IconButton } from 'react-native-paper';

// Store
import useTTSStore from '../store/ttsStore';

/**
 * Text-to-Speech controls component
 * @param {Object} props - Component props
 * @param {string} props.text - Text to speak
 */
const TTSControls = ({ text }) => {
  const { speak, stop, isSpeaking, currentText } = useTTSStore();

  // Check if this text is currently being spoken
  const isThisTextSpeaking = isSpeaking && currentText === text;

  // Handle play/pause
  const handlePlayPause = () => {
    if (isThisTextSpeaking) {
      stop();
    } else {
      speak(text);
    }
  };

  // Handle stop
  const handleStop = () => {
    stop();
  };

  return (
    <View style={styles.container}>
      <Button 
        mode="contained" 
        icon={isThisTextSpeaking ? "pause" : "play"} 
        onPress={handlePlayPause}
        style={styles.playButton}
      >
        {isThisTextSpeaking ? "Pause" : "Play"}
      </Button>
      
      {isThisTextSpeaking && (
        <IconButton 
          icon="stop" 
          size={24} 
          onPress={handleStop} 
          style={styles.stopButton}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  playButton: {
    marginRight: 8,
  },
  stopButton: {
    backgroundColor: '#f5f5f5',
  },
});

export default TTSControls;
