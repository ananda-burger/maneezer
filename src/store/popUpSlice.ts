import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from 'app/store'
import { PopUpState } from 'types'

const initialState: PopUpState = {
  isOpen: false,
  message: '',
  timer: undefined
}

const DEFAULT_POPUP_TIMEOUT = 4000

export const selectIsOpen = (state: RootState) => {
  return state.popUp.isOpen
}

export const selectMessage = (state: RootState) => {
  return state.popUp.message
}

export const appear = createAsyncThunk(
  'popUp/appear',
  (message: string, { dispatch }: any) => {
    return new Promise<{
      message: string
      timer: ReturnType<typeof setTimeout>
    }>((resolve, _reject) => {
      const timer = setTimeout(() => {
        dispatch(disappear())
      }, DEFAULT_POPUP_TIMEOUT)
      resolve({ message, timer })
    })
  }
)

export const popUpSlice = createSlice({
  name: 'popUp',
  initialState,
  reducers: {
    disappear: (state) => {
      state.isOpen = false
      clearTimeout(state.timer as NodeJS.Timeout)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(appear.fulfilled, (state, action) => {
      state.isOpen = true
      state.message = action.payload.message

      if (state.timer) {
        clearTimeout(state.timer)
      }

      state.timer = action.payload.timer
    })
  }
})

export const { disappear } = popUpSlice.actions

export const { reducer } = popUpSlice
