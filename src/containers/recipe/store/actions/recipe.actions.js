import axios from "axios";
import {toast} from "react-toastify"

export const ADD_RECIPE = 'GET USER'
export const GET_RECIPES = 'GET RECIPES'
export const GET_RECIPE = 'GET RECIPE'
export const ADD_TO_MY_RECIPES = 'ADD TO MY RECIPES'
export const GET_RECIPES_FOR_USER = 'GET RECIPES FOR USER'
export const DELETE_RECIPE_FOR_USER = 'DELETE RECIPE FOR USER'
export const DELETE_RECIPE_FOR_ALL = 'DELETE RECIPE FOR ALL'
export const GET_USER_WITH_NAME = 'GET USER WITH NAME'
export const UPDATE_RECIPE = 'UPDATE RECIPE'
export const RATE_RECIPE = 'RATE RECIPE'
export const GET_RATES_OF_THE_RECIPE = 'GET RATES OF THE RECIPE'
export const GET_HASHTAGS = 'GET HASHTAGS'
export const GET_TAG_RECIPES = 'GET TAG RECIPES'
export const DELETE_ALERT = "DELETE ALERT"
export const ADD_RECIPE_ALERT = 'ADD RECIPE ALERT'
export const SET_FIELD = 'SET_FIELD';

// export function addRecipe(data, history){
//     const token = localStorage.getItem('token')
//     let config = {
//         headers: { Authorization: `Bearer ${token}` }
//     }
//     return (dispatch) => {
//
//         dispatch(setField("add_recipe", true));
//         axios.post('http://localhost:5000/addRecipe', data, config)
//             .then((res) => {
//                 console.log("add recipe",res.data.msg)
//                 dispatch({
//                     type: ADD_RECIPE,
//                     recipe_alert: res.data.msg
//                 })
//
//                 // history.push('/home')
//             })
//     }
// }

export function getRecipesOfTheHashtag(data){
    const token = localStorage.getItem('token')
    let config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    return (dispatch) => {
        dispatch(setField("get_tag_recipes", true));
        axios.post('http://localhost:5000/getTagRecipes', data, config)
            .then((res) => {
                console.log("get tag recipes",res.data)
                dispatch({
                    type: GET_TAG_RECIPES,
                    tag_recipes: res.data.tagRecipes
                })
            })
    }
}

export function updateRecipe(data, id, history){
    const token = localStorage.getItem('token')
    let config = {
        params: {id: id},
        headers: { Authorization: `Bearer ${token}` }
    }

    return (dispatch) => {
        dispatch(setField("update_recipe", true));
        axios.post('http://localhost:5000/updateRecipe', data, config)
            .then((res) => {

                console.log("update recipe",res.data)
                dispatch({
                    type: UPDATE_RECIPE,
                    recipe_alert: res.data.msg
                })
                // history.push('/userRecipes')
            })
    }
}

export function getRecipes(page){
    const token = localStorage.getItem('token')
    let config = {
        headers: { Authorization: `Bearer ${token}` },
        params : {page: page}
    }
    return (dispatch) => {
        dispatch(setField("loadings", true));
        axios.get('http://localhost:5000/getRecipes', config)
            .then((res) => {
                console.log("get recipes",res.data)
                dispatch({
                    type: GET_RECIPES,
                    recipes: res.data.recipes
                })
            })
    }
}



export function getRecipesForUser(id){
    const token = localStorage.getItem('token')
    let config = {
        params: {id : id},
        headers: { Authorization: `Bearer ${token}` }
    }
    return (dispatch) => {
        dispatch(setField("get_recipes_for_user", true));
        axios.get('http://localhost:5000/getUserRecipes', config)
            .then((res) => {
                console.log("get recipes for user",res.data)
                dispatch({
                    type: GET_RECIPES_FOR_USER,
                    userRecipes: res.data.recipes
                })
            })
    }

}

export function addRecipeToUser(id){
    const token = localStorage.getItem('token')

    let config = {
        params: {
            id: id
        },
        headers: { Authorization: `Bearer ${token}` }
    }

    return (dispatch) => {

        dispatch(setField("add_to_myRecipes", true));
        axios.get('http://localhost:5000/addToMyRecipes', config)
            .then((res) => {
                // toast.success("babaggg")
                console.log(res.data.msg)
                console.log("UWUWUWUWUUWUWUWUW")
                dispatch({
                    type: ADD_TO_MY_RECIPES,
                    recipe_alert: res.data.msg
                })
            })
        dispatch(delete_alert())
    }
}

export function delete_alert(){
    return (dispatch) => {
        dispatch({
            type: DELETE_ALERT,
            recipe_alert: null
        })
    }
}

export function deleteRecipeForUser(id){
    const token = localStorage.getItem('token')
    let config = {
        params: {
            id: id
        },
        headers: { Authorization: `Bearer ${token}` }
    }

    return (dispatch) => {
        dispatch(setField("delete_recipe_for_user", true));
        axios.get('http://localhost:5000/deleteRecipeForUser', config)
            .then((res) => {
                dispatch({
                    type: DELETE_RECIPE_FOR_USER,
                    recipe_alert: res.data.msg
                })
            })
    }
}

export function deleteRecipeForAll(id){
    const token = localStorage.getItem('token')
    let config = {
        params: {
            id: id
        },
        headers: { Authorization: `Bearer ${token}` }
    }

    return (dispatch) => {
        dispatch(setField("delete_recipe_for_all", true));
        axios.get('http://localhost:5000/deleteRecipeForAll', config)
            .then((res) => {
                dispatch({
                    type: DELETE_RECIPE_FOR_ALL,
                    recipe_alert: res.data.msg
                })
            })
    }
}

export function getRecipe(id){
    const token = localStorage.getItem('token')
    let config = {
        params: {
            id: id
        },
        headers: { Authorization: `Bearer ${token}` }
    }

    return (dispatch) => {
        dispatch(setField("get_recipe", true));
        axios.get('http://localhost:5000/getRecipe', config)
            .then((res) => {
                console.log("get recipe",res.data)
                dispatch({
                    type: GET_RECIPE,
                    recipe: res.data.recipe
                })
            })
    }
}

export function getHashtags(id){
    const token = localStorage.getItem('token')
    let config = {
        params: {
            id: id
        },
        headers: { Authorization: `Bearer ${token}` }
    }

    return (dispatch) => {
        dispatch(setField("get_recipe", true));
        axios.get('http://localhost:5000/getHashtags', config)
            .then((res) => {
                console.log("get hashtags",res.data)
                dispatch({
                    type: GET_HASHTAGS,
                    hashtags: res.data.hashtags
                })
            })
    }
}

export function rateRecipe(userId, recipeId, point){
    const token = localStorage.getItem('token')
    let config = {
        params: {
            recipeId: recipeId,
            userId: userId
        },
        headers: { Authorization: `Bearer ${token}` }
    }
    return (dispatch) => {
        dispatch(setField("rate_recipe", true));
        axios.post('http://localhost:5000/rateRecipe', {point: point}, config)
            .then((res) => {
                alert(res.data.msg)
                console.log("rate recipe",res.data)
                dispatch({
                    type: RATE_RECIPE,
                    recipe_alert: res.data.msg
                })
            })
    }
}



export function setField(field_name, value) {
    return dispatch => {
        dispatch(
            {
                type: SET_FIELD,
                payload: {
                    field_name,
                    value
                }
            }
        );
    }
}