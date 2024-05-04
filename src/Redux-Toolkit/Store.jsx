import {configureStore} from '@reduxjs/toolkit'
import ESlice from './StoreSlice'

export const Estore = configureStore({
    reducer: {
        Estore: ESlice
    }
})
