import "./ErrorNoConnection.css"

const ErrorNoConnection = () => {
    return (
        <div className="not-found-container">
            <img src="/public/images/errorLogo.webp" className={"errorLogo"} alt="Error Logo" />
            <div className="overlay">
                <h1>Oops...</h1>
                <h2>No Internet Connection</h2>
                <p>Please check your internet connectivity and try again</p>
                <a href="javascript:window.location.reload()" className="home-link">Reload</a>
            </div>
        </div>
    );
};

export default ErrorNoConnection;