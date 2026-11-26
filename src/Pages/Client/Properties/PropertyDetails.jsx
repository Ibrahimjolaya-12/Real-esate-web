import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { message } from 'antd';
import {
  HomeOutlined,
  EnvironmentOutlined,
  CheckCircleFilled,
  CalendarOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';
import { propertiesData } from '../../../Data/propertiesData';
import PropertyCard from '../Home/PropertyCard';

export default function PropertyDetails() {
  const { id } = useParams();
  const property = propertiesData?.find((item) => item.id === id);

  const [activeImage, setActiveImage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    tourType: 'In-Person Visit',
  });

  useEffect(() => {
    if (property) {
      setActiveImage(property.image);
    }
  }, [property]);

  if (!property) {
    return (
      <div className="container py-5 text-center my-5">
        <h2 className="fw-bold mb-3">Property Not Found</h2>
        <p className="text-muted mb-4">This listing may have been sold or removed.</p>
        <Link to="/properties" className="btn btn-dark rounded-pill px-4 py-2">
          Back to All Properties
        </Link>
      </div>
    );
  }

  const relatedProperties = propertiesData
    .filter((item) => item.id !== property.id)
    .slice(0, 3);

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    message.success(`Viewing request sent for ${property.title}! Our agent will call you shortly.`);
    setFormData({ name: '', phone: '', date: '', tourType: 'In-Person Visit' });
  };

  return (
    <div className="property-details-page">
      {/* Top Breadcrumb Bar */}
      <div className="bg-light border-bottom py-3">
        <div className="container d-flex flex-wrap justify-content-between align-items-center gap-2">
          <div className="small">
            <Link to="/" className="text-muted text-decoration-none"><HomeOutlined /> Home</Link>
            <span className="mx-2 text-muted">/</span>
            <Link to="/properties" className="text-muted text-decoration-none">Properties</Link>
            <span className="mx-2 text-muted">/</span>
            <span className="text-orange fw-semibold">{property.title}</span>
          </div>
          <Link to="/properties" className="small fw-semibold text-dark text-decoration-none">
            <ArrowLeftOutlined className="me-1" /> Back to Listings
          </Link>
        </div>
      </div>

      {/* Main Details Content */}
      <section className="py-5">
        <div className="container">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4 gap-3">
            <div>
              <div className="d-flex align-items-center gap-2 mb-2">
                <span className="badge-category">{property.categoryLabel}</span>
                <span className="text-muted small">
                  <EnvironmentOutlined className="text-orange me-1" /> {property.city}
                </span>
              </div>
              <h1 className="h2 fw-bold mb-0 text-dark">{property.title}</h1>
            </div>
            <div className="text-md-end">
              <small className="text-muted d-block">Asking Price</small>
              <span className="display-6 fw-bold text-orange">{property.priceFormatted}</span>
            </div>
          </div>

          <div className="row g-5">
            <div className="col-lg-8">
              <div className="gallery-box mb-4">
                <img
                  src={activeImage || property.image}
                  alt={property.title}
                  className="w-100 rounded-4 shadow-sm main-detail-img mb-3"
                />
                {property.gallery && property.gallery.length > 1 && (
                  <div className="d-flex gap-3">
                    {property.gallery.map((imgUrl, idx) => (
                      <img
                        key={idx}
                        src={imgUrl}
                        alt={`Thumbnail ${idx + 1}`}
                        className={`thumb-img rounded-3 ${activeImage === imgUrl ? 'active' : ''}`}
                        onClick={() => setActiveImage(imgUrl)}
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="specs-grid bg-light p-4 rounded-4 mb-4">
                <div className="row g-3 text-center">
                  <div className="col-4 col-md">
                    <small className="text-muted d-block">Bedrooms</small>
                    <strong className="fs-5 text-dark">{property.bedrooms}</strong>
                  </div>
                  <div className="col-4 col-md">
                    <small className="text-muted d-block">Bathrooms</small>
                    <strong className="fs-5 text-dark">{property.bathrooms}</strong>
                  </div>
                  <div className="col-4 col-md">
                    <small className="text-muted d-block">Total Area</small>
                    <strong className="fs-5 text-dark">{property.area}</strong>
                  </div>
                  <div className="col-6 col-md">
                    <small className="text-muted d-block">Floor</small>
                    <strong className="fs-5 text-dark">{property.floor}</strong>
                  </div>
                  <div className="col-6 col-md">
                    <small className="text-muted d-block">Parking</small>
                    <strong className="fs-5 text-dark">{property.parking}</strong>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h2 className="h4 fw-bold mb-3">Property Overview</h2>
                <p className="text-muted lh-lg">{property.description}</p>
              </div>

              {property.amenities && (
                <div>
                  <h2 className="h4 fw-bold mb-3">Key Features &amp; Amenities</h2>
                  <div className="row g-3">
                    {property.amenities.map((amenity, idx) => (
                      <div key={idx} className="col-sm-6 col-md-4">
                        <div className="p-3 rounded-3 border bg-white d-flex align-items-center gap-2 small fw-medium">
                          <CheckCircleFilled className="text-orange" /> {amenity}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="col-lg-4">
              <div className="booking-sidebar bg-white p-4 rounded-4 shadow border sticky-top" style={{ top: '100px' }}>
                <h3 className="h5 fw-bold mb-1">Schedule a Private Viewing</h3>
                <p className="small text-muted mb-4">
                  Book an in-person or live video tour for this property.
                </p>

                <form onSubmit={handleBookingSubmit}>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Full Name</label>
                    <input
                      type="text"
                      className="form-control custom-input"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Phone / WhatsApp</label>
                    <input
                      type="tel"
                      className="form-control custom-input"
                      placeholder="+92 300 0000000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Tour Type</label>
                    <select
                      className="form-select custom-input"
                      value={formData.tourType}
                      onChange={(e) => setFormData({ ...formData, tourType: e.target.value })}
                    >
                      <option value="In-Person Visit">In-Person Site Visit</option>
                      <option value="Live Video Tour">Live Video Call Walkthrough</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="form-label small fw-semibold">Preferred Date</label>
                    <input
                      type="date"
                      className="form-control custom-input"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      required
                    />
                  </div>

                  <button type="submit" className="btn-book-visit w-100">
                    <CalendarOutlined className="me-2" /> Confirm Viewing Request
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-5 border-top">
            <h2 className="h3 fw-bold mb-4">Similar Verified Properties</h2>
            <div className="row g-4">
              {relatedProperties.map((item) => (
                <div key={item.id} className="col-md-6 col-lg-4">
                  <PropertyCard property={item} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}