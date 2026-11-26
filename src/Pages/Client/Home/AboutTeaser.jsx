import { Link } from 'react-router-dom';
import {
  SafetyCertificateOutlined,
  BankOutlined,
  VideoCameraOutlined,
  AuditOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';

const trustFeatures = [
  {
    icon: <SafetyCertificateOutlined />,
    title: '100% Verified Titles',
    desc: 'Every property passes strict legal & NOC clearance before listing.',
  },
  {
    icon: <AuditOutlined />,
    title: 'Zero Hidden Charges',
    desc: 'Direct owner-to-buyer transparent pricing with clear agreements.',
  },
  {
    icon: <VideoCameraOutlined />,
    title: 'Live Virtual Tours',
    desc: 'Inspect homes remotely from anywhere via scheduled video walkthroughs.',
  },
  {
    icon: <BankOutlined />,
    title: 'Bank & Installment Plans',
    desc: 'Flexible payment structures and complete bank transfer assistance.',
  },
];

export default function AboutTeaser() {
  return (
    <section className="about-teaser-section py-5 my-4" aria-labelledby="aboutTeaserHeading">
      <div className="container py-lg-4">
        <div className="row g-5 align-items-center">
          {/* Left Column: Image + Floating Verification Card */}
          <div className="col-lg-6" data-aos="fade-right">
            <div className="about-image-stack position-relative">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
                alt="Modern Luxury Villa Architecture"
                className="img-fluid rounded-4 shadow-lg main-about-img"
                loading="lazy"
              />

              {/* Floating Trust Card */}
              <div className="floating-trust-badge bg-white p-4 rounded-4 shadow">
                <div className="d-flex align-items-center gap-3">
                  <div className="trust-icon-box">
                    <SafetyCertificateOutlined />
                  </div>
                  <div>
                    <h3 className="h6 fw-bold mb-1 text-dark">Legally Verified</h3>
                    <p className="small text-muted mb-0">
                      Registry &amp; NOC Checked Listings
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Content & 4 Pillars */}
          <div className="col-lg-6" data-aos="fade-left">
            <span className="section-subtitle">| WHO WE ARE</span>
            <h2 id="aboutTeaserHeading" className="section-title mb-3">
              Redefining Modern Real Estate With Complete Transparency
            </h2>
            <p className="text-muted mb-4">
              Operating out of Faisalabad with prime residential portfolios in Toronto and Melbourne, Villa Agency removes middleman guesswork. Whether you are buying a family villa or investing in a skyline penthouse, every step is backed by verified documentation.
            </p>

            {/* 2x2 Feature Grid */}
            <div className="row g-3 mb-4">
              {trustFeatures.map((item, idx) => (
                <div key={idx} className="col-sm-6">
                  <div className="trust-mini-card p-3 p-xl-4 rounded-4 h-100">
                    <div className="mini-icon fs-4 mb-2">{item.icon}</div>
                    <h3 className="h6 fw-bold mb-1 card-title-text">{item.title}</h3>
                    <p className="small card-desc-text mb-0">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="d-flex flex-wrap align-items-center gap-3 pt-2">
              <Link to="/about" className="btn-dark-pill px-4 py-3">
                More About Us <ArrowRightOutlined className="ms-2" />
              </Link>
              <Link to="/properties" className="btn-outline-pill px-4 py-3">
                Browse Listings
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}