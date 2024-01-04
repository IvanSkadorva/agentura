import { create, type StoreApi, type UseBoundStore } from 'zustand';

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

interface AppState {
  civils: number;
  spies: number;
  gameTimeInMinutes: number;
  isRoleGame: boolean;
  enableHintsForSpies: boolean;
  localizations: Array<{ key: string; enabled: boolean }>;
  setCivilsAmount: (players: number) => void;
  setSpiesAmount: (spies: number) => void;
  setGameTimeInMinutes: (time: number) => void;
  setIsRoleGame: (isRoleGame: boolean) => void;
  setEnableHintsForSpies: (enableHintsForSpies: boolean) => void;
  toggleLocalization: (localization: { key: string; enabled: boolean }) => void;
}

const useAppStoreBase = create<AppState>()((set) => ({
  civils: 4,
  spies: 1,
  gameTimeInMinutes: 5,
  isRoleGame: false,
  enableHintsForSpies: false,
  localizations: [{ key: 'Valozhyn', enabled: true }],
  setCivilsAmount: (civils) => {
    set((state) => ({ ...state, civils }));
  },
  setSpiesAmount: (spies) => {
    set((state) => ({ ...state, spies }));
  },
  setGameTimeInMinutes: (gameTimeInMinutes) => {
    set((state) => ({ ...state, gameTimeInMinutes }));
  },
  setIsRoleGame: (isRoleGame) => {
    set((state) => ({ ...state, isRoleGame }));
  },
  setEnableHintsForSpies: (enableHintsForSpies) => {
    set((state) => ({ ...state, enableHintsForSpies }));
  },
  toggleLocalization: (localization) => {
    set((state) => ({ ...state, localizations: [...state.localizations, localization] }));
  },
}));

export const useAppStore = createSelectors(useAppStoreBase);
