import React from 'react';
import './footer.css';
import moment from 'moment';

const Footer = () => {
  return (
    <div className="footer-container">
      <p>
        &copy; {moment().format('YYYY')} Saumic Craft. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
