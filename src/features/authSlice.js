import { createSlice } from "@reduxjs/toolkit"
import { fetchUser } from "../utils/fetchLocalStorageData"

const initialState = {
    user: fetchUser()

}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        set_user: (state, action) => {
            state.user = action.payload
        },
        logout_user: state => {
            state.user = null
        }
    }
})

export const { set_user, logout_user } = authSlice.actions

export default authSlice.reducer