import React from 'react';
import './PrivacyPolicy.css'; // Make sure to link to the CSS file

const PrivacyPolicy = () => {
    return (
        <div className="privacy-policy-container">
            <h1>Privacy Policy</h1>
            <ol className="privacy-list">
                <li>
                    <h2>Introduction</h2>
                    <p>Thank you for choosing WeatherBet. We respect your privacy and strive to protect your personal
                        data. This policy outlines how we collect, use, and safeguard your information.</p>
                </li>
                <li>
                    <h2>What Data We Collect</h2>
                    <ul>
                        <li>Account Data: When you create an account, we collect your username, email address, and
                            encrypted password.
                        </li>
                        <li>Transaction Data: We record your betting history, including amounts wagered and outcomes.
                        </li>
                        <li>Usage Data: We collect data about how you interact with our dApp, such as click patterns,
                            time spent on pages, and other engagement metrics.
                        </li>
                    </ul>
                </li>
                <li>
                    <h2>Why We Collect Data</h2>
                    <ul>
                        <li>To provide, maintain, and improve our services.</li>
                        <li>To process transactions and send notices about your transactions.</li>
                        <li>To gather analytical data to understand user behavior.</li>
                        <li>To notify users about updates or changes to our services.</li>
                    </ul>
                </li>
                <li>
                    <h2>How We Store Data</h2>
                    <p>All personal data is securely stored using encryption methods. We use secure servers and
                        industry-standard security protocols to protect against unauthorized access.</p>
                </li>
                <li>
                    <h2>Sharing Your Data</h2>
                    <p>WeatherBet does not sell, trade, or transfer your personally identifiable information to external
                        parties. We may share data with trusted third parties who assist us in operating our dApp,
                        provided they agree to keep this information confidential.</p>
                </li>
                <li>
                    <h2>Cookies</h2>
                    <p>WeatherBet may use cookies to enhance user experience. Users have the option to refuse cookies
                        through their browser settings.</p>
                </li>
                <li>
                    <h2>User Rights</h2>
                    <ul>
                        <li>Request a copy of their personal data.</li>
                        <li>Request correction of any incorrect data.</li>
                        <li>Request deletion of their data.</li>
                    </ul>
                </li>
                <li>
                    <h2>Changes to the Privacy Policy</h2>
                    <p>WeatherBet reserves the right to update this privacy policy at any time. Any changes will be
                        posted on this page with an updated revision date.</p>
                </li>
                <li>
                    <h2>Consent</h2>
                    <p>By using our dApp, you consent to our privacy policy.</p>
                </li>
            </ol>
        </div>
    );
};

export default PrivacyPolicy;