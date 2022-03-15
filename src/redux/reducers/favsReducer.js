import { createSlice } from '@reduxjs/toolkit'

const storageName = "favs"

export const favsSlice = createSlice({
  name: storageName,
  initialState: {
    value: getStateFromLocalStorage(storageName),
  },
  reducers: {
    add: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      // state.value += 1
      state.value[action.payload.name] = action.payload
      localStorage.setItem(storageName, JSON.stringify(state.value))
    },
    del: (state, action) => {
      delete state.value[action.payload.name]
      localStorage.setItem(storageName, JSON.stringify(state.value))
    },
  },
})

export const { add, del } = favsSlice.actions


/**
 * The selectFavs function is exported for use in components 
 * @param {any} state
 * @returns {any}
 */
export const selectFavs = () => getStateFromLocalStorage(storageName)

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
  return {}
}

export default favsSlice.reducer
