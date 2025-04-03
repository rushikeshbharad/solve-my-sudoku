import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Link } from 'react-router'
import App from './App';
import TermsOfUse from './terms-of-use';
import PrivacyPolicy from './privacy-policy';
import AboutUs from './about-us'
import BeginnersGuide from './blogs/1_beginners_guide';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/terms-of-use" element={<TermsOfUse />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/beginners-guide" element={<BeginnersGuide />} />
    </Routes>
    <div className="footer">
        <Link
          to="/terms-of-use"
          className="link"
        >
          Terms of Use
        </Link>
        <Link
          to="/privacy-policy"
          className="link"
        >
          Privacy Policy
        </Link>
        <Link
          to="/about-us"
          className="link"
        >
          About Us
        </Link>
      </div>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
