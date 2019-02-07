import React from 'react';
import metaWeatherService from "../services/metaWeather.service";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dashboard from "./Dashboard";
import {connect} from "react-redux";
import {weatherActions} from "../actions/weather.actions";
import {userActions} from "../actions/user.actions";
import {loadingActions} from "../actions/loading.actions";
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardActionArea from '@material-ui/core/CardActionArea';

const styles = {
    contentSearch: {
        flex: 1,
        flexWrap: 'wrap',
        textAlign: 'center',
        alignItems: 'center'
    }
};

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            latitude: 0,
            longitude: 0,
            keyword: '',
            searchResponse: [],
            dashboard: true
        };
        this.handleSearch = this.handleSearch.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClickSearchItem = this.handleClickSearchItem.bind(this);

    }

    handleClickSearchItem = (id) => {
        const {dispatch} = this.props;
        dispatch(weatherActions.getWeatherForID(id));
        this.setState({searchResponse: [], keyword: '', dashboard: true});
        console.log(id);
    };
    handleChange = keyword => event => {
        this.setState({[keyword]: event.target.value});
    };

    handleSearch() {
        const {keyword} = this.state;
        const {dispatch} = this.props;
        if (keyword) {
            dispatch(loadingActions.loading());
            metaWeatherService.locationSearch(keyword).then(data => {
                dispatch(loadingActions.success());
                if (data) {
                    this.setState({searchResponse: data, dashboard: false})
                }
            });
        }
    }

    componentDidMount() {
        this.getLocation();
    }

    getLocation() {
        const {dispatch} = this.props;
        dispatch(loadingActions.loading());
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position => {
                this.displayLocationInfo(position);
            }));
        }
    }

    displayLocationInfo(position) {
        const lng = position.coords.longitude;
        const lat = position.coords.latitude;
        console.log(`longitude: ${ lng } | latitude: ${ lat }`);
        this.getLocationID(lat, lng)
    }

    getLocationID(lat, lng) {
        const {dispatch} = this.props;
        dispatch(userActions.setUserLocation(lat, lng));
        metaWeatherService.locationSearchWithLatLong(lat, lng).then(data => {
            dispatch(weatherActions.getWeatherForID(data[0].woeid));
        })
    }

    render() {
        const {searchResponse, dashboard} = this.state;
        const {loading} = this.props;
        return (
            <div style={styles.contentSearch}>
                <TextField
                    id="standard-name"
                    label="Search"
                    value={this.state.keyword}
                    onChange={this.handleChange('keyword')}
                    margin="normal"
                    disabled={loading}
                    onKeyPress={event => {
                        if (event.key === 'Enter') {
                            this.handleSearch()
                        }
                    }}
                />
                <Button style={{marginTop: 30, marginLeft: 10}} variant="outlined" onClick={this.handleSearch}>
                    Search
                </Button>
                {searchResponse.length > 0 ?
                    <SearchList searchResponse={searchResponse} onPress={this.handleClickSearchItem}/> : <div>{!dashboard && <h3>no results found</h3>}</div>}
                {dashboard && <Dashboard/>}
            </div>
        )
    }
}

class SearchList extends React.Component {
    render() {
        const {onPress, searchResponse} = this.props;
        return (
            <Grid container spacing={16} style={{padding: 24}}>
                {searchResponse.map((item, index) => {
                    return <Grid item xs={12} sm={6} md={4} lg={3} xl={2}  key={item.woeid}>
                        <CardActionArea>
                        <Card onClick={() => onPress(item.woeid)}>
                        <h3>{item.title}</h3>
                        </Card>
                        </CardActionArea>
                    </Grid>
                })}
            </Grid>

        );
    }
}

function mapStateToProps(state) {
    const {loading} = state;
    console.log('search state', state);
    return {
        loading
    };
}

export default Search = connect(mapStateToProps)(Search);
