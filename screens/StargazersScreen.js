import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, StatusBar, Dimensions, Platform } from 'react-native';
import { useTranslation } from 'react-i18next';

const StargazersScreen = ({ route }) => {

  const { t } = useTranslation();
  // Extracting stargazers data from navigation route parameters
  const { stargazers } = route.params;
  // Getting window height for responsive styling
  const { height } = Dimensions.get('window');

  const flatListStyles = Platform.OS === 'web' ? styles.webFlatList : styles.mobileFlatList;
  // Render Text if stargazers data not exists
  if (!stargazers || stargazers.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.infoText}>{t('noStargazers')}</Text>
      </View>
    );
  }
  // Render FlatList if stargazers data exists
  return (
    <View style={styles.container}>
      <FlatList
        data={stargazers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.stargazerItem}>
            <Image source={{ uri: item.avatar_url }} style={styles.avatar} />
            <Text style={styles.username}>{item.login}</Text>
          </View>
        )}
        contentContainerStyle={styles.contentContainer}
        style={flatListStyles}
      />
    </View>
  );
};
// StyleSheet for defining the input style
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  contentContainer: {
    flexGrow: 1,
  },
  stargazerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    marginLeft: 10,
  },
  username: {
    fontSize: 16,
  },
  infoText: {
    textAlign: 'center',
    fontSize: 18,
    paddingTop: 50,

  },
  webFlatList: {
    height: '100vh',
  },
  mobileFlatList: {
    height: '100%',
  },
});

export default StargazersScreen;
