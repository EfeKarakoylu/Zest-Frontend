import * as Actions from "../actions/recipe.actions"

const initalState = {
    recipes:       [],
    recipe:        null,
    userRecipes:    null,
    rate_of_recipe: null,
    recipe_alert: null,
    hashtags: null,
    tag_recipes: null,
    loading: false
};

const recipeReducer = (state = initalState, action) => {
    switch (action.type){
        case Actions.GET_RECIPES:{
            return{
                ...state,
                recipes: action.recipes,
                loading: false
            }
        }
        case Actions.GET_RECIPE:{
            return{
                ...state,
                recipe: action.recipe
            }
        }
        case Actions.GET_TAG_RECIPES:{
            return{
                ...state,
                tag_recipes: action.tag_recipes
            }
        }
        case Actions.GET_RECIPES_FOR_USER:{
            return{
                ...state,
                userRecipes: action.userRecipes
            }
        }
        case Actions.GET_USER_WITH_NAME:{
            return{
                ...state,
                userToBeLinked: action.userToBeLinked
            }
        }
        case Actions.GET_RATES_OF_THE_RECIPE:{
            return{
                ...state,
                rate_of_recipe: action.recipe_rates
            }
        }
        case Actions.GET_HASHTAGS:{
            return{
                ...state,
                hashtags: action.hashtags
            }
        }
        case Actions.RATE_RECIPE:{
            return{
                ...state,
                recipe_alert: action.recipe_alert
            }
        }
        case Actions.UPDATE_RECIPE:{
            return{
                ...state,
                recipe_alert: action.recipe_alert
            }
        }

        case Actions.DELETE_ALERT:{
            return{
                ...state,
                recipe_alert: action.recipe_alert
            }
        }
        case Actions.DELETE_RECIPE_FOR_USER:{
            return{
                ...state,
                recipe_alert: action.recipe_alert
            }
        }
        case Actions.DELETE_RECIPE_FOR_ALL:{
            return{
                ...state,
                recipe_alert: action.recipe_alert
            }
        }
        case Actions.ADD_TO_MY_RECIPES:{
            return{
                ...state,
                recipe_alert: action.recipe_alert
            }
        }
        case Actions.ADD_RECIPE:{
            return{
                ...state,
                recipe_alert: action.recipe_alert
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



export default recipeReducer;