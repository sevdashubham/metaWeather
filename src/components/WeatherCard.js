import Card from '@material-ui/core/Card';
import React from 'react';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import config from "../config/config";

const styles = {
    card: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
};


export default class WeatherCard extends React.Component {
    render() {
        const {weather_state_name, weather_state_abbr, max_temp, min_temp, wind_speed, applicable_date} = this.props;
        // const {title, min_temp, max_temp, wind_speed, humidity, applicable_date,weather_state_name, weather_state_abbr} = this.props;
        return (
            <Card style={{maxWidth: 345}}>
                <CardActionArea>
                    <Typography gutterBottom variant="h5" component="h2">
                        {applicable_date}
                    </Typography>
                    <CardMedia
                        style={{height: 80, width: 80}}
                        image={`https://www.metaweather.com/static/img/weather/png/${weather_state_abbr}.png`}
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {weather_state_name}
                        </Typography>
                        <Typography component="p">
                           Max: {max_temp} C
                        </Typography>
                        <Typography component="p">
                           Min: {min_temp} C
                        </Typography>
                        <Typography component="p">
                           Wind speed: {wind_speed} C
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        );
    }
}


