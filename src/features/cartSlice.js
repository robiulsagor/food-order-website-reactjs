import { createSlice } from "@reduxjs/toolkit"
import { fetchCart } from "../utils/fetchLocalStorageData"

const cartVal = fetchCart()

const initialState = {
    cartItems: cartVal
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem: (state, action) => {
            console.log(action);
            const { item, type } = action.payload
            console.log(item);
            console.log(type);
            // state.cartItems = [...state.cartItems, item]
            // localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
            // state.cartItems = state.cartItems.map(item => item.id === item.id)
            const data = state.cartItems.filter(i => i.id === item.id)

            if (data.length > 0) {
                const itemIndex = state.cartItems.map(i => i.title).indexOf(data[0].title)

                const rmvItem = state.cartItems.filter(item2 => item2.id !== item.id)
                var qty, newArr;

                if (type === "increase") {
                    qty = data[0].qty += 1
                } else {
                    if (data[0].qty > 1) {
                        qty = data[0].qty -= 1
                    } else {
                        console.log("should remove the item from the cart");
                        newArr = rmvItem
                        console.log(rmvItem[0].title);
                        state.cartItems = rmvItem
                    }

                }
                const newitem = { ...data[0], qty }
                // const newArr = rmvItem[itemIndex] = newitem
                // state.cartItems = newArr
                // console.log(newArr);
                // state.cartItems = [...rmvItem, newitem]
                localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
            } else {
                state.cartItems = [...state.cartItems, item]
                localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
            }
        },
        increaseItem: (state, action) => {
            const { item, type } = action.payload
            state.cartItems = item
        },
        removeItem: (state, action) => {
            const { item, type } = action.payload
            state.cartItems = item
        },
        removeAllItems: (state) => {
            state.cartItems = []
            localStorage.removeItem("cartItems")
        }
    }
})

export const { addItem, increaseItem, removeItem, removeAllItems } = cartSlice.actions

export default cartSlice.reducer