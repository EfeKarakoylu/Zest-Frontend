import axios from "axios";
export const GET_ALL_CATEGORIES = 'GET ALL CATEGORIES'
export const GET_CATEGORY = 'GET CATEGORY'
export const SET_FIELD = 'SET_FIELD';


export function getCategories(){
    const token = localStorage.getItem('token')
    let config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    return (dispatch) => {
        dispatch(setField("get_all_categories", true));
        axios.get('http://localhost:5000/getAllCategories', config)
            .then((res) => {
                console.log("get categories",res.data)
                dispatch({
                    type: GET_ALL_CATEGORIES,
                    categories: res.data.categories
                })
            })
    }
}

export function getCategory(id){
    const token = localStorage.getItem('token')
    console.log("CATEGORY GET")
    let config = {
        params: { id : id},
        headers: { Authorization: `Bearer ${token}` }
    }
    return (dispatch) => {
        dispatch(setField("get_category", true));
        axios.get('http://localhost:5000/getCategory', config)
            .then((res) => {
                console.log("get category",res.data)
                dispatch({
                    type: GET_CATEGORY,
                    category: res.data.category
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