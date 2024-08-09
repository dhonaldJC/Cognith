// screens/DetailScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator, Image } from 'react-native';

const DetailScreen = ({ route, navigation }) => {
  const { url } = route.params;
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch Pokémon details');
        }
        const data = await response.json();
        setPokemonDetails(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [url]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>Error: {error}</Text>
      </View>
    );
  }
  
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <View style={styles.container}>
      {pokemonDetails && (
        <>
          <Text style={styles.title}>{capitalizeFirstLetter(pokemonDetails.name)}</Text>
          <Image
            source={{ uri: pokemonDetails.sprites.other.home.front_default }}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.detail}>Base Experience: {pokemonDetails.base_experience}</Text>
          <Text style={styles.detail}>Height: {pokemonDetails.height}</Text>
          <Text style={styles.detail}>Weight: {pokemonDetails.weight}</Text>
          {/* Add more details as needed */}
        </>
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  detail: {
    fontSize: 18,
    marginBottom: 10,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20
  },
});

export default DetailScreen;
