import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { reducer as trackReducer } from 'store/trackSlice'

export const store = configureStore({
  reducer: {
    track: trackReducer
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
