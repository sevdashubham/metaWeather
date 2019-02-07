
export function loading(state = {}, action) {
    switch (action.type) {
        case 'FETCHING_DATA':
            return action.payload;
        case 'FETCHING_SUCCESS':
            return action.payload;
        default:
            return false;
    }
}
