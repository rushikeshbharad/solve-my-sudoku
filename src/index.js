import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import TermsOfUse from './terms-of-use';
import PrivacyPolicy from './privacy-policy';
import AboutUs from './about-us'
import Blogs from './blogs';
import Footer from './components/footer';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router';

ReactDOM.render(
  <BrowserRouter basename="">
    <Routes>
      <Route path="" element={<App />} />
      <Route path="/terms-of-use" element={<TermsOfUse />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/blogs/*" element={<Blogs />} />
    </Routes>
    <Footer />
    </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
