import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    auth: null,
    isLoggedIn: false,
    isError: null,
};

const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        authStart: (state) => {
            state.isLoading = true;
        },
        authSuccess: (state, action) => {
            state.isLoading = false;
            state.auth = action.payload.data;
            state.isLoggedIn = true;
        },
        authFailure: (state, action) => {
            state.isLoading = false;
            state.isError = action.payload;
        },
        authLogout: (state, action) => {
            state.isLoading = false;
            state.isLoggedIn = false;
            state.auth = null;
        },
    },
});

export const {
    authStart,
    authSuccess,
    authFailure,
    authLogout,
} = AuthSlice.actions;
export default AuthSlice.reducer;