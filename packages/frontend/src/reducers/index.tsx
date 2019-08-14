import { combineReducers } from "redux";
import tutorReducer from "./tutorReducer";
import homeReducer from "./homeReducer";

const rootReducer = combineReducers({
  home: homeReducer,
  tutor: tutorReducer
});

export default rootReducer;
