import { createSlice } from '@reduxjs/toolkit'
import { RootState } from 'app/store'
import { DropdownState } from 'types'

const initialState: DropdownState = {
  isOpen: false,
  id: ''
}

export const selectIsOpen = (state: RootState) => {
  return state.dropdown.isOpen
}

export const selectId = (state: RootState) => {
  return state.dropdown.id
}

export const dropdownSlice = createSlice({
  name: 'dropdown',
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

export const { open, close } = dropdownSlice.actions

export const { reducer } = dropdownSlice
