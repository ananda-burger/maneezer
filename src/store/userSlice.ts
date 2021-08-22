import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from 'app/store'
import { UserState } from 'types'
import * as api from 'tracksAPI'

const initialState: UserState = {
  loginData: {
    authInitDate: 0,
    authResponse: { accessToken: '', expire: 0 },
    status: 'not_authorized',
    userID: ''
  }
}

export const selectLoginData = (state: RootState) => {
  return state.user
}

export const login = createAsyncThunk('user/login', () => {
  return api.login()
})

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.loginData = action.payload
    })
  }
})

export const { reducer } = userSlice
