import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { TextInput, Button, Text, Snackbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

// Store
import useAuthStore from '../../store/authStore';

// Components
import LoadingIndicator from '../../components/LoadingIndicator';

const ForgotPasswordScreen = ({ navigation }) => {
  // State
  const [email, setEmail] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [resetSent, setResetSent] = useState(false);

  // Auth store
  const { resetPassword, isLoading } = useAuthStore();

  // Handle reset password
  const handleResetPassword = async () => {
    if (!email) {
      setSnackbarMessage('Please enter your email address');
      setSnackbarVisible(true);
      return;
    }

    const result = await resetPassword(email);
    
    if (result.success) {
      setResetSent(true);
      setSnackbarMessage('Password reset instructions sent to your email');
      setSnackbarVisible(true);
    } else {
      setSnackbarMessage(result.error || 'Failed to send reset instructions');
      setSnackbarVisible(true);
    }
  };

  // Handle navigation to login
  const handleNavigateToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../../../assets/icon.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.appName}>VidSummify</Text>
            <Text style={styles.tagline}>Reset your password</Text>
          </View>

          <View style={styles.formContainer}>
            {!resetSent ? (
              <>
                <Text style={styles.instructions}>
                  Enter your email address and we'll send you instructions to reset your password.
                </Text>

                <TextInput
                  label="Email"
                  value={email}
                  onChangeText={setEmail}
                  mode="outlined"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  style={styles.input}
                  left={<TextInput.Icon icon="email" />}
                />

                <Button
                  mode="contained"
                  onPress={handleResetPassword}
                  style={styles.resetButton}
                  disabled={isLoading}
                >
                  {isLoading ? 'Sending...' : 'Send Reset Instructions'}
                </Button>
              </>
            ) : (
              <View style={styles.successContainer}>
                <Text style={styles.successText}>
                  Reset instructions have been sent to your email address. Please check your inbox and follow the instructions to reset your password.
                </Text>
                <Button
                  mode="contained"
                  onPress={handleNavigateToLogin}
                  style={styles.backToLoginButton}
                >
                  Back to Login
                </Button>
              </View>
            )}

            <View style={styles.loginContainer}>
              <Text>Remember your password? </Text>
              <TouchableOpacity onPress={handleNavigateToLogin}>
                <Text style={styles.loginText}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>

          {isLoading && <LoadingIndicator message="Sending reset instructions..." />}
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
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  logo: {
    width: 100,
    height: 100,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 16,
    color: '#6200ee',
  },
  tagline: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  instructions: {
    marginBottom: 24,
    textAlign: 'center',
    color: '#555',
  },
  input: {
    marginBottom: 16,
  },
  resetButton: {
    marginTop: 8,
    marginBottom: 16,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  loginText: {
    color: '#6200ee',
    fontWeight: 'bold',
  },
  successContainer: {
    alignItems: 'center',
    padding: 16,
  },
  successText: {
    textAlign: 'center',
    marginBottom: 24,
    color: '#555',
  },
  backToLoginButton: {
    marginTop: 8,
  },
});

export default ForgotPasswordScreen;
