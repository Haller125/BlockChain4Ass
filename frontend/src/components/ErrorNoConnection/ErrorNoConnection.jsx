import React from 'react';
import "./ErrorNoConnection.css"
import errorLogo from "../../images/errorLogo.png"

const ErrorNoConnction = () => {
    return (
        <div className="not-found-container">
            <img src={errorLogo} className={"errorLogo"}/>
            <div className="overlay">
                <h1>Oops...</h1>
                <h2>No Internet Connection</h2>
                <p>Please check your internet connectivity and try again</p>
                <a href="javascript:window.location.reload(true)" className="home-link">Reload</a>
            </div>
        </div>
    );
};

export default ErrorNoConnction;