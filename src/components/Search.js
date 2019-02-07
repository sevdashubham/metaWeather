import React from 'react';
import metaWeatherService from "../services/metaWeather.service";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dashboard from "./Dashboard";

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            latitude: 0,
            longitude: 0,
            keyword: '',
            searchResponse: []
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        // this.handleClickSearchItem = this.handleClickSearchItem.bind(this);

    }

    handleClickSearchItem = (id) => {
        console.log(id);
    };
    handleChange = keyword => event => {
        this.setState({[keyword]: event.target.value});
        if (event.target.value === '') {
            this.setState({searchResponse: []});
        }
    };

    handleClick() {
        const {keyword} = this.state;
        if (keyword) {
            metaWeatherService.locationSearch(keyword).then(data => {
                console.log('search data is', data);
                this.setState({searchResponse: data})
            });
        }
    }

    componentDidMount() {
        this.getLocation();
    }

    getLocation() {
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
        metaWeatherService.locationSearchWithLatLong(lat, lng).then(data => {
            console.log(data[0].woeid);
        })
    }

    render() {
        const {searchResponse} = this.state;
        return (
            <div>
                <TextField
                    id="standard-name"
                    label="Search"
                    value={this.state.keyword}
                    onChange={this.handleChange('keyword')}
                    margin="normal"
                />
                <Button variant="outlined" onClick={this.handleClick}>
                    Search
                </Button>
                {searchResponse.length > 0 ?
                    <SearchList searchResponse={searchResponse} onPress={this.handleClickSearchItem}/> : <Dashboard/>}

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
export default Search;
