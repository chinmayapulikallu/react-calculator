import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* calculateSaga() {
    yield takeLatest("SET_OPERATION", calculation);
    yield takeLatest("GET_CALCULATED_DATA", getCalculatedData);
}

//saga will trigged when post calculation dispatches
function* calculation(action) {
    try {
        const response = yield axios.post("/calculate", action.payload);
        yield put({
            type: "GET_DATA",
            payload: response.data,
        });
    } catch (error) {
        console.log("Error with posting calculate data:", error);
    }
}

//saga will be trigged when get calculation dispatches
function* getCalculatedData() {
    try {
        const response = yield axios.get(`/calculate`);
        yield put({
            type: "GET_DATA",
            payload: response.data,
        });
    } catch (error) {
        console.log("Error with get client info:", error);
    }
}

export default calculateSaga;
