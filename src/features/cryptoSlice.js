import {createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
import {createAsyncThunk} from '@reduxjs/toolkit/src/createAsyncThunk'

// ========================================================
// Config API
// ========================================================
const api = axios.create({
    baseURL: 'https://api.coingecko.com/api/v3/coins/',
})

// ========================================================
// Action Creators
// ========================================================
const fetchCoins = createAsyncThunk('cryptoSlice/fetchCoins', async (_, thunkAPI) => {
    try {
        const {data} = await api.get('/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false')
        return data
    } catch (e) {
        const message = (e.response && e.response.data && e.response.data.message) || e.message || e.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

const fetchCoin = createAsyncThunk('cryptoSlice/fetchCoin', async (id, thunkAPI) => {
    try {
        const {data} = await api.get(`/${id}`)
        console.log(data)
        return data
    } catch (e) {
        const message = (e.response && e.response.data && e.response.data.message) || e.message || e.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// ========================================================
// Slice configuration
// ========================================================
const cryptoSlice = createSlice({
    name: 'crypto',
    initialState: {
        crypto: [],
        cryptoById: null,
        cryptoLoading: false,
        cryptoError: null,
    },
    reducers: {},
    extraReducers: {
        // fetchCoins:
        [fetchCoins.pending]: (state) => {
            state.cryptoLoading = true
        },
        [fetchCoins.fulfilled]: (state, {payload}) => {
            state.cryptoLoading = false
            state.crypto = payload
        },
        [fetchCoins.rejected]: (state, {payload}) => {
            state.cryptoLoading = false
            state.cryptoError = payload
        },
        // fetchCoin:
        [fetchCoin.pending]: (state) => {
            state.cryptoLoading = true
        },
        [fetchCoin.fulfilled]: (state, {payload}) => {
            state.cryptoLoading = false
            state.cryptoById = payload
        },
        [fetchCoin.rejected]: (state, {payload}) => {
            state.cryptoLoading = false
            state.cryptoError = payload
        },
    },
})

export default cryptoSlice.reducer
export const cryptoAsyncThunk = {
    fetchCoins,
    fetchCoin,
}