import React from 'react';
import WeatherCard from "./WeatherCard";
import {connect} from "react-redux";
import Loading from "./Loading";
import Grid from '@material-ui/core/Grid';

const styles = {
    header: {
        flex: 1,
        textAlign: 'center',
        marginTop: 20
    }
};


class Dashboard extends React.Component {

    render() {
        const {weather, loading} = this.props;
        console.log(weather);
        if (Object.keys(weather).length === 0) { // evaluates to true if currentVideo is null
            return <Loading/>;
        } else {
            return (
                <div>
                    {loading ? <Loading/> : <div>
                        <div style={styles.header}>
                        <h2>{weather.title}</h2>
                        </div>
                            <WeatherList weatherList={weather.consolidated_weather}/>

                    </div>
                    }
                </div>
            )
        }
    }
}

const WeatherList = ({weatherList}) => (
    <Grid container spacing={16} style={{padding: 24}}>
        {weatherList.map((weather, index) => {
            return (<Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={weather.id}>
                <WeatherCard weather_state_name={weather.weather_state_name}
                                                   weather_state_abbr={weather.weather_state_abbr}
                                                   max_temp={weather.max_temp} min_temp={weather.min_temp}
                                                   wind_speed={weather.wind_speed}
                                                   applicable_date={weather.applicable_date}/>
            </Grid>)
        })}
    </Grid>
);

function mapStateToProps(state) {
    const {weather, loading} = state;
    console.log('dashboard state', state);
    return {
        weather,
        loading
    };
}

export default Dashboard = connect(mapStateToProps)(Dashboard);

