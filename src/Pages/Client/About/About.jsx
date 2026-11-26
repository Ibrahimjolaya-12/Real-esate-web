import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  HomeOutlined,
  SafetyCertificateOutlined,
  DollarCircleOutlined,
  GlobalOutlined,
  CheckCircleFilled,
  LinkedinFilled,
  PhoneOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';
import CtaBanner from '../Home/CtaBanner';

const BANNER_IMAGE =
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1920&q=80';

const coreValues = [
  {
    icon: <SafetyCertificateOutlined />,
    title: 'Strict Legal Verification',
    desc: 'Every villa, apartment, and penthouse goes through a 14-point registry, title, and NOC audit before appearing on our platform.',
  },
  {
    icon: <DollarCircleOutlined />,
    title: 'Zero Hidden Commissions',
    desc: 'We operate on a flat, upfront advisory fee with direct owner-to-buyer contracts—eliminating middleman price inflation.',
  },
  {
    icon: <GlobalOutlined />,
    title: 'Cross-Border Virtual Desk',
    desc: 'Whether you are in Faisalabad or overseas, book live 4K video walkthroughs and handle digital documentation securely.',
  },
];

const buyingSteps = [
  {
    step: '01',
    title: 'Smart Shortlisting',
    desc: 'Filter properties by city, budget, and installment plan using our live tools.',
  },
  {
    step: '02',
    title: 'Site or Live Video Tour',
    desc: 'Visit the property in person with an assigned consultant or join a live video call.',
  },
  {
    step: '03',
    title: 'Legal & NOC Audit',
    desc: 'Our legal desk verifies ownership transfer papers and clears all utility/society dues.',
  },
  {
    step: '04',
    title: 'Bank Transfer & Handover',
    desc: 'Complete transparent bank-verified payment and receive your keys & registry.',
  },
];

const consultants = [
  {
    name: 'Usman Tariq',
    role: 'Managing Director — Pakistan',
    city: 'Faisalabad Office',
    experience: '10+ Yrs in Luxury Residential',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Elena Vance',
    role: 'Senior Property Advisor',
    city: 'Toronto Desk',
    experience: '8+ Yrs in Smart Homes & Condos',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Liam Carter',
    role: 'Penthouse & Investment Lead',
    city: 'Melbourne Desk',
    experience: '9+ Yrs in High-Rise Portfolios',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
  },
];

