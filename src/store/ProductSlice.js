import { createSlice } from '@reduxjs/toolkit';
import { addProduct, deleteProduct } from './actions';
// export interface cart {
//         product_id : 0,
//         quantity: 10,
//         price : 0,
//         total_price: 0
// }

const initialState = {
    value: 1,
    todo: null,
    cart : []
}

export const productSlice = createSlice({
    name : 'productCart',
    initialState: initialState,
    extraReducers : (builder) => {
        builder.addCase(addProduct.fulfilled, (state, action) => {
            state.todo = action.payload.data
        })
        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            state.todo = action.payload
        })
    },
    reducers: {
        addToCart: (state, payload) => {
            // state.cart = {...cart , quantity: cart.quantity + 1 }
            state.cart.push(payload.payload);
        },
        removeFromCart : (state, action) => {},
        updateToCart: (state, action) => {},
        addProduct: (state, action) => { return {...state, todo : action.payload}}
    }
})

export const {addToCart, removeFromCart, updateToCart } = productSlice.actions;
export default productSlice.reducer;