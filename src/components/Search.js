import React from 'react';
import metaWeatherService from "../services/metaWeather.service";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dashboard from "./Dashboard";
import {connect} from "react-redux";
import {weatherActions} from "../actions/weather.actions";
import {userActions} from "../actions/user.actions";
import {loadingActions} from "../actions/loading.actions";

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
        if (event.target.value === '') {
            this.setState({searchResponse: []});
        }
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
            <div>
                <TextField
                    id="standard-name"
                    label="Search"
                    value={this.state.keyword}
                    onChange={this.handleChange('keyword')}
                    margin="normal"
                    disabled={loading}
                />
                <Button variant="outlined" onClick={this.handleSearch}>
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
            <div>
                {searchResponse.map((item, index) => {
                    return <div key={item.woeid} onClick={() => onPress(item.woeid)}>
                        <h4>{item.title}</h4>
                    </div>
                })}
            </div>

        );
    }
}

const styles = {};
function mapStateToProps(state) {
    const {loading} = state;
    console.log('search state', state);
    return {
        loading
    };
}

export default Search = connect(mapStateToProps)(Search);
