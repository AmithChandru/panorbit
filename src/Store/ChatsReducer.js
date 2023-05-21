import { createSlice } from "@reduxjs/toolkit";

const chatsSlice = createSlice({
  name: 'chats',
  initialState: {
    chatsUser: null,
  },
  reducers: {
    loadChatUser(state, action) {
      state.chatsUser = action.payload
    }
  }
})

export const chatActions = chatsSlice.actions;

export default chatsSlice;