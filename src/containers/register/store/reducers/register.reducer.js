import * as Actions from "../actions/register.actions"

const initalState = {
    user:       []
};

const registerReducer = (state = initalState, action) => {
    switch (action.type){
        case Actions.REGISTER_USER:{
            return{
                ...state
            }
        }
    }
}

export default registerReducer