export default function AboutUs() {
  const bannerRef = useRef(null);
  const [parallaxY, setParallaxY] = useState(0);

  // Scroll ke sath background image ko smooth move karne ke liye
  useEffect(() => {
    let rafId = null;

    const handleScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        const bannerEl = bannerRef.current;
        if (bannerEl) {
          const rect = bannerEl.getBoundingClientRect();
          const bannerHeight = bannerEl.offsetHeight || 1;
          // Jab banner screen ke andar ya upar scroll ho raha ho tab smooth offset
          if (rect.bottom > 0 && rect.top < window.innerHeight) {
            const progress = Math.min(Math.max(-rect.top / bannerHeight, 0), 1);
            setParallaxY(progress * 110); // 0px se 110px smooth movement
          }
        }
        rafId = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="about-page">
      {/* 1. Full-Impact 98vh Page Header Banner with Scroll Parallax */}
      <section ref={bannerRef} className="about-banner text-center text-white">
        <div
          className="parallax-bg-layer"
          style={{
            backgroundImage: `url(${BANNER_IMAGE})`,
            transform: `translate3d(0, ${parallaxY}px, 0) scale(1.12)`,
          }}
          aria-hidden="true"
        />
        <div className="parallax-dark-overlay" aria-hidden="true" />

        <div className="container position-relative z-2" data-aos="fade-up">
          <div className="breadcrumb-pill d-inline-flex align-items-center gap-2 mb-3">
            <Link to="/" className="text-dark text-decoration-none fw-semibold">
              <HomeOutlined /> Home
            </Link>
            <span className="text-muted">/</span>
            <span className="text-orange fw-semibold">About Us</span>
          </div>
          <h1 className="display-4 fw-bold mb-3">Built On Trust &amp; Verified Titles</h1>
          <p className="text-white-50 mb-0 mx-auto fs-6" style={{ maxWidth: '640px' }}>
            Connecting families and global investors with legally cleared luxury homes across Faisalabad, Toronto, and Melbourne.
          </p>
        </div>
      </section>

      {/* 2. Our Story & Mission */}
      <section className="py-5 my-3">
        <div className="container py-lg-3">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6" data-aos="fade-right">
              <div className="story-img-box position-relative">
                <img
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80"
                  alt="Villa Agency Headquarters Architecture"
                  className="img-fluid rounded-4 shadow-lg w-100"
                  style={{ height: '450px', objectFit: 'cover' }}
                  loading="lazy"
                />
                <div className="hq-tag bg-dark text-white p-3 px-4 rounded-4 shadow">
                  <small className="text-orange fw-bold text-uppercase d-block">Headquarters</small>
                  <span className="fw-semibold">Kohinoor Plaza I, Faisalabad</span>
                </div>
              </div>
            </div>

            <div className="col-lg-6" data-aos="fade-left">
              <span className="section-subtitle">| OUR STORY</span>
              <h2 className="section-title mb-3">
                Fixing What Is Broken In Traditional Real Estate
              </h2>
              <p className="text-muted mb-3">
                Buying a house or investing in property often comes with inflated broker margins, unclear ownership files, and unverified promises. Villa Agency was founded to replace guesswork with complete legal and financial clarity.
              </p>
              <p className="text-muted mb-4">
                Starting from our head office at Kohinoor Plaza in Faisalabad and expanding to dedicated advisory desks in Toronto and Melbourne, we curate only vetted villas, modern apartments, and skyline penthouses.
              </p>

              <ul className="list-unstyled mb-4">
                <li className="mb-2 d-flex align-items-center gap-2 fw-medium text-dark">
                  <CheckCircleFilled className="text-orange" /> Direct developer &amp; verified owner inventory
                </li>
                <li className="mb-2 d-flex align-items-center gap-2 fw-medium text-dark">
                  <CheckCircleFilled className="text-orange" /> Transparent installment plans &amp; bank financing
                </li>
                <li className="d-flex align-items-center gap-2 fw-medium text-dark">
                  <CheckCircleFilled className="text-orange" /> End-to-end registry and possession support
                </li>
              </ul>

              <Link to="/properties" className="btn-dark-pill px-4 py-3">
                Explore Verified Listings <ArrowRightOutlined className="ms-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Values (3 Pillars) */}
      <section className="py-5 bg-light">
        <div className="container py-lg-3">
          <div className="text-center mb-5" data-aos="fade-up">
            <span className="section-subtitle">| WHY VILLA AGENCY</span>
            <h2 className="section-title">Three Standards We Never Compromise On</h2>
          </div>

          <div className="row g-4">
            {coreValues.map((val, idx) => (
              <div key={idx} className="col-md-4" data-aos="fade-up" data-aos-delay={idx * 150}>
                <div className="value-card bg-white p-4 p-lg-5 rounded-4 h-100 border">
                  <div className="value-icon mb-4">{val.icon}</div>
                  <h3 className="h5 fw-bold mb-3 text-dark">{val.title}</h3>
                  <p className="text-muted mb-0 small lh-lg">{val.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. 4-Step Transparent Buying Process */}
      <section className="py-5">
        <div className="container py-lg-3">
          <div className="text-center mb-5" data-aos="fade-up">
            <span className="section-subtitle">| HOW IT WORKS</span>
            <h2 className="section-title">From Shortlist To Keys In 4 Clear Steps</h2>
          </div>

          <div className="row g-4">
            {buyingSteps.map((item, idx) => (
              <div key={item.step} className="col-sm-6 col-lg-3" data-aos="fade-up" data-aos-delay={idx * 100}>
                <div className="step-card p-4 rounded-4 h-100 position-relative">
                  <span className="step-number">{item.step}</span>
                  <h3 className="h5 fw-bold mt-3 mb-2 text-dark">{item.title}</h3>
                  <p className="text-muted small mb-0">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Senior Consultants Team */}
      <section className="py-5 bg-light">
        <div className="container py-lg-3">
          <div className="text-center mb-5" data-aos="fade-up">
            <span className="section-subtitle">| ADVISORY TEAM</span>
            <h2 className="section-title">Meet Your Property Consultants</h2>
          </div>

          <div className="row g-4">
            {consultants.map((person, idx) => (
              <div key={person.name} className="col-md-4" data-aos="fade-up" data-aos-delay={idx * 150}>
                <article className="agent-card bg-white rounded-4 overflow-hidden border h-100">
                  <div className="agent-img-wrap">
                    <img
                      src={person.image}
                      alt={person.name}
                      className="w-100"
                      style={{ height: '300px', objectFit: 'cover', objectPosition: 'top' }}
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <span className="city-pill small fw-bold text-orange">{person.city}</span>
                    <h3 className="h5 fw-bold mt-1 mb-1 text-dark">{person.name}</h3>
                    <p className="text-muted small mb-2">{person.role}</p>
                    <p className="small text-secondary pb-3 mb-3 border-bottom">{person.experience}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <Link to="/contact" className="text-dark fw-semibold small text-decoration-none hover-orange">
                        <PhoneOutlined className="text-orange me-1" /> Book Consultation
                      </Link>
                      <a href="#linkedin" className="text-muted fs-5" aria-label={`${person.name} LinkedIn`}>
                        <LinkedinFilled />
                      </a>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reusable Bottom CTA Banner */}
      <CtaBanner />
    </div>
  );
}