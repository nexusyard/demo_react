import { createAsyncThunk } from "@reduxjs/toolkit";

// This is a synchronous function uses redux thunk.
export const addProduct = createAsyncThunk('todo/product', ()=>{
    // some async task here. eg. fetch query.

    return {
        data: 'test thunks'
    }
})

export const deleteProduct = createAsyncThunk('todo' ,() => {
    // some async task here.
    console.log('delete');
    return {
        type: 'DELETE_PRODUCT',
        data: 'TEST DELETE'
    }
})
