import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {styles} from '../stylesheet/styles';
import PokemonImage from './PokemonImage';

const PokemonListItem = React.memo(({item, onPress, onAddToParty}) => {
  return (
    <View key={item.name}>
      <TouchableOpacity
        style={styles.pokemonInfo}
        onPress={() => onPress(item)}>
        <PokemonImage
          primaryUri={`https://images.wikidexcdn.net/mwuploads/wikidex/thumb/9/92/latest/20200103224733/${item.name}_EpEc.gif/180px-${item.name}_EpEc.gif`}
          fallbackUri={item.sprites.other.showdown.front_default}
          style={styles.img}
        />
        <View style={styles.pokeDetails}>
          <Text style={styles.pokeNameText}>{item.name}</Text>
          <View style={styles.pokeAttributeView}>
            <View style={styles.pokeAttributeView}>
              <FastImage
                style={styles.icon}
                source={require('../icons/ruler-fill.png')}
              />
              <Text style={styles.text}>{item.height}</Text>
            </View>
            <View style={styles.pokeAttributeView}>
              <FastImage
                style={styles.icon}
                source={require('../icons/barbell-fill.png')}
              />
              <Text style={styles.text}>{item.weight}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={() => onAddToParty(item)}>
          <FastImage
            style={styles.iconMed}
            source={require('../icons/plus-circle-fill.png')}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
});

export default PokemonListItem;
