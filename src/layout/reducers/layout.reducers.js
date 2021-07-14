import * as Actions from "../actions/layout.actions"

const initalState = {
    user:       [],
    userToBeLinked:     [],
    followers: null,
    followings: null,
    user_alert: null
};

const layoutReducer = (state = initalState, action) => {
    switch (action.type){
        case Actions.GET_USER:{
            return{
                ...state,
                user: action.user
            }
        }
        case Actions.FOLLOW_USER:{
            return{
                ...state,
                user_alert: action.user_alert
            }
        }
        case Actions.UNFOLLOW_USER:{
            return{
                ...state,
                user_alert: action.user_alert
            }
        }
        case Actions.DELETE_ALERT:{
            return{
                ...state,
                user_alert: action.user_alert
            }
        }

        case Actions.GET_USER_WITH_NAME:{
            return {
                ...state,
                userToBeLinked: action.userToBeLinked
            }
        }

        case Actions.ADD_RECIPE:{
            return{
                ...state,
                user_alert: action.recipe_alert
            }
        }

        case Actions.GET_FOLLOWERS:{
            return{
                ...state,
                followers: action.followers
            }
        }
        case Actions.GET_FOLLOWINGS:{
            return{
                ...state,
                followings: action.followings
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



export default layoutReducer;