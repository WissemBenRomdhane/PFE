import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
export default combineReducers({
  auth,
  message,
});
// import { combineReducers } from "redux";
// import users from "./users";
// export default combineReducers({
//   users,
// });