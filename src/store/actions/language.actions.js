export const CHANGE_LANGUAGE = 'CHANGE LANGUAGE'
export const SET_FIELD = 'SET_FIELD';


export function changeLanguage(lang){
    return (dispatch) => {
        dispatch(setField("change_language", true));
        dispatch({
            type: CHANGE_LANGUAGE,
            language: lang
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