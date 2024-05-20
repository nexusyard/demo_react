import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './ProductSlice';

const serviceApi = 'Test'
export const store = configureStore({
    reducer: {
        cartReducer: cartReducer
    },
    // middleware: getDefaultMiddleware => 
    //     getDefaultMiddleware ({
    //     thunk : {
    //         extraArgument: {serviceApi}
    //     }
    //     // console.log('default middleware')
    // })
})

export default store;
