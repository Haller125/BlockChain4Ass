import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({isConnected, connectWallet}) => {
    const navigate = useNavigate();

    const goToProfilePage = () => {
        navigate('/profile'); // Use navigate to redirect to the /profile page
    };

    return (
        <nav>
            <ul className="navbar-list">
                <li className="navbar-item">
                    <Link to="/" className="navbar-link"><img src="/public/images/logo.webp" alt="Logo" className="navbar-logo" /></Link>
                </li>
                <li className="navbar-item">
                    <Link to="/" className="navbar-link">Home</Link>
                </li>
                <li className="navbar-item">
                    <p>The chosen city</p>
                    <p><img src="/public/images/location.webp" alt="Location Icon" />Almaty</p>
                </li>
                <li className="navbar-item">
                    {!isConnected ? (
                        <button className="connect-wallet-button" onClick={connectWallet}>
                            Connect to MetaMask
                        </button>
                    ) : (
                        <button className="connect-wallet-button" onClick={goToProfilePage}>
                            Go to Profile
                        </button>
                    )}
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;