import { configureStore, createSlice } from "@reduxjs/toolkit";
import chatsSlice from "./ChatsReducer";

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
  reducer: { users: userSlice.reducer, chats: chatsSlice.reducer }
})

export const userActions = userSlice.actions;

export default store;