import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isMessageLoading: false,
    messages: []
};

const MessageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        messageStart: (state) => {
            state.isMessageLoading = true;
        },
        messageSuccess: (state, action) => {
            state.isMessageLoading = false;
            state.messages = action.payload;
        },
        messageEnd: (state) => {
            state.isMessageLoading = false;
        }
    },
});

export const {
    messageStart,
    messageSuccess,
    messageEnd,
} = MessageSlice.actions;
export default MessageSlice.reducer;