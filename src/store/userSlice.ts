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

export const selectIsLogged = (state: RootState) => {
  return state.user.loginData.status === 'connected'
}

export const login = createAsyncThunk('user/login', () => {
  return api.login()
})

export const logout = createAsyncThunk<boolean>('user/logout', () => {
  return api.logout()
})

export const fetchLoginStatus = createAsyncThunk(
  'user/fetchLoginStatus',
  () => {
    return api.loginStatus()
  }
)

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.loginData = action.payload
      })
      .addCase(fetchLoginStatus.fulfilled, (state, action) => {
        state.loginData = action.payload
      })
      .addCase(logout.fulfilled, (state, _action) => {
        state.loginData = initialState.loginData
      })
  }
})

export const { reducer } = userSlice
