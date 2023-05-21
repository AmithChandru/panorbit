import { configureStore, createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: null,
    activeUser: null
  },
  reducers: {
    loadUsers(state, action) {
      state.users = action.payload;
    },
    activeUser(state, action) {
      state.activeUser = action.payload;
    }
  }
})

const store = configureStore({
  reducer: { users: userSlice.reducer }
})

export const userActions = userSlice.actions;

export default store;