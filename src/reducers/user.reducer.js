export function user(state = {}, action) {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                authentication: action.payload
            };
        case 'LOGIN_FAILURE':
            return {
                ...state,
                authentication: action.payload
            };
        case 'USER_LOCATION_FETCH_SUCCES':
            return {
                ...state,
                location: action.payload
            };
        case 'WEATHER_FETCH_ERROR':
            return {};
        case 'USER_LOGOUT':
            return {};
        default:
            return state
    }
}
