import { createSlice } from '@reduxjs/toolkit'
import { RootState } from 'app/store'
import { ModalState } from 'types'

const initialState: ModalState = {
  isOpen: false
}

export const selectModalIsOpen = (state: RootState) => {
  return state.modal.isOpen
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    open: (state) => {
      state.isOpen = true
    },
    close: (state) => {
      state.isOpen = false
    }
  }
})

export const { open, close } = modalSlice.actions

export const { reducer } = modalSlice
