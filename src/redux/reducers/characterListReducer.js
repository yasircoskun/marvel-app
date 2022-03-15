import { createSlice } from '@reduxjs/toolkit'

const storageName = "characterList"

export const characterListSlice = createSlice({
  name: storageName,
  initialState: {
    value: getStateFromLocalStorage(storageName),
  },
  reducers: {
    concat: (state, action) => {
      state.value = [...state.value, ...action.payload]
      localStorage.setItem(storageName, JSON.stringify(state.value))
    },
  },
})

export const { concat } = characterListSlice.actions


/**
 * The selectFavs function is exported for use in components 
 * @param {any} state
 * @returns {any}
 */
export const selectCharacterList = () => getStateFromLocalStorage(storageName)

/**
 * Retrieves named state data from local storage.
 * @param {any} name
 * @returns {any}
 */
function getStateFromLocalStorage(name){
  let stateFromLocalStorage = localStorage.getItem(name);
  if(stateFromLocalStorage !== null){
    return JSON.parse(stateFromLocalStorage);
  }
  return []
}

export default characterListSlice.reducer
