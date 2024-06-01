import React, {useEffect, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {styles} from '../stylesheet/styles';
import FastImage from 'react-native-fast-image';
import SvgUri from 'react-native-svg-uri';
import {Bar} from 'react-native-progress';

const typeImages = {
  fire: require('../icons/fire.svg'),
  water: require('../icons/water.svg'),
  bug: require('../icons/bug.svg'),
  dark: require('../icons/dark.svg'),
  dragon: require('../icons/dragon.svg'),
  flying: require('../icons/flying.svg'),
  electric: require('../icons/electric.svg'),
  fairy: require('../icons/fairy.svg'),
  fighting: require('../icons/fighting.svg'),
  ghost: require('../icons/ghost.svg'),
  grass: require('../icons/grass.svg'),
  ice: require('../icons/ice.svg'),
  normal: require('../icons/normal.svg'),
  poison: require('../icons/poison.svg'),
  rock: require('../icons/rock.svg'),
  steel: require('../icons/steel.svg'),
  ground: require('../icons/ground.svg'),
  psychic: require('../icons/psychic.svg'),
};

export function SpecificPoke({route, navigation}) {
  const {poke} = route.params;
  const [selectedImage, setSelectedImage] = useState(
    poke.sprites.other['official-artwork'].front_default,
  );
  const [pokeDetails, setPokeDetails] = useState(null);
  const [dexEntry, setDexEntry] = useState('');

  useEffect(() => {
    const fetchPokeDetails = async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon-species/${poke.id}`,
        );
        const details = await response.json();
        setPokeDetails(details);

        // Get the English flavor text entry and clean it
        const flavorText = details.flavor_text_entries.find(
          entry => entry.language.name === 'en',
        );
        const cleanedFlavorText = flavorText
          ? flavorText.flavor_text.replace(/(\n|\f)/g, ' ')
          : 'No dex entry available.';
        setDexEntry(cleanedFlavorText);
      } catch (error) {
        console.error('Failed to fetch Pokemon details:', error);
      }
    };

    fetchPokeDetails();
  }, [poke.id]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.h1}>{poke.name}</Text>
      <View>
        <FastImage style={styles.mainPokeImg} source={{uri: selectedImage}} />
        <View style={styles.dexTextView}>
          <Text style={styles.dexText}>{dexEntry}</Text>
        </View>
        <View style={styles.typeContainer}>
          {poke.types.map((type, index) => (
            <View key={index} style={styles.typeContainer}>
              <SvgUri
                width="20"
                height="20"
                style={[styles.typeImage, styles[type.type.name]]}
                source={typeImages[type.type.name]}
              />
            </View>
          ))}
        </View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.pokeIcons}>
          <TouchableOpacity
            onPress={() =>
              setSelectedImage(
                poke.sprites.other['official-artwork'].front_default,
              )
            }>
            <FastImage
              style={styles.pokeIconButton}
              source={{
                uri: poke.sprites.other['official-artwork'].front_default,
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              setSelectedImage(
                poke.sprites.other['official-artwork'].front_shiny,
              )
            }>
            <FastImage
              style={styles.pokeIconButton}
              source={{uri: poke.sprites.other['official-artwork'].front_shiny}}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setSelectedImage(poke.sprites.back_default)}>
            <FastImage
              style={styles.pokeIconButton}
              source={{uri: poke.sprites.back_default}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedImage(poke.sprites.front_default)}>
            <FastImage
              style={styles.pokeIconButton}
              source={{uri: poke.sprites.front_default}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedImage(poke.sprites.back_shiny)}>
            <FastImage
              style={styles.pokeIconButton}
              source={{uri: poke.sprites.back_shiny}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedImage(poke.sprites.front_shiny)}>
            <FastImage
              style={styles.pokeIconButton}
              source={{uri: poke.sprites.front_shiny}}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              setSelectedImage(poke.sprites.other?.dream_world?.front_default)
            }>
            <FastImage
              style={styles.pokeIconButton}
              source={{uri: poke.sprites.other?.dream_world?.front_default}}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              setSelectedImage(poke.sprites.other?.dream_world?.front_shiny)
            }>
            <FastImage
              style={styles.pokeIconButton}
              source={{uri: poke.sprites.other?.dream_world?.front_shiny}}
            />
          </TouchableOpacity>
        </ScrollView>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.detailsContainer}>
          <View style={styles.detail}>
            <Text style={styles.h2}>Stats</Text>
            {poke.stats.map((stat, index) => (
              <View key={index} style={styles.statRow}>
                <Text style={styles.statText}>{stat.stat.name}</Text>
                <View style={styles.statBarContainer}>
                  <Bar
                    progress={stat.base_stat / 255}
                    width={null}
                    height={10}
                    borderRadius={5}
                    color={'#ff6961'}
                    unfilledColor={'#e0e0e0'}
                  />
                </View>
                <Text style={styles.statValue}>{stat.base_stat}</Text>
              </View>
            ))}
          </View>

          <View style={styles.detail}>
            <Text style={styles.h2}>Moves</Text>
            <View style={styles.moveGrid}>
              {poke.moves.map((move, index) => (
                <View key={index} style={styles.move}>
                  <Text style={styles.text}>{move.move.name}</Text>
                </View>
              ))}
            </View>
          </View>

          {pokeDetails && (
            <>
              <View style={styles.detail}>
                <Text style={styles.h2}>Details</Text>
                <Text style={styles.text}>
                  Base Happiness: {pokeDetails.base_happiness}
                </Text>
                <Text style={styles.text}>
                  Capture Rate: {pokeDetails.capture_rate}
                </Text>
                <Text style={styles.text}>Color: {pokeDetails.color.name}</Text>
                <Text style={styles.text}>
                  Egg Groups:{' '}
                  {pokeDetails.egg_groups.map(group => group.name).join(', ')}
                </Text>
                <Text style={styles.text}>
                  Growth Rate: {pokeDetails.growth_rate.name}
                </Text>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </ScrollView>
  );
}
