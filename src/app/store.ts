import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { reducer as trackReducer } from 'store/topTracksSlice'
import { reducer as audioReducer } from 'store/audioSlice'
import { reducer as searchReducer } from 'store/searchSlice'
import { reducer as favoritesReducer } from 'store/favoriteTracksSlice'
import { reducer as userReducer } from 'store/userSlice'

export const store = configureStore({
  reducer: {
    topTracks: trackReducer,
    audio: audioReducer,
    search: searchReducer,
    favoriteTracks: favoritesReducer,
    user: userReducer
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
