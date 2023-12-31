"use client";

import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import store, { persistor } from "../store";
import { PersistGate } from "redux-persist/lib/integration/react";
import Loader from "@/components/Loader";

type ReduxProviderProps = {
  children: ReactNode;
};

const ReduxProvider: React.FC<ReduxProviderProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default ReduxProvider;
