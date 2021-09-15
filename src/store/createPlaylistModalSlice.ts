import { createSlice } from '@reduxjs/toolkit'
import { RootState } from 'app/store'
import { CreatePlaylistModalState } from 'types'

const initialState: CreatePlaylistModalState = {
  isOpen: false,
  title: ''
}

export const selectModalIsOpen = (state: RootState) => {
  return state.createPlaylistModal.isOpen
}

export const selectTitle = (state: RootState) => {
  return state.createPlaylistModal.title
}

export const createPlaylistModalSlice = createSlice({
  name: 'createPlaylistModal',
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

export const { open, close, update } = createPlaylistModalSlice.actions

export const { reducer } = createPlaylistModalSlice
