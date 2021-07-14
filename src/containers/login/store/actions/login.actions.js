import axios from "axios";
export const SET_FIELD = 'SET_FIELD';
export const LOGIN_USER = 'LOGIN USER';


export function userLogin(user, history){

    return (dispatch) => {

        dispatch(setField('login_user', true))
        axios.post('http://localhost:5000/login', user)
            .then((res) => {
                console.log("login actions",res.data)
                localStorage.setItem('token', res.data.token)
                dispatch({
                    type: LOGIN_USER,
                    user: user
                })
                history.push('/home')
            })
            .catch((err) => {
                alert('you could not logged in')
                console.log(err)
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

