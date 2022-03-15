import { configureStore } from '@reduxjs/toolkit';
import favsReducer from './reducers/favsReducer';
import characterListReducer from './reducers/characterListReducer';

export default configureStore({
  reducer: {
    favs: favsReducer,
    characterList: characterListReducer,
  },
});
