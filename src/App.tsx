import * as React from 'react';
import { memo, useEffect } from 'react';
import { Appearance } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { Home } from './pages/Home';
import { Configuration } from './pages/Configuration';
import { Locations } from './pages/Locations';
import { PlayerDistribution } from './pages/PlayerDistribution';
import { Role } from './pages/Role';
import { Hint } from './pages/Hint';
import { Timer } from './pages/Timer';
import { Winner } from './pages/Winner';
import { Info } from './pages/Info';
import { Onboarding } from './pages/Onboarding';
import { LocationForm } from './pages/LocationForm';
import { VotingModal } from './pages/VotingModal';
import { ChooseWinner } from './pages/ChooseWinner';

import { LocationSettings } from './components/organisms/LocationSettings';
import { useAppStore } from './store/app-store';
import i18n from 'i18next';
import { MAIN_BLACK, MAIN_WHITE } from './styles/colors';

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
  LocationForm: { id?: string };
  VotingModal: undefined;
  ChooseWinner: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const LocationSetting = memo(LocationSettings);

function App(): React.JSX.Element {
  const language = useAppStore.use.language();

  useEffect(() => {
    void i18n.changeLanguage(language);
    Appearance.setColorScheme('light'); // RN 0.81 allows this
  }, [language]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerTitle: '',
            headerTintColor: MAIN_BLACK,
            headerStyle: {
              backgroundColor: MAIN_WHITE,
            },
          }}
        >
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="Configuration" component={Configuration} />
          <Stack.Screen
            name="Locations"
            component={Locations}
            options={{
              headerRight: () => <LocationSetting />,
            }}
          />
          <Stack.Screen name="LocationForm" component={LocationForm} />
          <Stack.Screen
            name="PlayerDistribution"
            component={PlayerDistribution}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Role" component={Role} options={{ headerShown: false }} />
          <Stack.Screen name="Hint" component={Hint} options={{ headerShown: false }} />
          <Stack.Screen name="Timer" component={Timer} options={{ headerShown: false }} />
          <Stack.Screen
            name="VotingModal"
            component={VotingModal}
            options={{ headerShown: false, presentation: 'containedModal' }}
          />
          <Stack.Screen
            name="ChooseWinner"
            component={ChooseWinner}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Winner" component={Winner} options={{ headerShown: false }} />
          <Stack.Screen name="Info" component={Info} />
          <Stack.Screen name="Onboarding" component={Onboarding} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;
