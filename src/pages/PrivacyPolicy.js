import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './PrivacyPolicy.css';

function PrivacyPolicy() {
  return (
    <div>
      <Header />
      
      <div className="privacy-policy">
        <div className="policy-header">
          <h1>Privacy Policy</h1>
          <p>Effective Date: [24/10/2024]</p>
        </div>
        
        <div className="policy-content">
          <h2>1. Introduction</h2>
          <p>At MLS Quiz App, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website.</p>
          
          <h2>2. Information We Collect</h2>
          <p>We collect personal information that you provide to us voluntarily when you fill out the contact form, including your name, email address, and any message you submit. We may also collect non-personal data such as your IP address and browser type for analytics purposes.</p>
          
          <h2>3. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Respond to your inquiries and provide support</li>
            <li>Improve our website and services</li>
            <li>Send occasional updates or promotional material (if consent is provided)</li>
          </ul>
          
          <h2>4. Sharing Your Information</h2>
          <p>We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.</p>
          
          <h2>5. Cookies</h2>
          <p>Our website may use cookies to enhance your user experience. Cookies are small files placed on your device that help us analyze traffic and remember your preferences. You can choose to disable cookies through your browser settings, but this may affect your experience on our site.</p>
          
          <h2>6. Data Security</h2>
          <p>We use administrative, technical, and physical security measures to protect your personal information. However, no method of transmission over the internet or method of electronic storage is 100% secure, and we cannot guarantee its absolute security.</p>
          
          <h2>7. Your Rights</h2>
          <p>You have the right to access, update, or delete your personal information that we hold. If you wish to exercise these rights or have any questions regarding our data practices, please contact us at <a href="mailto:info@mlsquizapp.com">info@mlsquizapp.com</a>.</p>
          
          <h2>8. Changes to This Privacy Policy</h2>
          <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date.</p>
          
          <h2>9. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us via the <a href="/contact">Contact Us</a> page or email us at <a href="mailto:info@mlsquizapp.com">info@mlsquizapp.com</a>.</p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default PrivacyPolicy;
