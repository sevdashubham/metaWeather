import React from 'react';
import './Loading.css';

export default class Loading extends React.Component {
    render() {
        return (
            <div className="loader">
            <div className="psoload">
                <div className="straight"></div>
                <div className="curve"></div>
                <div className="center"></div>
                <div className="inner"></div>
            </div>
            </div>
        );
    }
}


