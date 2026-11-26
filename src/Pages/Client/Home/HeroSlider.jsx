import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Carousel } from 'antd';
import { ArrowRightOutlined, SearchOutlined, EnvironmentOutlined } from '@ant-design/icons';

const heroSlides = [
  {
    id: 'canal-road-villa',
    city: 'Faisalabad',
    country: 'Pakistan',
    tagline: 'GATED COMMUNITY LIVING',
    title: 'Modern Luxury Villas on Canal Road',
    price: '$1,250,000',
    specs: '6 Beds • 6 Baths • 545m²',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1920&q=80',
  },
  {
    id: 'yorkville-toronto-villa',
    city: 'Toronto',
    country: 'Canada',
    tagline: 'ARCHITECTURAL EXCELLENCE',
    title: 'Contemporary Smart Villas in Yorkville',
    price: '$1,850,000',
    specs: '5 Beds • 5 Baths • 450m²',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80',
  },
  {
    id: 'southbank-penthouse',
    city: 'Melbourne',
    country: 'Australia',
    tagline: 'SKYLINE PENTHOUSE COLLECTION',
    title: 'Panoramic River-View Penthouses',
    price: '$925,600',
    specs: '4 Beds • 4 Baths • 210m²',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&q=80',
  },
];

export default function HeroSlider() {
  const navigate = useNavigate();
  const [city, setCity] = useState('all');
  const [type, setType] = useState('all');
  const [budget, setBudget] = useState('all');

  useEffect(() => {
    heroSlides.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
      if (img.decode) {
        img.decode().catch(() => {});
      }
    });
  }, []);

  const handleQuickSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (city !== 'all') params.set('city', city);
    if (type !== 'all') params.set('type', type);
    if (budget !== 'all') params.set('budget', budget);
    navigate(`/properties?${params.toString()}`);
  };

  return (
    <section className="hero-section" aria-label="Featured Properties Slider">
      <Carousel
        autoplay
        autoplaySpeed={3200}
        speed={400}
        effect="fade"
        waitForAnimate={false}
        arrows
        dots={{ className: 'custom-hero-dots' }}
        pauseOnHover={false}
      >
        {heroSlides.map((slide, index) => (
          <div key={slide.id} className="hero-slide-wrapper">
            <div className="hero-slide-bg">
              <img
                src={slide.image}
                alt={slide.title}
                className="hero-slide-img"
                loading="eager"
                decoding="sync"
              />
              <div className="hero-overlay"></div>
              <div className="container hero-content-container">
                <div className="row align-items-center w-100 g-4">
                  <div className="col-lg-7 text-white">
                    <span className="location-pill">
                      <EnvironmentOutlined className="text-orange me-2" />
                      {slide.city}, <strong className="text-orange">{slide.country}</strong>
                    </span>
                    <p className="hero-tagline mb-2">{slide.tagline}</p>
                    {index === 0 ? (
                      <h1 className="hero-main-title mb-4">{slide.title}</h1>
                    ) : (
                      <h2 className="hero-main-title mb-4">{slide.title}</h2>
                    )}
                    <div className="d-flex flex-wrap gap-3">
                      <Link to={`/properties/${slide.id}`} className="btn-hero-primary">
                        Explore Property <ArrowRightOutlined className="ms-2" />
                      </Link>
                      <Link to="/contact" className="btn-hero-outline">
                        Book Virtual Tour
                      </Link>
                    </div>
                  </div>

                  <div className="col-lg-5 d-none d-lg-flex justify-content-end">
                    <div className="floating-deal-card">
                      <span className="badge-featured">Featured Listing</span>
                      <h3 className="h5 fw-bold text-dark mt-2 mb-1">{slide.city} Exclusive</h3>
                      <p className="text-muted small mb-3">{slide.specs}</p>
                      <div className="d-flex justify-content-between align-items-center pt-3 border-top">
                        <div>
                          <small className="text-muted d-block">Starting Price</small>
                          <span className="fs-4 fw-bold text-orange">{slide.price}</span>
                        </div>
                        <Link to={`/properties/${slide.id}`} className="card-arrow-btn" aria-label="View Property">
                          <ArrowRightOutlined />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>

      {/* Overlapping Quick Filter Search Bar */}
      <div className="container quick-search-wrapper">
        <div className="quick-search-box bg-white p-5 rounded-4 shadow-lg">
          <form onSubmit={handleQuickSearch} className="row g-3 align-items-end">
            <div className="col-md-3">
              <label htmlFor="heroCity" className="form-label small fw-bold text-uppercase text-muted mb-1">
                Location
              </label>
              <select
                id="heroCity"
                className="form-select custom-filter-select"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              >
                <option value="all">All Cities</option>
                <option value="Faisalabad">Faisalabad, Pakistan</option>
                <option value="Toronto">Toronto, Canada</option>
                <option value="Melbourne">Melbourne, Australia</option>
              </select>
            </div>

            <div className="col-md-3">
              <label htmlFor="heroType" className="form-label small fw-bold text-uppercase text-muted mb-1">
                Property Type
              </label>
              <select
                id="heroType"
                className="form-select custom-filter-select"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="villa">Luxury Villa</option>
                <option value="apartment">Apartment</option>
                <option value="penthouse">Penthouse</option>
              </select>
            </div>

            <div className="col-md-3">
              <label htmlFor="heroBudget" className="form-label small fw-bold text-uppercase text-muted mb-1">
                Max Budget
              </label>
              <select
                id="heroBudget"
                className="form-select custom-filter-select"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              >
                <option value="all">Any Price Range</option>
                <option value="500000">Up to $500,000</option>
                <option value="1000000">Up to $1,000,000</option>
                <option value="2000000">Up to $2,000,000</option>
              </select>
            </div>

            <div className="col-md-3">
              <button type="submit" className="btn-search-submit w-100">
                <SearchOutlined className="me-2" /> Search Properties
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}