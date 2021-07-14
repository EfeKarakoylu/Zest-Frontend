import * as Actions from "../actions/image.actions"

const initalState = {
    imageKey: null
};

const imageReducer = (state = initalState, action) => {
    switch (action.type){
        case Actions.POST_IMAGE:{
            return{
                ...state,
                imageKey: action.imageKey
            }
        }
        case Actions.DELETE_KEY:{
            return{
                ...state,
                imageKey: action.imageKey
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



export default imageReducer;