import * as Actions from "../actions/language.actions"

const initalState = {
    language: null
};

const language = (state = initalState, action) => {
    switch (action.type){

        case Actions.CHANGE_LANGUAGE:{
            return{
                ...state,
                language: action.language
            }
        }

        case Actions.SET_FIELD:{
            return{
                ...state,
                [action.payload.field_name]: action.payload.value
            }
        }
        default:{
            return {
                ...state
            }
        }
    }

}



export default language;