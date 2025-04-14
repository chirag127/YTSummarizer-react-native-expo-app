import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, LogBox } from "react-native";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Navigation
import RootNavigator from "./src/navigation";

// Ignore specific warnings
LogBox.ignoreLogs([
    "Asyncstorage has been extracted from react-native",
    "VirtualizedLists should never be nested",
]);

// Define theme
const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: "#6200ee",
        accent: "#03dac4",
    },
};

export default function App() {
    return (
        <GestureHandlerRootView style={styles.container}>
            <SafeAreaProvider>
                <PaperProvider theme={theme}>
                    <StatusBar style="auto" />
                    <RootNavigator />
                </PaperProvider>
            </SafeAreaProvider>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
