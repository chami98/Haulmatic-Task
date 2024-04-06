import { createStore, combineReducers } from 'redux';
import appReducer from './reducers/appReducer';


const rootReducer = combineReducers({
    app: appReducer
})

const store = createStore(rootReducer)

export default store