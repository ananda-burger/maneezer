import { createSlice } from '@reduxjs/toolkit'
import { RootState } from 'app/store'
import { DeletePlaylistModalState } from 'types'

const initialState: DeletePlaylistModalState = {
  isOpen: false,
  id: ''
}

export const selectModalIsOpen = (state: RootState) => {
  return state.deletePlaylistModal.isOpen
}

export const selectId = (state: RootState) => {
  return state.deletePlaylistModal.id
}

export const deletePlaylistModalSlice = createSlice({
  name: 'deletePlaylistModal',
  initialState,
  reducers: {
    open: (state, action) => {
      state.id = action.payload
      state.isOpen = true
    },
    close: (state) => {
      state.isOpen = false
    }
  }
})

export const { open, close } = deletePlaylistModalSlice.actions

export const { reducer } = deletePlaylistModalSlice
