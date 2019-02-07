import React from 'react';
import WeatherCard from "./WeatherCard";
import {connect} from "react-redux";

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {weather, loading} = this.props;
        console.log(weather);
        if (Object.keys(weather).length === 0) { // evaluates to true if currentVideo is null
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                {loading? <div>Loading... again</div> : <div>
                        <h2>{weather.title}</h2>
                        <WeatherList weatherList={weather.consolidated_weather}/>
                    </div>
                }
                </div>
            )
        }
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

function mapStateToProps(state) {
    const {weather, loading} = state;
    console.log('dashboard state', state);
    return {
        weather,
        loading
    };
}

export default Dashboard = connect(mapStateToProps)(Dashboard);

