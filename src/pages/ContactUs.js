import React, { useState } from 'react';
import Swal from 'sweetalert2'; // Import SweetAlert2
import Header from '../components/Header';
import Footer from '../components/Footer';
import './ContactUs.css';
import { FaFacebookSquare, FaTwitterSquare, FaInstagramSquare, FaLinkedin, FaEnvelope, FaPhone } from 'react-icons/fa';

function ContactUs() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to backend or an email service)
    
    // Use SweetAlert2 for a more stylish alert
    Swal.fire({
      title: 'Message Sent!',
      text: 'Thank you for contacting us. We will get back to you shortly.',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  };

  return (
    <div>
      <Header />
    
      <div className="contact-us">
        <div className="contact-header">
          <h1>Contact Us</h1>
          <p>We’d love to hear from you! Please fill out the form below or reach out through any of our contact details.</p>
        </div>
        
        <div className="contact-details">
          <div className="contact-info">
            <h2>Get In Touch</h2>
            <p><FaPhone /> +212 625 433 397</p>
            <p><FaEnvelope /> info@mlsquizapp.com</p>
            <p>123 Quiz Lane, Learning City, ML 45678</p>
          </div>
          
          <div className="contact-form">
            <h2>Send Us a Message</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
              />
              <button type="submit">Send Message</button>
            </form>
          </div>
        </div>

        <div className="social-media-contact">
          <h2>Connect With Us</h2>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebookSquare />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitterSquare />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagramSquare />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </a>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default ContactUs;
