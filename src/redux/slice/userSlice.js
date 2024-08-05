import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    user: null,
    users: []
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
            if (action.payload.type === "a") {
                state.user = action.payload.data;
            }
            else if (action.payload.type === "b") {
                state.users = action.payload.data;
            }
        },
        userEnd: (state) => {
            state.isLoading = false;
        }
    },
});

export const {
    userStart,
    userSuccess,
    userEnd,
} = UserSlice.actions;
export default UserSlice.reducer;