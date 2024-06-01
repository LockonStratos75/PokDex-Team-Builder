import React, {useEffect, useState} from 'react';
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from '../stylesheet/styles';
// import firestore from '@react-native-firebase/firestore';
import {firestore} from '../firebase/firebaseConfig';
import FastImage from 'react-native-fast-image';

export function TeamManagement({navigation}) {
  const [teamName, setTeamName] = useState('');
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('Teams')
      .onSnapshot(snapshot => {
        const teamList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTeams(teamList);
      });

    return () => unsubscribe();
  }, []);

  const createTeam = async () => {
    if (!teamName.trim()) {
      Alert.alert('Error', 'Please enter a team name.');
      return;
    }

    try {
      await firestore().collection('Teams').doc(teamName).set({});
      Alert.alert('Success', 'Team created successfully!');
      setTeamName('');
    } catch (error) {
      console.error('Failed to create team:', error);
      Alert.alert('Error', 'Failed to create team. Please try again.');
    }
  };

  const deleteTeam = async teamId => {
    try {
      await firestore().collection('Teams').doc(teamId).delete();
      Alert.alert('Success', 'Team deleted successfully!');
    } catch (error) {
      console.error('Failed to delete team:', error);
      Alert.alert('Error', 'Failed to delete team. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter Team Name"
        placeholderTextColor="#ffffff"
        value={teamName}
        onChangeText={setTeamName}
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={createTeam}>
        <Text style={styles.text}>Create Team</Text>
      </TouchableOpacity>
      <ScrollView>
        {teams.map((team, index) => (
          <View key={index} style={styles.teamContainer}>
            <Text style={styles.teamName}>{team.id}</Text>
            <View style={styles.teamButtonGroup}>
              <TouchableOpacity
                style={styles.teamButton}
                onPress={() => deleteTeam(team.id)}>
                <FastImage
                  style={styles.iconMed}
                  source={require('../icons/trash-fill.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.teamButton}
                onPress={() =>
                  navigation.navigate('MainDex', {teamId: team.id})
                }>
                <FastImage
                  style={styles.iconMed}
                  source={require('../icons/plus-circle-fill.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.teamButton}
                onPress={() =>
                  navigation.navigate('ViewTeam', {teamId: team.id})
                }>
                <FastImage
                  style={styles.iconMed}
                  source={require('../icons/list-fill.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
