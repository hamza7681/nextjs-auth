"use client";

import React from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

let persistedStore = persistStore(store);

export const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store} children={undefined}>
      <PersistGate persistor={persistedStore}>{children}</PersistGate>
    </Provider>
  );
};
