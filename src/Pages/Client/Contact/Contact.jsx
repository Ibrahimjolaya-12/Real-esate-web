import { useState } from 'react';
import { Link } from 'react-router-dom';
import { message } from 'antd';
import {
  HomeOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined,
  ClockCircleOutlined,
  SendOutlined,
  CheckCircleFilled,
} from '@ant-design/icons';

const officeDesks = [
  {
    city: 'Faisalabad (HQ)',
    address: 'Kohinoor Plaza I, Jaranwala Road, Faisalabad',
    phone: '+92 300 0200340',
    hours: 'Mon – Sat: 10:00 AM – 8:00 PM',
  },
  {
    city: 'Toronto Desk',
    address: '42 Yorkville Avenue, Suite 300, Toronto, ON',
    phone: '+1 (416) 555-0198',
    hours: 'Mon – Fri: 9:00 AM – 6:00 PM',
  },
  {
    city: 'Melbourne Desk',
    address: '88 Southbank Blvd, Level 14, Melbourne, VIC',
    phone: '+61 3 9010 4421',
    hours: 'Mon – Fri: 9:00 AM – 6:00 PM',
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    interestType: 'Luxury Villa',
    preferredCity: 'Faisalabad',
    visitMode: 'In-Person Site Visit',
    notes: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    message.success(
      `Thank you, ${formData.fullName}! Our ${formData.preferredCity} advisor will contact you shortly.`
    );
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      interestType: 'Luxury Villa',
      preferredCity: 'Faisalabad',
      visitMode: 'In-Person Site Visit',
      notes: '',
    });
  };

  return (
    <div className="contact-page">
      {/* 1. Page Header Banner */}
      <section className="contact-banner text-center text-white">
        <div className="container" data-aos="fade-up">
          <div className="breadcrumb-pill d-inline-flex align-items-center gap-2 mb-3">
            <Link to="/" className="text-dark text-decoration-none fw-semibold">
              <HomeOutlined /> Home
            </Link>
            <span className="text-muted">/</span>
            <span className="text-orange fw-semibold">Contact Us</span>
          </div>
          <h1 className="display-5 fw-bold mb-2">Get In Touch With Our Advisors</h1>
          <p className="text-white-50 mb-0 mx-auto" style={{ maxWidth: '600px' }}>
            Book a private villa tour, request legal NOC verification details, or discuss custom installment plans.
          </p>
        </div>
      </section>

      {/* 2. Main Architectural Contact Section */}
      <section className="py-5 my-3">
        <div className="container">
          <div className="row g-5 align-items-start">
            {/* Left 5 Columns: Window-Style Contact Cards + Global Desks */}
            <div className="col-lg-5" data-aos="fade-right">
              <span className="section-subtitle">| DIRECT CHANNELS</span>
              <h2 className="section-title mb-3">Visit Or Reach Our Advisory Desk</h2>
              <p className="text-muted mb-4">
                Prefer a direct conversation? Walk into our Kohinoor Plaza headquarters or connect with our regional desks.
              </p>

              {/* Architectural Window-Pane Contact Cards */}
              <div className="d-flex flex-column gap-3 mb-4">
                <div className="window-info-card p-3 p-md-4 rounded-4 d-flex align-items-center gap-3">
                  <div className="window-icon-box">
                    <PhoneOutlined />
                  </div>
                  <div>
                    <small className="text-muted d-block">Direct Advisory Line</small>
                    <a href="tel:+923000200340" className="h6 fw-bold text-dark text-decoration-none mb-0">
                      +92 300 0200340
                    </a>
                  </div>
                </div>

                <div className="window-info-card p-3 p-md-4 rounded-4 d-flex align-items-center gap-3">
                  <div className="window-icon-box">
                    <MailOutlined />
                  </div>
                  <div>
                    <small className="text-muted d-block">Official Inquiries &amp; NOC Desk</small>
                    <a href="mailto:info@villa.co" className="h6 fw-bold text-dark text-decoration-none mb-0">
                      info@villa.co
                    </a>
                  </div>
                </div>

                <div className="window-info-card p-3 p-md-4 rounded-4 d-flex align-items-center gap-3">
                  <div className="window-icon-box">
                    <EnvironmentOutlined />
                  </div>
                  <div>
                    <small className="text-muted d-block">Headquarters Location</small>
                    <span className="h6 fw-bold text-dark mb-0 d-block">
                      Kohinoor Plaza I, Jaranwala Road, Faisalabad
                    </span>
                  </div>
                </div>
              </div>

              {/* Regional Offices Mini Stack */}
              <div className="regional-desks bg-light p-4 rounded-4 border">
                <h3 className="h6 fw-bold text-uppercase mb-3" style={{ letterSpacing: '1px' }}>
                  International &amp; Local Desks
                </h3>
                <div className="d-flex flex-column gap-3">
                  {officeDesks.map((desk) => (
                    <div key={desk.city} className="pb-3 border-bottom last-no-border">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <strong className="text-dark small">{desk.city}</strong>
                        <span className="text-orange small fw-semibold">{desk.phone}</span>
                      </div>
                      <p className="text-muted small mb-1">{desk.address}</p>
                      <small className="text-secondary">
                        <ClockCircleOutlined className="me-1" /> {desk.hours}
                      </small>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 7 Columns: Architectural Villa/Apartment Roof-Framed Form */}
            <div className="col-lg-7" data-aos="fade-left">
              <div className="villa-house-form-wrapper">
                {/* Architectural Gable Roof Pediment on Top of Form */}
                <div className="form-roof-header" aria-hidden="true">
                  <svg viewBox="0 0 800 95" preserveAspectRatio="none" className="form-roof-svg">
                    {/* Dark Architectural Roof */}
                    <polygon points="0,95 400,10 800,95" fill="#1e1e1e" />
                    {/* Orange Eave Accent Line */}
                    <polyline
                      points="0,92 400,7 800,92"
                      fill="none"
                      stroke="#f35525"
                      strokeWidth="5"
                    />
                  </svg>
                  <div className="form-roof-emblem">
                    <HomeOutlined />
                  </div>
                </div>

                {/* Main House Facade Form Body */}
                <div className="villa-form-body bg-white p-4 p-md-5 shadow-lg">
                  <div className="text-center mb-4">
                    <span className="badge-consultation">PRIVATE CONSULTATION</span>
                    <h3 className="h4 fw-bold text-dark mt-2 mb-1">
                      Schedule A Visit Or Request Callback
                    </h3>
                    <p className="text-muted small mb-0">
                      Fill in your preferences below—an assigned property specialist will respond within 2 hours.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label htmlFor="fullName" className="form-label small fw-bold text-dark">
                          Full Name *
                        </label>
                        <input
                          id="fullName"
                          name="fullName"
                          type="text"
                          className="form-control villa-input"
                          placeholder="e.g. John Doe"
                          value={formData.fullName}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="col-md-6">
                        <label htmlFor="phone" className="form-label small fw-bold text-dark">
                          Phone / WhatsApp *
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          className="form-control villa-input"
                          placeholder="+1 000 0000000"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="col-md-6">
                        <label htmlFor="email" className="form-label small fw-bold text-dark">
                          Email Address *
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          className="form-control villa-input"
                          placeholder="name@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="col-md-6">
                        <label htmlFor="interestType" className="form-label small fw-bold text-dark">
                          Property Category
                        </label>
                        <select
                          id="interestType"
                          name="interestType"
                          className="form-select villa-input"
                          value={formData.interestType}
                          onChange={handleChange}
                        >
                          <option value="Luxury Villa">Luxury Villa</option>
                          <option value="Modern Apartment">Modern Apartment</option>
                          <option value="Skyline Penthouse">Skyline Penthouse</option>
                          <option value="Investment / Installment Plan">Investment / Installment Plan</option>
                        </select>
                      </div>

                      <div className="col-md-6">
                        <label htmlFor="preferredCity" className="form-label small fw-bold text-dark">
                          Preferred City
                        </label>
                        <select
                          id="preferredCity"
                          name="preferredCity"
                          className="form-select villa-input"
                          value={formData.preferredCity}
                          onChange={handleChange}
                        >
                          <option value="Faisalabad">Faisalabad, Pakistan</option>
                          <option value="Toronto">Toronto, Canada</option>
                          <option value="Melbourne">Melbourne, Australia</option>
                        </select>
                      </div>

                      <div className="col-md-6">
                        <label htmlFor="visitMode" className="form-label small fw-bold text-dark">
                          Viewing Preference
                        </label>
                        <select
                          id="visitMode"
                          name="visitMode"
                          className="form-select villa-input"
                          value={formData.visitMode}
                          onChange={handleChange}
                        >
                          <option value="In-Person Site Visit">In-Person Site Visit</option>
                          <option value="Live 4K Video Walkthrough">Live 4K Video Walkthrough</option>
                          <option value="Office Consultation">Office Consultation (Kohinoor Plaza)</option>
                        </select>
                      </div>

                      <div className="col-12">
                        <label htmlFor="notes" className="form-label small fw-bold text-dark">
                          Budget Range or Specific Requirements
                        </label>
                        <textarea
                          id="notes"
                          name="notes"
                          rows="4"
                          className="form-control villa-input"
                          placeholder="Tell us about your desired bedrooms, budget, or installment preferences..."
                          value={formData.notes}
                          onChange={handleChange}
                        ></textarea>
                      </div>

                      <div className="col-12 pt-2">
                        <button type="submit" className="btn-villa-submit w-100">
                          <SendOutlined className="me-2" /> Send Inquiry &amp; Book Visit
                        </button>
                      </div>
                    </div>
                  </form>

                  {/* Architectural Foundation Plinth Footer inside Form */}
                  <div className="form-foundation-bar mt-4 pt-3 border-top d-flex flex-wrap justify-content-center gap-4 small text-muted">
                    <span>
                      <CheckCircleFilled className="text-orange me-1" /> 100% Confidential
                    </span>
                    <span>
                      <CheckCircleFilled className="text-orange me-1" /> Zero Spam Guarantee
                    </span>
                    <span>
                      <CheckCircleFilled className="text-orange me-1" /> Direct Advisor Reply
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Full-Width Interactive Map (Kohinoor Plaza I, Faisalabad) */}
          <div className="map-wrapper mt-5 pt-4" data-aos="fade-up">
            <div className="rounded-4 overflow-hidden shadow-sm border">
              <iframe
                title="Villa Agency Head Office - Kohinoor Plaza I Faisalabad"
                src="https://www.google.com/maps?q=Kohinoor+City+Faisalabad&output=embed"
                width="100%"
                height="400"
                style={{ border: 0, display: 'block' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}