import { create, type StoreApi, type UseBoundStore } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist, createJSONStorage } from 'zustand/middleware';
import sampleSize from 'lodash.samplesize';
import i18n from 'i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeModules, Platform } from 'react-native';
import Sound from 'react-native-sound';

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never;

const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  _store: S
): WithSelectors<S> => {
  const store = _store as WithSelectors<typeof _store>;
  store.use = {};
  for (const k of Object.keys(store.getState())) {
    (store.use as any)[k] = () => store((s) => s[k as keyof typeof s]);
  }

  return store;
};

export interface Location {
  id: string;
  key: string;
  enabled: boolean;
  roles: string[];
}
export enum SoundFile {
  Primary = 'button_primary.mp3',
  Secondary = 'button_secondary.mp3',
  Winner = 'winner.mp3',
  Timer = 'timer.mp3',
  Background = 'background.mp3',
  RoleReveal = 'role_reveal.mp3',
}

const buttonPrimarySound = new Sound(SoundFile.Primary, Sound.MAIN_BUNDLE);
const buttonSecondarySound = new Sound(SoundFile.Secondary, Sound.MAIN_BUNDLE);
const winnerSound = new Sound(SoundFile.Winner, Sound.MAIN_BUNDLE);
const timerSound = new Sound(SoundFile.Timer, Sound.MAIN_BUNDLE);
const backgroundSound = new Sound(SoundFile.Background, Sound.MAIN_BUNDLE);
const roleRevealSound = new Sound(SoundFile.RoleReveal, Sound.MAIN_BUNDLE);

interface CurrentGame {
  players: Array<{ id: number; role: string }>;
  location: Location;
}

interface AppState {
  civils: number;
  spies: number;
  gameTimeInMinutes: number;
  currentGame: CurrentGame;
  isRoleGame: boolean;
  enableHintsForSpies: boolean;
  locations: Location[];
  language: string;
  isSoundEnabled: boolean;
  showLocationsHint: boolean;
  sounds: Sound[];
}

interface AppActions {
  setCivilsAmount: (players: number) => void;
  setSpiesAmount: (spies: number) => void;
  setGameTimeInMinutes: (time: number) => void;
  toggleRoleGame: () => void;
  setEnableHintsForSpies: (enableHintsForSpies: boolean) => void;
  toggleLocation: (id: string) => void;
  setLocations: (locations: Location[]) => void;
  deleteLocation: (id: string) => void;
  addLocation: (location: Location) => void;
  editLocation: (location: Location) => void;
  startGame: () => void;
  resetLocations: () => void;
  setLanguage: (language: string) => void;
  toggleSound: () => void;
  playSound: (file: SoundFile, volume?: number) => void;
  stopSound: (file: SoundFile) => void;
  hideLocationsHint: () => void;
}

const getBaseLocations = (): Location[] => {
  return i18n.t('locations', { returnObjects: true }) as unknown as Location[];
};

const getPreferredLanguage = (): string => {
  const defaultLang = 'en';
  const supportedLanguages = ['en', 'pl', 'ru', 'ua', 'be', 'by', 'de'];
  const locale =
    Platform.OS === 'ios'
      ? NativeModules.SettingsManager?.settings?.AppleLocale ||
        NativeModules.SettingsManager?.settings?.AppleLanguages[0] ||
        ''
      : NativeModules.I18nManager?.localeIdentifier || '';

  const [lowerCaseLocale] = locale.toString().split('_');

  if (supportedLanguages.includes(lowerCaseLocale as string)) {
    console.log('locale', lowerCaseLocale);
    return lowerCaseLocale === 'ru' ? 'be_cy' : lowerCaseLocale;
  }
  console.log(`locale ${lowerCaseLocale} is not supported, defaulting to ${defaultLang}`);

  return defaultLang;
};
const initialState: AppState = {
  civils: 4,
  spies: 1,
  gameTimeInMinutes: 5,
  isRoleGame: false,
  currentGame: { players: [], location: { id: '0', key: '', enabled: false, roles: [] } },
  enableHintsForSpies: false,
  locations: getBaseLocations(),
  language: getPreferredLanguage(),
  isSoundEnabled: false,
  showLocationsHint: true,
  sounds: [
    buttonPrimarySound,
    buttonSecondarySound,
    winnerSound,
    timerSound,
    backgroundSound,
    roleRevealSound,
  ],
};

