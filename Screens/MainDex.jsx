import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Pokedex from 'pokedex-promise-v2';
import {styles} from '../stylesheet/styles';
import {firestore} from '../firebase/firebaseConfig';
import {useDebounce} from '../hooks/useDebounce';
import PokemonListItem from '../components/PokemonListItem';

const P = new Pokedex();

export function MainDex({navigation, route}) {
  const {teamId} = route.params || {};
  const [searchTerm, setSearchTerm] = useState('');
  const [allPokemons, setAllPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [specificSearchResult, setSpecificSearchResult] = useState(null);
  const [error, setError] = useState('');
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const limit = 10; // Load in larger batches for faster initial loading

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    const fetchInitialPokemons = async () => {
      try {
        const response = await P.getPokemonsList({limit, offset: 0});
        const detailedPokemons = await Promise.all(
          response.results.map(poke => P.getPokemonByName(poke.name)),
        );
        setAllPokemons(detailedPokemons);
        setFilteredPokemons(detailedPokemons);
        setOffset(prevOffset => prevOffset + limit);
      } catch (error) {
        console.error('Failed to fetch Pokémon:', error);
        Alert.alert('Failed to fetch Pokémon. Please try again.');
      }
      setLoading(false);
    };

    fetchInitialPokemons();
  }, []);

  useEffect(() => {
    if (teamId) {
      const unsubscribe = firestore()
        .collection('Teams')
        .doc(teamId)
        .onSnapshot(docSnapshot => {
          if (docSnapshot.exists) {
            setTeam(docSnapshot.data());
          }
        });

      return () => unsubscribe();
    }
  }, [teamId]);

  const handleSearch = useCallback(
    text => {
      setSearchTerm(text);
      setSpecificSearchResult(null);
      if (text.trim() === '') {
        setFilteredPokemons(allPokemons);
      } else {
        const filtered = allPokemons.filter(pokemon =>
          pokemon.name.toLowerCase().includes(text.toLowerCase()),
        );
        setFilteredPokemons(filtered);
      }
    },
    [allPokemons],
  );

  const handleSpecificSearch = useCallback(async () => {
    if (searchTerm.trim() === '') {
      setFilteredPokemons(allPokemons);
      setSpecificSearchResult(null);
      return;
    }

    setLoading(true);
    try {
      const normalizedTerm = searchTerm.toLowerCase().replace(/\s+/g, '-');
      const pokemon = await P.getPokemonByName(normalizedTerm);
      setFilteredPokemons([pokemon]);
      setSpecificSearchResult(pokemon);
      setLoading(false); // Ensure we set loading to false here
    } catch (error) {
      console.error('Failed to fetch Pokémon:', error);
      Alert.alert('Failed to fetch Pokémon. Please try again.');
      setLoading(false); // Ensure we set loading to false on error as well
    }
  }, [searchTerm, allPokemons]);

  const fetchMorePokemons = useCallback(async () => {
    if (loadingMore || specificSearchResult) return;
    setLoadingMore(true);
    try {
      const response = await P.getPokemonsList({limit, offset});
      const detailedPokemons = await Promise.all(
        response.results.map(poke => P.getPokemonByName(poke.name)),
      );
      setAllPokemons(prevPokemons => [...prevPokemons, ...detailedPokemons]);
      setFilteredPokemons(prevPokemons => [
        ...prevPokemons,
        ...detailedPokemons,
      ]);
      setOffset(prevOffset => prevOffset + limit);
      setLoadingMore(false); // Ensure we set loadingMore to false here
    } catch (error) {
      console.error('Failed to fetch more Pokémon:', error);
      Alert.alert('Failed to fetch more Pokémon. Please try again.');
      setLoadingMore(false); // Ensure we set loadingMore to false on error as well
    }
  }, [offset, loadingMore, specificSearchResult]);

  const addToParty = useCallback(
    async pokemon => {
      if (!teamId) {
        Alert.alert('Error', 'No team selected.');
        return;
      }
      try {
        const teamDoc = await firestore().collection('Teams').doc(teamId).get();
        const teamData = teamDoc.data();
        const teamPokemons = teamData.pokemons || [];

        if (teamPokemons.length === 6) {
          Alert.alert(
            'Team is full',
            'You can only have 6 Pokémon in your team.',
          );
          return;
        }

        const isDuplicate = teamPokemons.some(p => p.name === pokemon.name);

        if (isDuplicate) {
          Alert.alert(
            'Duplicate Pokémon',
            'This Pokémon is already in your team.',
          );
          return;
        }

        teamPokemons.push({
          id: pokemon.id,
          name: pokemon.name,
          height: pokemon.height,
          weight: pokemon.weight,
          base_experience: pokemon.base_experience,
          abilities: pokemon.abilities,
          stats: pokemon.stats,
        });

        await firestore()
          .collection('Teams')
          .doc(teamId)
          .update({pokemons: teamPokemons});

        Alert.alert('Success', 'Pokémon added to the party!');
      } catch (error) {
        console.error('Failed to add Pokémon to the party:', error);
        Alert.alert(
          'Error',
          'Failed to add Pokémon to the party. Please try again.',
        );
      }
    },
    [teamId],
  );

  const renderPokemon = useCallback(
    ({item, index}) => (
      <PokemonListItem
        key={`${item.name}-${index}`}
        item={item}
        onPress={poke => navigation.navigate('Poke', {poke})}
        onAddToParty={addToParty}
      />
    ),
    [addToParty, navigation],
  );

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter Pokemon Name"
        placeholderTextColor="#ffffff"
        value={searchTerm}
        onChangeText={handleSearch}
        style={styles.input}
      />
      <TouchableOpacity
        style={[styles.button, styles.mainB]}
        onPress={handleSpecificSearch}>
        <View style={styles.pokeAttributeView}>
          <FastImage
            style={styles.icon}
            source={require('../icons/pokeSearch.png')}
          />
          <Text style={styles.text}>Search</Text>
        </View>
      </TouchableOpacity>
      {loading ? (
        <ActivityIndicator size="large" color="#ff6961" />
      ) : (
        <FlatList
          data={
            specificSearchResult ? [specificSearchResult] : filteredPokemons
          }
          renderItem={renderPokemon}
          keyExtractor={(item, index) => `${item.name}-${index}`}
          onEndReached={fetchMorePokemons}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loadingMore && <ActivityIndicator size="small" color="#ff6961" />
          }
        />
      )}
    </View>
  );
}

export default MainDex;
