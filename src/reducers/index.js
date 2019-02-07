import { combineReducers } from 'redux';
import { weather} from './weather.reducer';
import { user } from './user.reducer';
import {loading} from "./loading.reducer";

export default combineReducers({
    weather,
    user,
    loading
});
