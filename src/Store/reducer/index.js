import adultchangeNumber from "./setSeatsQuantity";
import { childChangeNumber,infantsChangeNumber } from "./setSeatsQuantity";
import searchDataReducer, {updateFilterReducer} from "./searchDataArrays";
import { combineReducers } from "redux";


const rootReducer = combineReducers({
    adultNumber: adultchangeNumber,
    childNumber: childChangeNumber,
    infantsNumber:infantsChangeNumber,
    searchDataReducer:searchDataReducer,
    updateFilterReducer:updateFilterReducer,
});

export default rootReducer;


