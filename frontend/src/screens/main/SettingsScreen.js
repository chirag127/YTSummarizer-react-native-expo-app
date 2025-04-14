import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Alert, Linking } from 'react-native';
import { Appbar, Text, List, Switch, Button, Divider, Slider, Dialog, Portal, RadioButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

// Components
import LoadingIndicator from '../../components/LoadingIndicator';

// Stores
import useAuthStore from '../../store/authStore';
import useTTSStore from '../../store/ttsStore';

const SettingsScreen = () => {
  // State
  const [voiceDialogVisible, setVoiceDialogVisible] = useState(false);
  
  // Auth store
  const { signOut, user } = useAuthStore();
  
  // TTS store
  const { 
    speed, 
    pitch, 
    voice, 
    availableVoices,
    setSpeed, 
    setPitch, 
    setVoice,
    initialize,
    refreshVoices,
    isSpeaking,
    stop
  } = useTTSStore();
  
  // Initialize TTS settings
  useEffect(() => {
    initialize();
  }, [initialize]);
  
  // Handle logout
  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          onPress: async () => {
            // Stop any ongoing TTS
            if (isSpeaking) {
              await stop();
            }
            await signOut();
          }
        },
      ]
    );
  };
  
  // Handle speed change
  const handleSpeedChange = (value) => {
    setSpeed(value);
  };
  
  // Handle pitch change
  const handlePitchChange = (value) => {
    setPitch(value);
  };
  
  // Handle voice selection
  const handleVoiceSelect = (selectedVoice) => {
    setVoice(selectedVoice);
    setVoiceDialogVisible(false);
  };
  
  // Handle refresh voices
  const handleRefreshVoices = async () => {
    await refreshVoices();
  };
  
  // Handle open privacy policy
  const handleOpenPrivacyPolicy = async () => {
    // Replace with your actual privacy policy URL
    const url = 'https://www.example.com/privacy-policy';
    
    try {
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
      }
    } catch (error) {
      console.error('Error opening URL:', error);
    }
  };
  
  // Handle open terms of service
  const handleOpenTermsOfService = async () => {
    // Replace with your actual terms of service URL
    const url = 'https://www.example.com/terms-of-service';
    
    try {
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
      }
    } catch (error) {
      console.error('Error opening URL:', error);
    }
  };
  
  // Handle send feedback
  const handleSendFeedback = async () => {
    // Replace with your actual feedback email
    const email = 'feedback@vidsummify.com';
    const subject = 'VidSummify Feedback';
    const body = 'I would like to provide feedback about VidSummify:';
    
    const url = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    try {
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
      }
    } catch (error) {
      console.error('Error opening email client:', error);
    }
  };
  
  // Format speed label
  const formatSpeedLabel = (speed) => {
    return `${speed.toFixed(1)}x`;
  };
  
  // Format pitch label
  const formatPitchLabel = (pitch) => {
    if (pitch === 1.0) return 'Normal';
    return pitch < 1.0 ? 'Lower' : 'Higher';
  };
  
  // Get current voice name
  const getCurrentVoiceName = () => {
    if (!voice) return 'System Default';
    
    const selectedVoice = availableVoices.find(v => v.identifier === voice);
    return selectedVoice ? selectedVoice.name : 'System Default';
  };
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <Appbar.Header>
        <Appbar.Content title="Settings" />
      </Appbar.Header>
      
      <ScrollView style={styles.container}>
        {/* User Info Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <List.Item
            title="Email"
            description={user?.email || 'Not available'}
            left={props => <List.Icon {...props} icon="email" />}
          />
          <Button
            mode="outlined"
            icon="logout"
            onPress={handleLogout}
            style={styles.logoutButton}
          >
            Logout
          </Button>
        </View>
        
        <Divider />
        
        {/* TTS Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Text-to-Speech Settings</Text>
          
          {/* Speed Setting */}
          <Text style={styles.settingLabel}>
            Speech Speed: {formatSpeedLabel(speed)}
          </Text>
          <View style={styles.sliderContainer}>
            <Text style={styles.sliderLabel}>0.5x</Text>
            <Slider
              style={styles.slider}
              value={speed}
              onValueChange={handleSpeedChange}
              minimumValue={0.5}
              maximumValue={16.0}
              step={0.1}
              minimumTrackTintColor="#6200ee"
              maximumTrackTintColor="#000000"
            />
            <Text style={styles.sliderLabel}>16.0x</Text>
          </View>
          
          {/* Pitch Setting */}
          <Text style={styles.settingLabel}>
            Speech Pitch: {formatPitchLabel(pitch)}
          </Text>
          <View style={styles.sliderContainer}>
            <Text style={styles.sliderLabel}>Lower</Text>
            <Slider
              style={styles.slider}
              value={pitch}
              onValueChange={handlePitchChange}
              minimumValue={0.5}
              maximumValue={2.0}
              step={0.1}
              minimumTrackTintColor="#6200ee"
              maximumTrackTintColor="#000000"
            />
            <Text style={styles.sliderLabel}>Higher</Text>
          </View>
          
          {/* Voice Setting */}
          <List.Item
            title="Voice"
            description={getCurrentVoiceName()}
            left={props => <List.Icon {...props} icon="account-voice" />}
            onPress={() => setVoiceDialogVisible(true)}
            right={props => <List.Icon {...props} icon="chevron-right" />}
          />
          
          <Button
            mode="outlined"
            icon="refresh"
            onPress={handleRefreshVoices}
            style={styles.refreshButton}
          >
            Refresh Available Voices
          </Button>
        </View>
        
        <Divider />
        
        {/* App Info Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Information</Text>
          
          <List.Item
            title="Privacy Policy"
            left={props => <List.Icon {...props} icon="shield-account" />}
            onPress={handleOpenPrivacyPolicy}
            right={props => <List.Icon {...props} icon="open-in-new" />}
          />
          
          <List.Item
            title="Terms of Service"
            left={props => <List.Icon {...props} icon="file-document" />}
            onPress={handleOpenTermsOfService}
            right={props => <List.Icon {...props} icon="open-in-new" />}
          />
          
          <List.Item
            title="Send Feedback"
            left={props => <List.Icon {...props} icon="message" />}
            onPress={handleSendFeedback}
            right={props => <List.Icon {...props} icon="send" />}
          />
          
          <List.Item
            title="Version"
            description="1.0.0"
            left={props => <List.Icon {...props} icon="information" />}
          />
        </View>
      </ScrollView>
      
      {/* Voice Selection Dialog */}
      <Portal>
        <Dialog
          visible={voiceDialogVisible}
          onDismiss={() => setVoiceDialogVisible(false)}
          style={styles.dialog}
        >
          <Dialog.Title>Select Voice</Dialog.Title>
          <Dialog.ScrollArea style={styles.dialogScrollArea}>
            <ScrollView>
              <RadioButton.Group
                onValueChange={handleVoiceSelect}
                value={voice}
              >
                <RadioButton.Item
                  label="System Default"
                  value={null}
                />
                {availableVoices.map((v) => (
                  <RadioButton.Item
                    key={v.identifier}
                    label={v.name}
                    value={v.identifier}
                  />
                ))}
              </RadioButton.Group>
            </ScrollView>
          </Dialog.ScrollArea>
          <Dialog.Actions>
            <Button onPress={() => setVoiceDialogVisible(false)}>Cancel</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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
  section: {
    padding: 16,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  logoutButton: {
    marginTop: 8,
  },
  settingLabel: {
    fontSize: 16,
    marginTop: 16,
    marginBottom: 8,
    color: '#555',
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  slider: {
    flex: 1,
    height: 40,
  },
  sliderLabel: {
    width: 50,
    textAlign: 'center',
    fontSize: 12,
    color: '#666',
  },
  refreshButton: {
    marginTop: 16,
  },
  dialog: {
    maxHeight: '80%',
  },
  dialogScrollArea: {
    maxHeight: 400,
  },
});

export default SettingsScreen;
