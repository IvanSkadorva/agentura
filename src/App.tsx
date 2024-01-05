import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from './pages/Home.tsx';
import { Configuration } from './pages/Configuration.tsx';
import { Localizations } from './pages/Localizations.tsx';
import { PlayerDistribution } from './pages/PlayerDistribution.tsx';

// eslint-disable-next-line
export type RootStackParamList = {
  Home: undefined;
  Configuration: undefined;
  Localizations: undefined;
  PlayerDistribution: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerTitle: '' }}>
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Configuration" component={Configuration} />
        <Stack.Screen name="Localizations" component={Localizations} />
        <Stack.Screen
          name="PlayerDistribution"
          component={PlayerDistribution}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
