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
import { MAIN_BLACK, MAIN_WHITE } from './styles/colors.ts';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { LocationSettings } from './components/organisms/LocationSettings.tsx';
import { LocationForm } from './pages/LocationForm.tsx';
import { VotingModal } from './pages/VotingModal.tsx';
import { ChooseWinner } from './pages/ChooseWinner.tsx';
import { useAppStore } from './store/app-store.ts';
import i18n from 'i18next';
import { memo, useEffect } from 'react';

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
  const language = useAppStore((state) => state.language);

  useEffect(() => {
    void i18n.changeLanguage(language);
  }, [language]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={() => ({
            headerTitle: '',
            headerTintColor: MAIN_BLACK,
            headerStyle: {
              backgroundColor: MAIN_WHITE,
            },
          })}
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
            options={{ headerShown: false }}
            component={PlayerDistribution}
          />
          <Stack.Screen name="Role" component={Role} options={{ headerShown: false }} />
          <Stack.Screen name="Hint" component={Hint} options={{ headerShown: false }} />
          <Stack.Screen name="Timer" component={Timer} options={{ headerShown: false }} />
          <Stack.Screen
            name="VotingModal"
            component={VotingModal}
            options={{
              headerShown: false,
              presentation: 'containedModal',
            }}
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
