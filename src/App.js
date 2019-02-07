import React, {Component} from 'react';
import './App.css';
import {Router, Route} from 'react-router-dom';
import {history} from './config/history';
import PrivateRoute from './components/PrivateRoute';
import Search from "./components/Search";
import LoginPage from "./components/LoginPage";
import {connect} from "react-redux";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {userActions} from "./actions/user.actions";


class App extends Component {

    logout() {
        this.props.dispatch(userActions.logout());
    }

    render() {
        return (
            <div className="App">
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" color="inherit" style={{flexGrow: 1}}>
                            WeatherMate
                        </Typography>
                        {this.props.user.authentication ?
                            <Button style={{textAlign: 'flex-end'}} color="inherit"
                                    onClick={() => this.logout()}>Logout</Button> : null}
                    </Toolbar>
                </AppBar>
                <Router history={history}>
                    <div>
                        <PrivateRoute exact path="/" component={Search}/>
                        <Route path="/login" component={LoginPage}/>
                    </div>
                </Router>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {loading, user} = state;
    console.log('search state', state);
    return {
        user,
        loading
    };
}

export default App = connect(mapStateToProps)(App);
