import { createSlice } from '@reduxjs/toolkit'
import { RootState } from 'app/store'
import { ModalState } from 'types'

const initialState: ModalState = {
  isOpen: false,
  title: ''
}

export const selectModalIsOpen = (state: RootState) => {
  return state.modal.isOpen
}

export const selectTitle = (state: RootState) => {
  return state.modal.title
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
    },
    update: (state, action) => {
      state.title = action.payload
    }
  }
})

export const { open, close, update } = modalSlice.actions

export const { reducer } = modalSlice
