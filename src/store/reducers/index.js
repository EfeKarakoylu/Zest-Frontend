import {combineReducers} from 'redux';
import settings from "./settings.reducer";
import categoryReducer from "./category.reducer";
import language from "./language.reducer";
import imageReducer from "./image.reducer";




const createReducer = (asyncReducers) =>
    combineReducers({
        settings,
        categoryReducer,
        language,
        imageReducer,
        ...asyncReducers,
    });

export default createReducer;
