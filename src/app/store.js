import {configureStore} from '@reduxjs/toolkit'
import crypto from '../features/cryptoSlice'

// ========================================================
// Store Instantiation
// ========================================================
export const store = configureStore({
    reducer: {
        crypto,
    }
})