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
interface Localization {
  key: string;
  enabled: boolean;
  roles: string[];
}

interface CurrentGame {
  players: Array<{ id: number; role: string }>;
  location: Localization;
}

interface AppState {
  civils: number;
  spies: number;
  gameTimeInMinutes: number;
  currentGame: CurrentGame;
  isRoleGame: boolean;
  enableHintsForSpies: boolean;
  localizations: Localization[];
  setCivilsAmount: (players: number) => void;
  setSpiesAmount: (spies: number) => void;
  setGameTimeInMinutes: (time: number) => void;
  toggleIsRoleGame: () => void;
  setEnableHintsForSpies: (enableHintsForSpies: boolean) => void;
  toggleLocalization: (localization: Localization) => void;
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
    localizations: [
      { key: 'Valozhyn', enabled: true, roles: ['Vania', 'Jahor', 'Maks'] },
      { key: 'Minsktrans', enabled: true, roles: ['Kirouca', 'Chotsci', 'Pasazyr'] },
      { key: 'Rhaczou', enabled: true, roles: [] },
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
    toggleIsRoleGame: () => {
      set((state) => ({ ...state, isRoleGame: !state.isRoleGame }));
    },
    setEnableHintsForSpies: (enableHintsForSpies) => {
      set((state) => ({ ...state, enableHintsForSpies }));
    },
    toggleLocalization: (affectedLocalization) => {
      set((state) => {
        const selectedIndex = state.localizations.findIndex(
          (l: Localization) => l.key === affectedLocalization.key
        );
        state.localizations[selectedIndex].enabled = affectedLocalization.enabled;
      });
    },
    startGame: () => {
      set((state) => {
        const enabledLocalizations = state.localizations.filter((l: Localization) => l.enabled);
        const selectedLocation =
          enabledLocalizations[Math.floor(Math.random() * enabledLocalizations.length)];
        const shuffledRoles = selectedLocation.roles.sort(() => Math.random() - 0.5);
        state.currentGame.location = selectedLocation;

        const playersIndexes = Array.from(Array(state.civils + state.spies).keys());
        const spiesIndexes = sampleSize(playersIndexes, state.spies);

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
          enabledLocalizations,
          shuffledRoles,
          playersIndexes,
          spiesIndexes
        );
      });
    },
  }))
);

export const useAppStore = createSelectors(useAppStoreBase);
