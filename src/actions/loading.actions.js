export const loadingActions = {
    loading,
    success
};

function loading() {
    return {type: 'FETCHING_DATA', payload: true}
}

function success() {
    return {type: 'FETCHING_SUCCESS', payload: false}
}
