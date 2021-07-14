export const SET_TARGETS_MENU_OPENED = 'SET_TARGETS_MENU_OPENED';
export const SET_TOOLBAR = 'SET_TOOLBAR';
export const SET_NAVBAR = 'SET_NAVBAR';
export const SET_DRAWER = 'SET_DRAWER';
export const SET_MESSAGE = "set message";
export const SET_LOADING = "set loading";


export function setTargetsMenuOpened(value) {
    return {
        type: SET_TARGETS_MENU_OPENED,
        payload: value
    };
}

export function setToolbar(value) {
    return {
        type: SET_TOOLBAR,
        payload: value
    };
}

export function setNavbar(value) {
    return {
        type: SET_NAVBAR,
        payload: value
    };
}

export function setDrawer(value) {
    return {
        type: SET_DRAWER,
        payload: value
    };
}

export function setLoading(loading) {
    return {
        type: SET_LOADING,
        payload: {
            loading
        }
    }
}

export function setMessage(text, type) {
    return {
        type: SET_MESSAGE,
        payload: {
            text,
            type
        }
    }
}
