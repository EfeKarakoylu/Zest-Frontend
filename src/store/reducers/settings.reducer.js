import * as Actions from '../actions';

const initialState = {
    layout       : {
        // targetsMenuOpened: false,
        // loading: false,
        // message: null,
        // toolbar: true,
        navbar: true
        // drawer: false
    }
};

const settings = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.SET_TARGETS_MENU_OPENED: {
            return {
                ...state,
                layout: {
                    ...state.layout,
                    targetsMenuOpened: action.payload
                }

            };
        }
        case Actions.SET_LOADING:
        {
            return {
                ...state,
                layout: {
                    ...state.layout,
                    loading: action.payload.loading
                }
            };
        }
        case Actions.SET_MESSAGE:
        {
            return {
                ...state,
                layout: {
                    ...state.layout,
                    message: action.payload
                }
            };
        }
        case Actions.SET_TOOLBAR: {
            return {
                ...state,
                layout: {
                    ...state.layout,
                    toolbar: action.payload
                }
            };
        }
        case Actions.SET_NAVBAR: {
            return {
                ...state,
                layout: {
                    ...state.layout,
                    navbar: action.payload
                }
            };
        }
        case Actions.SET_DRAWER: {
            return {
                ...state,
                layout: {
                    ...state.layout,
                    drawer: action.payload
                }
            };
        }
        default:
        {
            return state;
        }
    }
};

export default settings;
