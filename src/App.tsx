import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from './pages/Home.tsx';
import { Configuration } from './pages/Configuration.tsx';
import { Locations } from './pages/Locations.tsx';
import { PlayerDistribution } from './pages/PlayerDistribution.tsx';
import { Role } from './pages/Role.tsx';

// eslint-disable-next-line
export type RootStackParamList = {
  Home: undefined;
  Configuration: undefined;
  Locations: undefined;
  PlayerDistribution: { id: number };
  Role: { id: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerTitle: '' }}>
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Configuration" component={Configuration} />
        <Stack.Screen name="Locations" component={Locations} />
        <Stack.Screen name="PlayerDistribution" component={PlayerDistribution} />
        <Stack.Screen name="Role" component={Role} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
