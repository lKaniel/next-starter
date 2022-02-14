import {configureStore, ThunkAction, Action, getDefaultMiddleware} from '@reduxjs/toolkit'

import counterReducer from '../features/counter/counterSlice'
import createSagaMiddleware from "@redux-saga/core";
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();

export function makeStore() {
    const store = configureStore({
        reducer: {counter: counterReducer},
        middleware:
            (getDefaultMiddleware) =>
                [...getDefaultMiddleware({thunk: false}), sagaMiddleware]
    })
    sagaMiddleware.run(rootSaga)
    return store
}

const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    AppState,
    unknown,
    Action<string>>

export default store
