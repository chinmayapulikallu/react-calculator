import { combineReducers } from "redux";
import calculate from './calculateReducer';

//rootReducer is the primary reducer for the entire project
//It bundles up all of the other reducers so our project can use them.
const rootReducer = combineReducers({
    calculate
});

export default rootReducer;