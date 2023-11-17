import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer-container">
          <div className="footer-column first-column">
            <p>
              WeatherBet - A decentralized application (dApp) that allows users to place bets on future weather conditions.
            </p>
            <p>
            Uncertainty in weather forecasting can be fun! Gives people an opportunity to monetize their meteorological instincts.
            </p>
          </div>
    
          <div className="footer-column second-column">
            <p>Informational Pages</p>
            <ul>
              <li><a href="/terms-of-service">Terms of Service</a></li>
              <li><a href="/privacy-policy">Privacy Policy</a></li>
            </ul>
          </div>
    
          <div className="footer-column third-column">
            <p>Follow us on Telegram!</p>
            <a href="https://t.me/WeatherBeting" target="_blank" rel="noopener noreferrer">
            <img src="/public/images/telegram_qr_code.webp" alt="Telegram QR Code" />
            </a>
            <p>Click me or scan</p>
          </div>
        </footer>
      );
};

export default Footer;