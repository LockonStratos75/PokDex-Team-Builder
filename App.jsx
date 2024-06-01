import React from 'react';
import {MainDex} from './Screens/MainDex';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SpecificPoke} from './Screens/SpecificPoke';
import {TeamManagement} from './Screens/TeamManagement';
import {Dashboard} from './Screens/Dashboard';
import {ViewTeam} from './Screens/ViewTeam';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={'Dashboard'}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="TeamManagement" component={TeamManagement} />
        <Stack.Screen name="MainDex" component={MainDex} />
        <Stack.Screen name="ViewTeam" component={ViewTeam} />
        <Stack.Screen name="Poke" component={SpecificPoke} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
