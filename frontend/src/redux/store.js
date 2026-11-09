import { configureStore } from '@reduxjs/toolkit'
import songReducer from './feature.js'

const store = configureStore({
  reducer: {
    songs: songReducer,
  },
})

export default store