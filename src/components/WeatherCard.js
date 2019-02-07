import Card from '@material-ui/core/Card';
import React from 'react';
import CardContent from '@material-ui/core/CardContent';

const styles = {
    card: {
        display: 'flex',
    },
    details: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
    },
    content: {
        flex: '1 0 auto',
        textAlign: 'left'
    },
    cover: {
        alignSelf: 'flex-right',
        padding: 10,
        height: 50,
        width: 50,
    }
};

export default class WeatherCard extends React.Component {
    addZ(n){return n<10? '0'+n:''+n;}
    render() {
        const {weather_state_name, weather_state_abbr, max_temp, min_temp, wind_speed, applicable_date} = this.props;
        const currentDate = new Date();
        const today = `${currentDate.getFullYear()}-${this.addZ(currentDate.getMonth() + 1)}-${this.addZ(currentDate.getDate())}`;
        console.log('today', today);
        return (
            <Card style={styles.card}>
                <div style={styles.details}>
                    <CardContent style={styles.content}>
                            <h3>{applicable_date=== today ? 'Today': applicable_date}</h3>
                            <h2>  {weather_state_name}</h2>
                            <h6>Max: {parseInt(max_temp)}&deg; C</h6>
                            <h6>Min: {parseInt(min_temp)}&deg; C</h6>
                            <h6>Wind speed: {parseInt(wind_speed)} mph</h6>
                    </CardContent>
                    <img
                        style={styles.cover}
                        src={`https://www.metaweather.com/static/img/weather/png/${weather_state_abbr}.png`}
                        alt={'weather'}
                    />
                </div>
            </Card>
        );
    }
}


