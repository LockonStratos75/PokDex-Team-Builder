import React, {useEffect, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {styles} from '../stylesheet/styles';
import firestore from '@react-native-firebase/firestore';
import PokemonImage from '../components/PokemonImage';

export function ViewTeam({route, navigation}) {
  const {teamId} = route.params;
  const [team, setTeam] = useState(null);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('Teams')
      .doc(teamId)
      .onSnapshot(docSnapshot => {
        if (docSnapshot.exists) {
          setTeam(docSnapshot.data());
        }
      });
    return () => unsubscribe();
  }, [teamId]);

  if (!team) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Loading team...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Team: {teamId}</Text>
      <ScrollView>
        {team.pokemons &&
          team.pokemons.map((pokemon, index) => (
            <TouchableOpacity
              key={index}
              style={styles.pokemonInfo}
            >
              <Text style={styles.pokeNameText}>{pokemon.name}</Text>
              <PokemonImage
                primaryUri={`https://images.wikidexcdn.net/mwuploads/wikidex/thumb/9/92/latest/20200103224733/${pokemon.name}_EpEc.gif/180px-${pokemon.name}_EpEc.gif`}
                fallbackUri={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${pokemon.id}.gif`}
                style={styles.img}
              />
            </TouchableOpacity>
          ))}
      </ScrollView>
    </View>
  );
}
