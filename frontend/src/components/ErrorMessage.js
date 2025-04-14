import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

/**
 * Error message component
 * @param {Object} props - Component props
 * @param {string} props.message - Error message to display
 * @param {Function} props.onRetry - Optional retry function
 * @param {Function} props.onDismiss - Optional dismiss function
 */
const ErrorMessage = ({ 
  message = 'An error occurred', 
  onRetry,
  onDismiss
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name="alert-circle" size={24} color="#d32f2f" />
      </View>
      <Text style={styles.message}>{message}</Text>
      <View style={styles.buttonContainer}>
        {onDismiss && (
          <TouchableOpacity style={styles.dismissButton} onPress={onDismiss}>
            <Text style={styles.dismissButtonText}>Dismiss</Text>
          </TouchableOpacity>
        )}
        {onRetry && (
          <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffebee',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#d32f2f',
  },
  iconContainer: {
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  dismissButton: {
    marginRight: 8,
    padding: 8,
  },
  dismissButtonText: {
    color: '#666',
    fontSize: 14,
  },
  retryButton: {
    padding: 8,
  },
  retryButtonText: {
    color: '#d32f2f',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ErrorMessage;
