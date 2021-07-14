import * as Actions from "../actions/category.actions"

const initalState = {
    categories: null,
    category: null
};

const categoryReducer = (state = initalState, action) => {
    switch (action.type){
        case Actions.GET_ALL_CATEGORIES:{
            return{
                ...state,
                categories: action.categories
            }
        }
        case Actions.GET_CATEGORY:{
            return{
                ...state,
                category: action.category
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



export default categoryReducer;