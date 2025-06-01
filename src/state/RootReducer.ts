import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import hardSet from "redux-persist/lib/stateReconciler/hardSet";

import AuthStateReducer from "./Authentication/Reducer";

const appReducer = combineReducers({
  authState: AuthStateReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === "RESET_STORE" || action.type === "AUTH_LOGOUT_USER") {
    return appReducer(undefined, { type: undefined });
  }
  return appReducer(state, action);
};

const persistConfig = {
  key: "L1Mechnie",
  storage,
  stateReconciler: hardSet,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
      thunk: true,
    }),
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
