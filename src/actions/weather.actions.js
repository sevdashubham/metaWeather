import metaWeatherService from "../services/metaWeather.service";
import {loadingActions} from "./loading.actions";

export const weatherActions = {
    getWeatherForID
};

function getWeatherForID(id) {
    return dispatch => {
        dispatch(loadingActions.loading());
        metaWeatherService.getWeatherInformation(id).then(
            (data) => {
                loadingActions.success();
                if (data) {
                    console.log(JSON.stringify(data));
                    dispatch(success(data));
                }
            }
        ).catch((error) => {
                loadingActions.success();
                console.log(JSON.stringify(error));
                dispatch(failure(error));
            }
        );

        function success(data) {
            return {type: 'WEATHER_FETCH_SUCCES', payload: data}
        }

        function failure(error) {
            return {type: 'WEATHER_FETCH_ERROR', payload: error}
        }
    }
}
