import React from 'react';
import { connect } from 'react-redux';
import { userActions } from '../actions/user.actions';
import Loading from "./Loading";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ submitted: true });
        const { username, password } = this.state;
        const { dispatch } = this.props;
        if (username && password) {
            dispatch(userActions.login(username, password));
        }
    }

    render() {
        const { username, password, submitted } = this.state;
        const {loading} = this.props;
        return (<div>{loading? <Loading/>:
                <div style={{textAlign:'center', justifyContent: 'center', marginTop: 100}}>
                <h2>Login</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                        <TextField
                            style={{width: 250}}
                            id="outlined-name"
                            label="Username"
                            name="username"
                            value={username}
                            onChange={this.handleChange}
                            margin="normal"
                            variant="outlined"
                        />
                        {/*<input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />*/}
                        {submitted && !username &&
                        <div className="help-block">Username is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                        <TextField
                            style={{width: 250}}
                            id="outlined-password"
                            label="Password"
                            name="password"
                            value={password}
                            onChange={this.handleChange}
                            margin="normal"
                            variant="outlined"
                            type="password"
                        />
                        {/*<input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />*/}
                        {submitted && !password &&
                        <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div>
                        <Button variant="contained" color="primary" onClick={this.handleSubmit} style={{width: 250, marginTop: 40}}>
                            Login
                        </Button>
                    </div>
                </form>
            </div>}
            </div>
        );
    }
}

function mapStateToProps(state) {
    console.log(state);
    const {loading} = state;
    return {
        loading
    };
}

export default LoginPage = connect(mapStateToProps)(LoginPage);
