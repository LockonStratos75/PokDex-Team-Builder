import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {styles} from '../stylesheet/styles';
import FastImage from 'react-native-fast-image';

export function Dashboard({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.h1}>PokeDash</Text>
      <View style={styles.dashButtonGroup}>
        <TouchableOpacity
          style={styles.dashButton}
          onPress={() => navigation.navigate('TeamManagement')}>
          <FastImage
            style={styles.iconBig}
            source={require('../icons/users-four-fill.png')}
          />
          <Text style={styles.text}>Manage Teams</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.dashButton}
          onPress={() => navigation.navigate('MainDex')}>
          <FastImage
            style={styles.iconBig}
            source={require('../icons/notepad-fill.png')}
          />
          <Text style={styles.text}>Pokedex</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
