import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import StargazersScreen from '../screens/StargazersScreen';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n'; // Importa la configurazione di i18next

const mockStargazers = [
  { id: 1, login: 'user1', avatar_url: 'https://example.com/avatar1.png' },
  { id: 2, login: 'user2', avatar_url: 'https://example.com/avatar2.png' },
];

describe('StargazersScreen', () => {
  test('renders correctly', async () => {
    // Rendi il tuo test asincrono aggiungendo `async` alla funzione di test
    const { getByText } = render(
      <I18nextProvider i18n={i18n}>
        <StargazersScreen route={{ params: { stargazers: mockStargazers } }} />
      </I18nextProvider>
    );

    // Usa waitFor per aspettare che i componenti siano caricati
    await waitFor(() => {
      expect(getByText('user1')).toBeTruthy();
      expect(getByText('user2')).toBeTruthy();
    });
  });
});
