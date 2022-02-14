import {fetchCount} from "./counterAPI";
import {call, put, takeEvery, select} from "redux-saga/effects";
import {incrementAsync, incrementByAmount, selectStatus, setStatus} from "./counterSlice";
import {PayloadAction} from "@reduxjs/toolkit";

function* incrementAsyncSaga(action: PayloadAction<number>) {
    const status = yield select(selectStatus)
    if (status !== "idle") return
    yield put(setStatus("loading"))
    try {
        const response = yield call(fetchCount, action.payload)
        yield put(incrementByAmount(response.data))
        yield put(setStatus("idle"))
    } catch (e) {
        yield put(setStatus("failed"))
    }
}

export function* counterSaga() {
    yield takeEvery(incrementAsync.type, incrementAsyncSaga)
}
