import axios from 'axios';
import config from "../config/config";

const headers = {
    'Content-Type': 'application/json;charset=UTF-8',
    "Access-Control-Allow-Origin": "*"
};
const metaWeatherService = {

    locationSearch: async (query) => {
        try {
            const res = await axios.get(config.API_URL + `location/search/?query=${query}`, {"headers" : headers});
            if (res) {
                console.log(JSON.stringify(res));
                return res.data;
            }
        } catch (error) {
            console.log(JSON.stringify(error));
            metaWeatherService.sendErrorCode(error);
        }
    },
    locationSearchWithLatLong: async (latitude, longitude) => {
        try {
            const res = await axios.get('https://cors-anywhere.herokuapp.com/' + config.API_URL + `location/search/?lattlong=${latitude},${longitude}`);
            if (res) {
                console.log(JSON.stringify(res));
                return res.data;
            }
        } catch (error) {
            console.log(JSON.stringify(error));
            metaWeatherService.sendErrorCode(error);
        }
    },
    getWeatherInformation: async (woeid) => {
        try {
            const res = await axios.get(config.API_URL + `location/${woeid}`);
            if (res) {
                console.log(JSON.stringify(res.data));
                return res.data;
            }
        } catch (error) {
            console.log(JSON.stringify(error));
            metaWeatherService.sendErrorCode(error);
        }
    },
    sendErrorCode(error) {
        throw error.code;
    }
};

export default metaWeatherService;
