import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import reducer from './index';

export function configureStore() {
    return createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))
}