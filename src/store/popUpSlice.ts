import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/store'
import { PopUpState } from 'types'

const initialState: PopUpState = {
  isOpen: false,
  message: ''
}

export const selectIsOpen = (state: RootState) => {
  return state.popUp.isOpen
}

export const selectMessage = (state: RootState) => {
  return state.popUp.message
}

export const popUpSlice = createSlice({
  name: 'popUp',
  initialState,
  reducers: {
    appear: (state, action: PayloadAction<string>) => {
      state.isOpen = true
      state.message = action.payload
    },
    disappear: (state) => {
      state.isOpen = false
    }
  }
})

export const { appear, disappear } = popUpSlice.actions

export const { reducer } = popUpSlice
