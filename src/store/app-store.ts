import { create, type State, type StoreApi, type UseBoundStore } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist } from 'zustand/middleware';
import sampleSize from 'lodash.samplesize';
import i18n from 'i18next';

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
  key: string;
  enabled: boolean;
  roles: string[];
}

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
}

interface AppActions {
  setCivilsAmount: (players: number) => void;
  setSpiesAmount: (spies: number) => void;
  setGameTimeInMinutes: (time: number) => void;
  setIsRoleGame: (isRoleGame: boolean) => void;
  setEnableHintsForSpies: (enableHintsForSpies: boolean) => void;
  toggleLocation: (localization: Location) => void;
  setLocations: (locations: Location[]) => void;
  deleteLocation: (key: string) => void;
  startGame: () => void;
  resetLocations: () => void;
}

const initialState: AppState = {
  civils: 4,
  spies: 1,
  gameTimeInMinutes: 5,
  isRoleGame: false,
  currentGame: { players: [], location: { key: '', enabled: false, roles: [] } },
  enableHintsForSpies: false,
  locations: i18n.t('locations', { returnObjects: true }) as unknown as Location[],
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
      setIsRoleGame: (isRoleGame: boolean) => {
        set((state) => ({ ...state, isRoleGame }));
      },
      setEnableHintsForSpies: (enableHintsForSpies) => {
        set((state) => ({ ...state, enableHintsForSpies }));
      },
      toggleLocation: (affectedLocation) => {
        set((state) => {
          const selectedIndex = state.locations.findIndex(
            (l: Location) => l.key === affectedLocation.key
          );
          state.locations[selectedIndex].enabled = affectedLocation.enabled;
        });
      },
      setLocations: (locations) => {
        set((state) => ({ ...state, locations }));
      },
      deleteLocation: (key: string) => {
        set((state) => {
          state.locations = state.locations.filter((l: Location) => l.key !== key);
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
          console.log(
            state.isRoleGame,
            state.currentGame,
            enabledLocations,
            shuffledRoles,
            playersIndexes,
            spiesIndexes
          );
        });
      },
      resetLocations: () => {
        set((state) => ({ ...state, locations: initialState.locations }));
      },
    })),
    {
      name: 'app-store',
    }
  )
);

export const useAppStore = createSelectors(useAppStoreBase);
