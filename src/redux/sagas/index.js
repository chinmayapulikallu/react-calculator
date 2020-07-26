import { all } from "redux-saga/effects";
import calculateSagas from './calculateSagas';

//root saga is the primary saga
//It bundles up all of the other sagas on the project so we can use them
//This is imported in index.js as root saga
export default function* rootSaga() {
    yield all([
        calculateSagas() 
    ]);
}