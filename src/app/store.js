import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice"
import notificationReducer from "../features/notificationSlice"
import foodReducer from "../features/foodSlice";
import cartShowReducer from "../features/cartShowSlice";
import cartReducer from "../features/cartSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        notification: notificationReducer,
        food: foodReducer,
        showCart: cartShowReducer,
        cart: cartReducer
    }
})