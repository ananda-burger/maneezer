import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { reducer as trackReducer } from 'store/topTracksSlice'
import { reducer as audioReducer } from 'store/audioSlice'
import { reducer as searchReducer } from 'store/searchSlice'
import { reducer as favoritesReducer } from 'store/favoriteTracksSlice'
import { reducer as userReducer } from 'store/userSlice'
import { reducer as popUpReducer } from 'store/popUpSlice'
import { reducer as playlistsReducer } from 'store/playlistsSlice'
import { reducer as playlistTracksReducer } from 'store/playlistTracksSlice'
import { reducer as modalReducer } from 'store/modalSlice'
import { reducer as confirmationModalReducer } from 'store/confirmationModalSlice'
import { reducer as dropdownReducer } from 'store/dropdownSlice'
import { reducer as artistTracksReducer } from 'store/artistTracksSlice'

export const store = configureStore({
  reducer: {
    topTracks: trackReducer,
    audio: audioReducer,
    search: searchReducer,
    favoriteTracks: favoritesReducer,
    artistTracks: artistTracksReducer,
    user: userReducer,
    popUp: popUpReducer,
    playlists: playlistsReducer,
    playlistTracks: playlistTracksReducer,
    modal: modalReducer,
    confirmationModal: confirmationModalReducer,
    dropdown: dropdownReducer
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
