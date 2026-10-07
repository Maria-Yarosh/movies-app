import type { ThemeMode } from '@/common/types'
import { themeStorage } from '@/common/utils'
import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    themeMode: themeStorage.get(),
  },
  selectors: {
    selectThemeMode: (state) => state.themeMode,
  },
  reducers: (create) => ({
    changeThemeMode: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
      state.themeMode = action.payload.themeMode
    }),
  }),
})

export const { selectThemeMode } = appSlice.selectors
export const { changeThemeMode } = appSlice.actions
export const appReducer = appSlice.reducer
