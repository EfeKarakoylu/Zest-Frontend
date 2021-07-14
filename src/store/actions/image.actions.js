import axios from "axios";
export const POST_IMAGE = 'POST_IMAGE'
export const DELETE_KEY = 'DELETE KEY'
export const SET_FIELD = 'SET_FIELD';

export function postImage({image}){
    const token = localStorage.getItem('token')
    let config = {
        headers: { Authorization: `Bearer ${token}` }
    }
    const data = new FormData()
    data.append("image", image)
    return (dispatch) => {
        dispatch(setField("post_image", true));
        axios.post('http://localhost:5000/postImage', data, config)
            .then((res) => {
                alert(res.data.msg)
                console.log("post image",res.data)
                dispatch({
                    type: POST_IMAGE,
                    imageKey: res.data
                })

            })
    }
}

export function deleteImageKey(){
    return (dispatch) => {
        dispatch(setField("delete_image_key", true));
        dispatch({
            type: DELETE_KEY,
            imageKey: null
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