const useAppStoreBase = create<AppState & AppActions>()(
  persist(
    immer((set) => ({
      ...initialState,
      setCivilsAmount: (civils) => {
        set((state) => ({ ...state, civils }));
      },
      setSpiesAmount: (spies) => {
        set((state) => ({ ...state, spies }));
      },
      setGameTimeInMinutes: (gameTimeInMinutes) => {
        set((state) => ({ ...state, gameTimeInMinutes }));
      },
      toggleRoleGame: () => {
        set((state) => {
          state.isRoleGame = !state.isRoleGame;
        });
      },
      setEnableHintsForSpies: (enableHintsForSpies) => {
        set((state) => ({ ...state, enableHintsForSpies }));
      },
      toggleLocation: (id: string) => {
        set((state) => {
          const selectedIndex = state.locations.findIndex((l: Location) => l.id === id);
          state.locations[selectedIndex].enabled = !state.locations[selectedIndex].enabled;
        });
      },
      setLocations: (locations) => {
        set((state) => ({ ...state, locations }));
      },
      deleteLocation: (id: string) => {
        set((state) => {
          state.locations = state.locations.filter((l: Location) => l.id !== id);
        });
      },
      startGame: () => {
        set((state) => {
          const enabledLocations = state.locations.filter((l: Location) => l.enabled);
          const selectedLocation =
            enabledLocations[Math.floor(Math.random() * enabledLocations.length)];

          const shuffledRoles = selectedLocation.roles.sort(() => Math.random() - 0.5);

          state.currentGame.location = selectedLocation;

          const playersIndexes = Array.from(Array(state.civils + state.spies).keys());
          const spiesIndexes = sampleSize(playersIndexes, state.spies);

          state.currentGame.players = [];
          playersIndexes.forEach((index) => {
            if (spiesIndexes.includes(index)) {
              state.currentGame.players.push({ id: index + 1, role: 'role.spy' });
            } else {
              state.currentGame.players.push({
                id: index + 1,
                role: state.isRoleGame ? shuffledRoles[index] : 'role.civil',
              });
            }
          });
        });
      },
      resetLocations: () => {
        set((state) => {
          state.locations = getBaseLocations();
        });
      },
      addLocation: (location) => {
        set((state) => {
          state.locations.push(location);
        });
      },
      hideLocationsHint: () => {
        set((state) => {
          state.showLocationsHint = false;
        });
      },
      setLanguage: (language) => {
        set((state) => {
          void i18n.changeLanguage(language);
          state.language = language;

          const defaultLocations = getBaseLocations();
          const customLocations = state.locations.filter((location) => location.id.length > 3);
          state.locations = [...defaultLocations, ...customLocations];
        });
      },
      editLocation: (location) => {
        set((state) => {
          const selectedIndex = state.locations.findIndex((l: Location) => l.id === location.id);
          state.locations[selectedIndex] = location;
        });
      },
      playSound: (file: SoundFile, volume = 1) => {
        const index = Object.values(SoundFile).indexOf(file);
        if (useAppStore.getState().isSoundEnabled) {
          const sound = useAppStore.getInitialState().sounds[index]?.setVolume(volume);

          if (sound.isPlaying()) {
            sound.stop();
            sound.play();
          } else {
            sound.play();
          }
        }
      },
      stopSound: (file: SoundFile) => {
        const index = Object.values(SoundFile).indexOf(file);
        if (useAppStore.getState().isSoundEnabled) {
          const sound = useAppStore.getInitialState().sounds[index];

          if (sound.isPlaying()) {
            sound.stop();
          }
        }
      },
      toggleSound: () => {
        set((state) => {
          state.isSoundEnabled = !state.isSoundEnabled;
        });
      },
    })),
    {
      name: 'app-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export const useAppStore = createSelectors(useAppStoreBase);
