import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    user: null,
    users: [],
    active: [],
};

const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        userStart: (state) => {
            state.isLoading = true;
        },
        userSuccess: (state, action) => {
            state.isLoading = false;
            if (action.payload.type === "all") {
                state.users = action.payload.data;
            }
            else if (action.payload.type === "one") {
                state.user = action.payload.data;
            }
            else if (action.payload.type === "pull") {
                if (state.user && state.user._id === action.payload.data) {
                    state.user = null;
                }
                state.users = state.users.filter(
                    (user) => user._id !== action.payload.data
                );
            }
        },
        activeSuccess: (state, action) => {
            state.isLoading = false;
            state.active = action.payload;
        },
        userEnd: (state) => {
            state.isLoading = false;
        }
    },
});

export const {
    userStart,
    userSuccess,
    activeSuccess,
    userEnd,
} = UserSlice.actions;
export default UserSlice.reducer;