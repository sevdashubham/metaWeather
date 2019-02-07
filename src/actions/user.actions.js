import {loadingActions} from "./loading.actions";

export const userActions = {
    login,
    setUserLocation
};

function login(username, password) {
    return dispatch => {
        dispatch(loadingActions.loading());
        if (username === 'test@test.com' && password === 'password') {
            setTimeout(function () {
                dispatch(loadingActions.success());
                dispatch(success())
            }, 5000);
        } else {
            setTimeout(function () {
                dispatch(loadingActions.success());
                dispatch(failure())
            }, 3000);
        }

        function success() {
            return {type: 'LOGIN_SUCCESS', payload: true}
        }

        function failure() {
            return {type: 'LOGIN_FAILURE', payload: false}
        }
    }
}

function setUserLocation(lat, lng) {
    return {type: 'USER_LOCATION_FETCH_SUCCES', payload: {latitude: lat, longitude: lng}}

}
