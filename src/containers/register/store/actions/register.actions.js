import axios from "axios";
export const REGISTER_USER = 'Register User'
export const SET_FIELD = 'SET_FIELD';



export function registerUser(user){
    return (dispatch) => {
        dispatch(setField("register_user", true));
        axios.post('http://localhost:5000/register', user)
            .then((res) => {
                alert(res.data.msg)
            })
            .catch((err) => console.log(err))
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
