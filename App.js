// Import necessary modules and libraries
import 'react-native-gesture-handler';
import 'intl-pluralrules';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import StargazersScreen from './screens/StargazersScreen';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

// Create a stack navigator instance
const Stack = createStackNavigator();

const App = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: i18n.t('stargazersViewer'), headerTitleAlign: 'center' }}
          />
          <Stack.Screen name="Stargazers" component={StargazersScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </I18nextProvider>
  );
};
export default App; // Export the App component as the default