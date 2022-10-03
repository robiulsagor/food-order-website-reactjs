import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    msg: null,
    type: null,
}

export const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        addNotification: (state, action) => {
            state.msg = action.payload.msg
            state.type = action.payload.type
        },
        removeNotification: state => {
            state.msg = null
            state.type = null
        }
    }
})

export const { addNotification, removeNotification } = notificationSlice.actions

export default notificationSlice.reducer