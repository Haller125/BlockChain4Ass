import './TermsOfService.css'; // Make sure to link to the CSS file
import "../../../App.css";

const TermsOfService = () => {
    return (
        <div className="terms-container">
            <h1>Terms of Service</h1>
            <ol className="terms-list">
                <li>
                    <h2>Acceptance of Terms</h2>
                    <p>By accessing and using the WeatherBet dApp, you agree to comply with and be bound by the
                        following terms and conditions. If you do not agree to these terms, please do not use our
                        dApp.</p>
                </li>
                <li>
                    <h2>Changes to Terms</h2>
                    <p>WeatherBet reserves the right to modify or replace these Terms at any time. It is your
                        responsibility to check the Terms periodically for changes.</p>
                </li>
                <li>
                    <h2>Service Description</h2>
                    <p>WeatherBet is a decentralized application that allows users to place bets on future weather
                        conditions. Users can monetize their meteorological predictions using secure smart contracts and
                        verified weather outcomes.</p>
                </li>
                <li>
                    <h2>User Responsibility</h2>
                    <p>Users are responsible for all activity that occurs under their account. It&#39;s the user&#39;s
                        responsibility to keep their account secure.</p>
                </li>
                <li>
                    <h2>Disclaimers</h2>
                    <p>WeatherBet is not responsible for any losses incurred as a result of using the dApp. All bets are
                        placed at the user&#39;s own risk. The dApp does not guarantee accuracy in weather predictions or
                        outcomes.</p>
                </li>
                <li>
                    <h2>Limitation of Liability</h2>
                    <p>To the fullest extent permitted by law, WeatherBet shall not be liable for any indirect,
                        incidental, special, consequential, or punitive damages, or any loss of profits or revenues.</p>
                </li>
                <li>
                    <h2>Disputes</h2>
                    <p>Any disputes related to these Terms, the dApp, or the services will be governed by the laws of
                        [Jurisdiction], without regard to its conflict of laws rules.</p>
                </li>
                <li>
                    <h2>Intellectual Property</h2>
                    <p>All content, designs, graphics, and other intellectual property related to WeatherBet are the
                        property of WeatherBet and cannot be replicated without explicit permission.</p>
                </li>
                <li>
                    <h2>Privacy</h2>
                    <p>By using WeatherBet, you agree to our Privacy Policy which explains how we collect and use your
                        information.</p>
                </li>
                <li>
                    <h2>Termination</h2>
                    <p>WeatherBet reserves the right to suspend or terminate your access to the dApp without notice if
                        you violate these Terms.</p>
                </li>
            </ol>
        </div>
    );
};

export default TermsOfService;