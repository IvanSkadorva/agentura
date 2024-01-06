import { create, type StoreApi, type UseBoundStore } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import sampleSize from 'lodash.samplesize';

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
interface Location {
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
  setCivilsAmount: (players: number) => void;
  setSpiesAmount: (spies: number) => void;
  setGameTimeInMinutes: (time: number) => void;
  setIsRoleGame: (isRoleGame: boolean) => void;
  setEnableHintsForSpies: (enableHintsForSpies: boolean) => void;
  toggleLocalization: (localization: Location) => void;
  startGame: () => void;
}

const useAppStoreBase = create<AppState>()(
  immer((set) => ({
    civils: 4,
    spies: 1,
    gameTimeInMinutes: 5,
    isRoleGame: false,
    currentGame: { players: [], location: { key: '', enabled: false, roles: [] } },
    enableHintsForSpies: false,
    locations: [
      {
        key: 'Valozhyn',
        enabled: true,
        roles: ['Vania', 'Jahor', 'Maks', 'Koscik', 'Maks Minski'],
      },
      {
        key: 'Minsktrans',
        enabled: true,
        roles: ['Kirouca', 'Chotsci', 'Pasazyr', 'Kantralior', 'Vania'],
      },
      {
        key: 'Rahaczou',
        enabled: true,
        roles: ['Degustatar', 'Pracounik', 'Naczalnik', 'Razumnik', 'Praunik'],
      },
    ],
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
    toggleLocalization: (affectedLocalization) => {
      set((state) => {
        const selectedIndex = state.locations.findIndex(
          (l: Location) => l.key === affectedLocalization.key
        );
        state.locations[selectedIndex].enabled = affectedLocalization.enabled;
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
  }))
);

export const useAppStore = createSelectors(useAppStoreBase);
