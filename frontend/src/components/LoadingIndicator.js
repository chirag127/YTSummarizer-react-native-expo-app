import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';

/**
 * Loading indicator component
 * @param {Object} props - Component props
 * @param {string} props.message - Optional message to display
 * @param {boolean} props.fullScreen - Whether to display full screen
 * @param {string} props.color - Color of the indicator
 * @param {string} props.size - Size of the indicator
 */
const LoadingIndicator = ({ 
  message = 'Loading...', 
  fullScreen = false,
  color = '#6200ee',
  size = 'large'
}) => {
  if (fullScreen) {
    return (
      <View style={styles.fullScreenContainer}>
        <ActivityIndicator size={size} color={color} />
        {message && <Text style={styles.message}>{message}</Text>}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
  },
  container: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
});

export default LoadingIndicator;
