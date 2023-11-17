import React from 'react';
import "./ErrorNotFound.css"
import errorLogo from "../../images/errorLogo.png"

const ErrorNotFound = () => {
    return (
        <div className="not-found-container">
            <img src={errorLogo} className={"errorLogo"}/>
            <div className="overlay">
                <h1>404</h1>
                <h2>Page Not Found</h2>
                <p>Sorry, we were unable to find that page</p>
                <a href="/" className="home-link">Start from home page</a>
            </div>
        </div>
    );
};

export default ErrorNotFound;