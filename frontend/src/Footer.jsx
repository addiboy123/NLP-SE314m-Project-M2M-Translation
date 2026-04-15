import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {currentYear} Translator. All rights reserved.</p>
        <p className="footer-credit">Powered by NLP Model</p>
      </div>
    </footer>
  );
};

export default Footer;