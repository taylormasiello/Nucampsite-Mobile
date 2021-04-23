import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { campsites } from "./campsites";
import { comments } from "./comments";
import { promotions } from "./promotions";
import { partners } from "./partners";
import { favorites } from "./favorites";
import { persistStore, persistCombineReducers } from "redux-persist";
import storage from "redux-persist/es/storage";

const config = {
  key: "root",
  storage,
  debug: true,
};

export const ConfigureStore = () => {
  const store = createStore(
    persistCombineReducers(config, {
      campsites,
      comments,
      partners,
      promotions,
      favorites,
    }),
    applyMiddleware(thunk, logger)
  );

  const persistor = persistStore(store);

  return { persistor, store };
};
