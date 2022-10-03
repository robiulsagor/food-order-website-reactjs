import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    foodItems: null
}

export const foodSlice = createSlice({
    name: "food",
    initialState,
    reducers: {
        set_food: (state, action) => {
            state.foodItems = action.payload
        }
    }
})
export const { set_food } = foodSlice.actions

export default foodSlice.reducer