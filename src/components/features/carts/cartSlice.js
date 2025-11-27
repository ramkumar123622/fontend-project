import { createSlice } from "@reduxjs/toolkit";
import { getCartsFromLocal, setCartsToLocal } from "../local/local";







export const cartSlice = createSlice({
    name: 'cartSlice',
    initialState: {
        carts: getCartsFromLocal()
    },
    reducers:{
        setCart: (state, action) =>{
            state.carts = [...state.carts, action.payload];
            setCartsToLocal(state.carts);
        }
    }
})

export const {setCart} = cartSlice.actions; 