import { combineReducers } from "redux";

import warehouseReducer from "./reducer";

const rootReducer = combineReducers({
	data: warehouseReducer,
});

export default rootReducer;
