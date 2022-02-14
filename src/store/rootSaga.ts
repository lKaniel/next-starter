import {all, call, spawn} from "redux-saga/effects";
import {counterSaga} from "../features/counter/counterSaga";

export default function* rootSaga() {
    const sagas = [
        counterSaga
    ];

    const retrySagas = yield sagas.map(saga => (
        spawn(function* () {

            while (true) {
                try {
                    yield call(saga);
                    break;
                } catch (e) {
                    console.log(e);
                }
            }

        })));

    yield all(retrySagas);
}
