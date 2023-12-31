import { configureStore } from '@reduxjs/toolkit';

import playerReducer from './features/playerSlice';
import loadingBarReducer from './features/loadingBarSlice';
import languagesReducer from './features/languagesSlice';
import settingsReducer from './features/settingsSlice';
import homeCategoriesReducer from './features/homeCategoriesSlice';
import qualitiesReducer from './features/qualitiesSlice';
import downloadsReducer from './features/downloadsSlice';

export const store = configureStore({
  reducer: {
    player: playerReducer,
    loadingBar: loadingBarReducer,
    languages: languagesReducer,
    settings: settingsReducer,
    homeCategories: homeCategoriesReducer,
    qualities: qualitiesReducer,
    downloads: downloadsReducer,
  },
});
