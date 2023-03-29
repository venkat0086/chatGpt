import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
  compose,
} from "redux";
import { loginReducer } from "./Login/reducer";
//   import { eventReducer } from "./Events/reducer";
import thunk from "redux-thunk";
import { registerReducer } from "./Register/reducer";

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const middleware = [thunk];

const enhancer = composeEnhancers(
  applyMiddleware(...middleware)
  // other store enhancers if any
);

const rootReducer = combineReducers({
  register: registerReducer,
  login: loginReducer,
  // event: eventReducer,
});

export const store = createStore(rootReducer, enhancer);
