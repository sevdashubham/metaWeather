import {loadingActions} from "./loading.actions";
import { history } from '../config/history';

export const userActions = {
    login,
    setUserLocation,
    logout
};

function login(username, password) {
    return dispatch => {
        dispatch(loadingActions.loading());
        if (username === 'test@test.com' && password === 'password') {
            setTimeout(function () {
                dispatch(loadingActions.success());
                localStorage.setItem('user','token');
                history.push('/');
                dispatch(success())
            }, 2000);
        } else {
            setTimeout(function () {
                dispatch(loadingActions.success());
                dispatch(failure())
            }, 2000);
        }

        function success() {
            return {type: 'LOGIN_SUCCESS', payload: true}
        }

        function failure() {
            return {type: 'LOGIN_FAILURE', payload: false}
        }
    }
}

function logout() {
    return dispatch => {
        localStorage.clear();
        history.push('/login');
        dispatch(success());
        function success() {
            return {type: 'USER_LOGOUT', payload: false}
        }
    }
}

function setUserLocation(lat, lng) {
    return {type: 'USER_LOCATION_FETCH_SUCCES', payload: {latitude: lat, longitude: lng}}

}
