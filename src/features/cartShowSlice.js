import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isCartOpen: false
}

export const cartShowSlice = createSlice({
    name: "showCart",
    initialState,
    reducers: {
        handleShowCart: (state, action) => {
            state.isCartOpen = action.payload
        }
    }
})

export const { handleShowCart } = cartShowSlice.actions

export default cartShowSlice.reducer