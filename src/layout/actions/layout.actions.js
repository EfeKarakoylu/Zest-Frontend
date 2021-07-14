import axios from "axios";
export const ADD_RECIPE = 'ADD RECIPE'
export const DELETE_ALERT = 'DELETE_ALERT'
export const GET_USER = 'GET USER'
export const FOLLOW_USER = 'FOLLOW USER'
export const GET_FOLLOWINGS = 'GET FOLLOWINGS'
export const GET_USER_WITH_NAME = 'GET USER WITH NAME'
export const GET_FOLLOWERS = ' GET FOLLOWERS '
export const UNFOLLOW_USER = 'UNFOLLOW USER'
export const UPDATE_USER = 'UPDATE USER'
export const SET_FIELD = 'SET_FIELD';

export function getUser(){
    const token = localStorage.getItem('token')
    let config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    return (dispatch) => {
        dispatch(setField("get_user", true));
        axios.get('http://localhost:5000/user', config)
            .then((res) => {
                console.log("agubugubgubgubuabugbuabgu  ",res.data)
                dispatch({
                    type: GET_USER,
                    user: res.data.user
                })
            })
    }
}

export function createRecipe(data, history){
    const token = localStorage.getItem('token')
    let config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    return (dispatch) => {

        dispatch(setField("add_recipe", true));
        axios.post('http://localhost:5000/addRecipe', data, config)
            .then((res) => {
                console.log("add recipe",res.data.msg)
                dispatch({
                    type: ADD_RECIPE,
                    recipe_alert: res.data.msg
                })

                // history.push('/home')
            })
    }
}

export function getUserWithName(name){
    const token = localStorage.getItem('token')
    let config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    console.log("JJJJJJJJJJJ", name)

    return (dispatch) => {
        dispatch(setField("get_user_with_name", true));
        axios.post('http://localhost:5000/getUserWithName', {name: name}, config)
            .then((res) => {
                console.log("get user with name", res.data)
                dispatch({
                    type: GET_USER_WITH_NAME,
                    userToBeLinked: res.data.userToBeLinked
                })
            })
    }
}

export function followUser(id){
    const token = localStorage.getItem('token')
    let config = {
        params: {id : id},
        headers: { Authorization: `Bearer ${token}` }
    }
    return (dispatch) => {
        dispatch(setField("follow_user", true));
        axios.get('http://localhost:5000/followUser', config)
            .then((res) => {
                console.log("BEBEBEBEBEBEBEBBEBEBE  ",res.data)
                alert(res.data.msg)
                dispatch({
                    type: FOLLOW_USER,
                    user_alert: res.data.msg
                })
            })
    }
}

export function delete_user_alert(){
    return (dispatch) => {
        dispatch({
            type: DELETE_ALERT,
            user_alert: null
        })
    }
}

export function unfollowUser(id){
    const token = localStorage.getItem('token')
    let config = {
        params: {id : id},
        headers: { Authorization: `Bearer ${token}` }
    }
    return (dispatch) => {
        dispatch(setField("unfollow_user", true));
        axios.get('http://localhost:5000/unfollowUser', config)
            .then((res) => {
                console.log("BCBCBCBCBCBCBC  ",res.data)
                dispatch({
                    type: UNFOLLOW_USER,
                    user_alert: res.data.msg
                })
            })
    }
}

export function getFollowers(id){
    const token = localStorage.getItem('token')
    let config = {
        params: {id : id},
        headers: { Authorization: `Bearer ${token}` }
    }
    return (dispatch) => {
        dispatch(setField("get_followers", true));
        axios.get('http://localhost:5000/getFollowers', config)
            .then((res) => {
                console.log("ABABABABABABABABABA  ",res.data)
                dispatch({
                    type: GET_FOLLOWERS,
                    followers: res.data.followers
                })
            })
    }
}

export function getFollowings(id){
    const token = localStorage.getItem('token')
    let config = {
        params: {id :id},
        headers: { Authorization: `Bearer ${token}` }
    }
    return (dispatch) => {
        dispatch(setField("get_followings", true));
        axios.get('http://localhost:5000/getAllFollowings', config)
            .then((res) => {
                console.log("BRBRBRBRBRBR  ",res.data)
                dispatch({
                    type: GET_FOLLOWINGS,
                    followings: res.data.followings
                })
            })
    }
}

export function updateUser(data){
    const token = localStorage.getItem('token')
    let config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    console.log("DESCRIPTION", data.description)

    return (dispatch) => {
        dispatch(setField("update_user_description", true));
        axios.post('http://localhost:5000/updateUser', data, config)
            .then((res) => {
                console.log("UPDATE USER", res.data)
                dispatch({
                    type: UPDATE_USER,
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