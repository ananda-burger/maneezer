import { createSlice } from '@reduxjs/toolkit'
import { RootState } from 'app/store'
import { ConfirmationModalState } from 'types'

const initialState: ConfirmationModalState = {
  isOpen: false,
  id: ''
}

export const selectModalIsOpen = (state: RootState) => {
  return state.confirmationModal.isOpen
}

export const selectId = (state: RootState) => {
  return state.confirmationModal.id
}

export const confirmationModalSlice = createSlice({
  name: 'confirmationModal',
  initialState,
  reducers: {
    open: (state) => {
      state.isOpen = true
    },
    close: (state) => {
      state.isOpen = false
    },
    updateId: (state, action) => {
      state.id = action.payload
    }
  }
})

export const { open, close, updateId } = confirmationModalSlice.actions

export const { reducer } = confirmationModalSlice
