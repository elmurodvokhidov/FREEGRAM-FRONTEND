import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slice/authSlice";
import userSlice from "../slice/userSlice";
import messageSlice from "../slice/messageSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        user: userSlice,
        message: messageSlice,
    }
});