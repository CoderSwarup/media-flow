import { createStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useStore } from "zustand";
import React from "react";
import { createZustandContext } from "./createZustandContext";

type State = {
  generating: boolean;
  setGenerating: (generating: boolean) => void;
};

const getStore = (initialState: { generating: boolean }) => {
  return createStore<State>()(
    persist<State>(
      (set) => ({
        generating: initialState.generating,
        setGenerating: (generating: boolean) => set(() => ({ generating })),
      }),
      {
        name: "editor-storage",
        storage: createJSONStorage(() => localStorage),
      }
    )
  );
};

export const EditorStore = createZustandContext(getStore);

export function useEditorStore<T>(selector: (state: State) => T) {
  const store = React.useContext(EditorStore.Context);
  if (!store) {
    throw new Error("Missing EditorStore provider");
  }
  return useStore(store, selector);
}
