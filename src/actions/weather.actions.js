
export const weatherActions = {
    getWeatherForID
};

function getWeatherForID() {
    return dispatch => {
        topicService.getTopics().then(
            (data) => {
                if (data) {
                    console.log(JSON.stringify(data));
                    dispatch(success(data));
                }
            }
        ).catch((error) => {
                console.log(JSON.stringify(error));
                dispatch(failure(error));
            }
        );

        function success(data) {
            return {type: topicConstants.FETCH_TOPIC_SUCCESS, payload: data}
        }

        function failure(error) {
            return {type: topicConstants.FETCH_TOPIC_FAILURE, payload: error}
        }
    }
}
