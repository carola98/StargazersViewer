import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import HomeScreen from '../screens/HomeScreen';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n'; 
import { useNavigation } from '@react-navigation/native';
import renderer from 'react-test-renderer';
import { TextInput }  from 'react-native';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

describe('HomeScreen', () => {
  it('renders correctly', () => {
    const { getByText, getByPlaceholderText } = render(
      <I18nextProvider i18n={i18n}>
        <HomeScreen />
      </I18nextProvider>
    );

    expect(getByText('Discover who starred the repository.')).toBeTruthy();
    expect(getByPlaceholderText('Owner')).toBeTruthy();
    expect(getByPlaceholderText('Repository')).toBeTruthy();
    expect(getByText('Get Stargazers')).toBeTruthy();


  });

});