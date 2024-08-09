// screens/HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const [data, setData] = useState( [ ] );
  const [loading, setLoading] = useState( true );
  const [error, setError] = useState( '' );

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=350', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((json) => {
        setData(json.results);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />;
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <FlatList
        data={data}
        keyExtractor={(item) => item.url}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{capitalizeFirstLetter(item.name)}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Details', { url: item.url })}>
              <Text style={styles.link}>Detail</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row', 
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },
  link: {
    color: 'blue',
    fontSize: 18,
  },
});

export default HomeScreen;
