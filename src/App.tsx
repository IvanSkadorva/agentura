import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from './pages/Home.tsx';
import { Configuration } from './pages/Configuration.tsx';
import { Locations } from './pages/Locations.tsx';
import { PlayerDistribution } from './pages/PlayerDistribution.tsx';
import { Role } from './pages/Role.tsx';
import { Hint } from './pages/Hint.tsx';
import { Timer } from './pages/Timer.tsx';
import { Winner } from './pages/Winner.tsx';
import { Info } from './pages/Info.tsx';
import { Onboarding } from './pages/Onboarding.tsx';

export enum PlayerRole {
  CIVIL,
  SPY,
}

// eslint-disable-next-line
export type RootStackParamList = {
  Home: undefined;
  Configuration: undefined;
  Locations: undefined;
  PlayerDistribution: { id: number };
  Role: { id: number };
  Hint: undefined;
  Timer: undefined;
  Winner: { winner: PlayerRole };
  Info: undefined;
  Onboarding: undefined;
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
        <Stack.Screen name="Role" component={Role} options={{ headerShown: false }} />
        <Stack.Screen name="Hint" component={Hint} options={{ headerShown: false }} />
        <Stack.Screen name="Timer" component={Timer} options={{ headerShown: false }} />
        <Stack.Screen name="Winner" component={Winner} options={{ headerShown: false }} />
        <Stack.Screen name="Info" component={Info} />
        <Stack.Screen name="Onboarding" component={Onboarding} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
