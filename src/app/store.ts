import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { reducer as trackReducer } from 'store/trackSlice'
import { reducer as audioReducer } from 'store/audioSlice'

export const store = configureStore({
  reducer: {
    track: trackReducer,
    audio: audioReducer
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
