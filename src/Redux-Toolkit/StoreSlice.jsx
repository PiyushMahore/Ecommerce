import { createSlice } from "@reduxjs/toolkit";

const ESlice = createSlice({
    name: "Ecommerce",
    initialState: {
        Products: null,
        Card: [],
    },
    reducers: {
        addProduct: (state, action) => {
            state.Products = action.payload.Products
        },
        addCard: (state, action) => {
            state.Card.push(action.payload)
        },
        removeCard: (state, action) => {
            state.Card = state.Card.filter((cart) => cart.id !== action.payload)
        }
    }
})

export const {addProduct, addCard, removeCard} = ESlice.actions
export default ESlice.reducer
