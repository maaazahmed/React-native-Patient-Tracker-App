import ActionTypes from '../constant/constant';

const INITIAL_STATE = {
    currentUser: {},
    patienst: [],
    currentPatienst: {}
}




export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionTypes.CURRENT_USER_KEY:
            return ({
                ...state,
                currentUser: action.payload
            })
        case ActionTypes.PATIENSTS_KEY:
            return ({
                ...state,
                patienst: action.payload
            })
        case ActionTypes.CURRENT_PATIENSTS:
            return ({
                ...state,
                currentPatienst: action.payload
            })
        case ActionTypes.CLEAR_STOE:
            return ({
                state:{},
            })
        default:
            return state;
    }

}

