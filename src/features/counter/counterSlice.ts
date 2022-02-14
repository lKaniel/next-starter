import {createSlice, PayloadAction} from '@reduxjs/toolkit'

import type {AppState} from '../../app/store'

const name: string = 'counter'

type status = 'idle' | 'loading' | 'failed';

export interface CounterState {
    value: number
    status: status
}

const initialState: CounterState = {
    value: 0,
    status: 'idle',
}

export const counterSlice = createSlice({
    name,
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload
        },
        incrementAsync: (state, action: PayloadAction<number>)=>{},
        setStatus: (state, action: PayloadAction<status>)=>{
            state.status = action.payload
        },
    }
})

export const {
    increment,
    decrement,
    incrementByAmount,
    incrementAsync,
    setStatus
} = counterSlice.actions

export const selectCount = (state: AppState) => state.counter.value
export const selectStatus = (state: AppState) => state.counter.status

export default counterSlice.reducer
