
import React, { useState, useRef } from 'react';
import { View, Pressable, StyleSheet, Text, ActivityIndicator, ImageBackground, Platform, KeyboardAvoidingView } from 'react-native';
import { fetchStargazers } from './api/FetchStargazers';
import InputText from './components/InputText';
import { useTranslation } from 'react-i18next'; // Importing useTranslation hook for internationalization

const HomeScreen = ({ navigation }) => {

  const { t } = useTranslation();
  //State
  const [owner, setOwner] = useState('');
  const [repo, setRepo] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  //Ref for input element
  const ownerRef = useRef(null);
  const repoRef = useRef(null);

  // Determine if search button should be disabled
  const isDisabled = !owner.trim() || !repo.trim();

  const handleSearch = async () => {
    if (isDisabled) {
      return;
    } else {
      setLoading(true);
      setError(null);
      // Call fetchStargazers function to retrieve data
      const { data, error } = await fetchStargazers(owner, repo, t);

      if (data) {
        navigation.navigate('Stargazers', { stargazers: data });
      } else {
        setError(error);
      }

      setLoading(false);
    }
  };

  return (

    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={styles.container}
    >
      <View style={styles.container}>
        <ImageBackground source={require('../assets/giphy.gif')} style={styles.headerImage}>
          <View style={styles.overlay}>
            {<Text style={styles.text}>{t('discoverMessage')}</Text>}
          </View>
        </ImageBackground>
        <View style={styles.content}>
          <InputText
            ref={ownerRef}
            placeholder={t('ownerPlaceholder')}
            value={owner}
            onChangeText={setOwner}
            onSubmitEditing={() => repoRef.current.focus()}
            enterKeyHint="next"
          />
          <InputText
            ref={repoRef}
            placeholder={t('repositoryPlaceholder')}
            value={repo}
            onChangeText={setRepo}
            onSubmitEditing={handleSearch}
            enterKeyHint="done"
          />
          {error && <Text style={styles.errorText}>{error}</Text>}
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <Pressable style={!isDisabled ? styles.button : styles.buttonDisabled} onPress={handleSearch} disabled={isDisabled}>
              <Text style={styles.buttonText}>{t('getStargazersButton')}</Text>
            </Pressable>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

// StyleSheet for defining the input style
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  headerImage: {
    flex: 1,
    maxHeight: 200,
    resizeMode: 'cover',
    ...Platform.select({
      web: {
        width: '100%',
        height: 200,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: -1,
      },
    }),
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // Takes up the entire space of its parent container
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginVertical: 10,
    letterSpacing: 2,
    paddingBottom: 20,
  },
  content: {
    justifyContent: 'center',
    paddingTop: 50,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  buttonDisabled: {
    backgroundColor: '#A9A9A9',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default HomeScreen;
