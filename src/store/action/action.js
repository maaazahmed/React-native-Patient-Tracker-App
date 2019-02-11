import ActionTypes from "../constant/constant"


export const currentUserAction = (data) => {
    return dispatch => {
        dispatch({
            type: ActionTypes.CURRENT_USER_KEY,
            payload: data
        })
    }

}


export const patienstAction = (data) => {
    return dispatch => {
        dispatch({
            type: ActionTypes.PATIENSTS_KEY,
            payload: data
        })
    }

}

export const currentPatienstAction = (data) => {
    return dispatch => {
        dispatch({
            type: ActionTypes.CURRENT_PATIENSTS,
            payload: data
        })
    }
}


export const clearStoreAction = (data) => {
    return dispatch => {
        dispatch({
            type: ActionTypes.CLEAR_STOE,
            payload: data
        })
    }
}









