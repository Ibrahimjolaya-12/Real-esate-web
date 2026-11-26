import { useState } from 'react';
import { Link } from 'react-router-dom';
import { message } from 'antd';
import {
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined,
  SendOutlined,
  HomeOutlined,
} from '@ant-design/icons';

export default function Copyright() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    message.success('Subscribed! You will receive new property alerts.');
    setEmail('');
  };

  return (
    <footer className="villa-roof-footer mt-5">
      {/* Architectural Pitched / Gable Roof Top */}
      <div className="roof-svg-wrapper" aria-hidden="true">
        <svg
          viewBox="0 0 1440 130"
          preserveAspectRatio="none"
          className="roof-svg"
        >
          {/* Main Dark Roof Structure */}
          <polygon points="0,130 720,14 1440,130" fill="#181818" />
          {/* Architectural Orange Roof Trim / Eave Line */}
          <polyline
            points="0,126 720,10 1440,126"
            fill="none"
            stroke="#f35525"
            strokeWidth="5"
          />
        </svg>

        {/* Roof Peak Home Link (Click karte hi Home par le jayega) */}
        <Link
          to="/"
          className="roof-peak-badge"
          aria-label="Home"
          title="Home"
        >
          <HomeOutlined />
        </Link>
      </div>

      {/* Main House / Footer Body (~30px extra height) */}
      <div className="footer-body text-white pt-5 pb-5">
        <div className="container">
          <div className="row g-4 pb-5 border-bottom border-secondary border-opacity-25">
            {/* Column 1: Brand Info & Socials */}
            <div className="col-lg-4 pe-lg-4">
              <Link className="footer-logo d-inline-block mb-3" to="/">
                VILLA<span className="text-orange">.</span>
              </Link>
              <p className="text-white-50 small lh-lg mb-4">
                Crafting trust in real estate. Verified luxury villas, modern apartments, and skyline penthouses across Faisalabad, Toronto, and Melbourne with zero hidden charges.
              </p>
              <div className="d-flex gap-2">
                <a href="#facebook" className="social-circle" aria-label="Facebook">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#instagram" className="social-circle" aria-label="Instagram">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#linkedin" className="social-circle" aria-label="LinkedIn">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="#youtube" className="social-circle" aria-label="YouTube">
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
            </div>

            {/* Column 2: Quick Navigation */}
            <div className="col-6 col-md-4 col-lg-2">
              <h4 className="footer-heading">Explore</h4>
              <ul className="list-unstyled footer-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About Agency</Link></li>
                <li><Link to="/properties">All Properties</Link></li>
                <li><Link to="/contact">Schedule a Visit</Link></li>
              </ul>
            </div>

            {/* Column 3: Property Categories */}
            <div className="col-6 col-md-4 col-lg-3">
              <h4 className="footer-heading">Property Types</h4>
              <ul className="list-unstyled footer-links">
                <li><Link to="/properties?type=villa">Luxury Villas</Link></li>
                <li><Link to="/properties?type=apartment">Modern Apartments</Link></li>
                <li><Link to="/properties?type=penthouse">Skyline Penthouses</Link></li>
                <li><Link to="/properties?city=Faisalabad">Faisalabad Listings</Link></li>
              </ul>
            </div>

            {/* Column 4: Head Office & Newsletter */}
            <div className="col-md-4 col-lg-3">
              <h4 className="footer-heading">Head Office</h4>
              <ul className="list-unstyled text-white-50 small mb-4">
                <li className="mb-2 d-flex align-items-start gap-2">
                  <EnvironmentOutlined className="text-orange mt-1" />
                  <span>Kohinoor Plaza I, Jaranwala Road, Faisalabad</span>
                </li>
                <li className="mb-2 d-flex align-items-center gap-2">
                  <PhoneOutlined className="text-orange" />
                  <span>+92 300 0200340</span>
                </li>
                <li className="d-flex align-items-center gap-2">
                  <MailOutlined className="text-orange" />
                  <span>info@villa.co</span>
                </li>
              </ul>

              {/* Mini Property Alert Form */}
              <form onSubmit={handleSubscribe} className="newsletter-box">
                <input
                  type="email"
                  placeholder="Get new listing alerts..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" aria-label="Subscribe">
                  <SendOutlined />
                </button>
              </form>
            </div>
          </div>

          {/* Bottom Copyright Bar */}
          <div className="footer-bottom-bar d-flex flex-column flex-md-row justify-content-between align-items-center small text-white-50 gap-2">
            <p className="mb-0">
              © 2026 <strong className="text-white">Villa Agency</strong>. All rights reserved.
            </p>
            <p className="mb-0">
              Designed &amp; Engineered by <strong className="text-orange">Visual Tech Institute</strong>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}