// store.js
import { configureStore } from '@reduxjs/toolkit'
import dataReducer from '../features/dataSlice'

// 1) load from localStorage (or return undefined to use slice defaults)
const loadState = () => {
  try {
    const serialized = localStorage.getItem('data')
    return serialized ? JSON.parse(serialized) : undefined
  } catch {
    return undefined
   }
}

// 2) save to localStorage
const saveState = (state) => {
  try {
    const toPersist = JSON.stringify(state.data)
    localStorage.setItem('data', toPersist)
  } catch {
    return undefined;
  }
}

const preloaded = { data: loadState() }

export const store = configureStore({
  reducer: {
    data: dataReducer,
  },
  preloadedState: preloaded,
})

// 3) subscribe to persist on every change
store.subscribe(() => {
  saveState(store.getState())
})
