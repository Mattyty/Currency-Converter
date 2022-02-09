import {combineReducers} from "redux";
import GetCountryReducer from "./GetCountryReducer";
import TimeOutReducer from "./TimeOutReducer";
import TotalReducer from "./TotalReducer";

/*combineReducers({});*/
const reducer = combineReducers({
GetCountryReducer, TimeOutReducer, TotalReducer
});

export default reducer;