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
            if (action.payload.type === "set") {
                state.messages = action.payload.data;
            }
            else if (action.payload.type === "push") {
                state.messages.push(action.payload.data);
            }
            else if (action.payload.type === "pull") {
                state.messages = state.messages.filter(
                    (message) => message._id !== action.payload.data
                );
            }
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