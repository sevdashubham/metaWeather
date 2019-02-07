
export function weather(state = {}, action) {
    switch (action.type) {
        case 'WEATHER_FETCH_SUCCES':
            return action.payload;
        case 'WEATHER_FETCH_ERROR':
            return {};
        default:
            return state
    }
}
