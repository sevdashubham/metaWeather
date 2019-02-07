import React from 'react';
import metaWeatherService from "../services/metaWeather.service";
import WeatherCard from "./WeatherCard";

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            consolidated_weather: []
        };
    }

    componentDidMount() {
        this.getWeather();
    }

    getWeather() {
        metaWeatherService.getWeatherInformation(44418).then((data) => {
            console.log(data);
            this.setState({consolidated_weather: data.consolidated_weather});
        });
    }

    render() {
        const {consolidated_weather} = this.state;
        return (
            <div>
                <WeatherList weatherList={consolidated_weather}/>
            </div>
        )
    }
}

const WeatherList = ({weatherList}) => (
    <div>
        {weatherList.map((weather, index) => {
            return <WeatherCard key={weather.id} weather_state_name={weather.weather_state_name}
                                weather_state_abbr={weather.weather_state_abbr}
                                max_temp={weather.max_temp} min_temp={weather.min_temp}
                                wind_speed={weather.wind_speed}
                                applicable_date={weather.applicable_date}/>
        })}
    </div>
);
const styles = {};
export default Dashboard;
