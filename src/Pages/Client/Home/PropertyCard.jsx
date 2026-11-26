import { Link } from 'react-router-dom';
import { EnvironmentOutlined, ArrowRightOutlined } from '@ant-design/icons';

export default function PropertyCard({ property }) {
  if (!property) return null;

  return (
    <article className="property-card rounded-4 overflow-hidden h-100 d-flex flex-column bg-white">
      {/* Property Image + City Tag */}
      <div className="property-img-wrapper position-relative">
        <img
          src={property.image}
          className="w-100 property-img"
          alt={property.title}
          loading="lazy"
        />
        <span className="city-tag">
          <EnvironmentOutlined className="text-orange me-1" /> {property.city}
        </span>
      </div>

      {/* Card Body */}
      <div className="p-4 d-flex flex-column flex-grow-1">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className="property-badge">{property.categoryLabel}</span>
          <span className="property-price fs-5 fw-bold">{property.priceFormatted}</span>
        </div>

        <h3 className="h5 fw-bold mb-3 property-title">
          <Link to={`/properties/${property.id}`} className="text-decoration-none">
            {property.title}
          </Link>
        </h3>

        <ul className="list-unstyled property-specs d-flex flex-wrap gap-3 pb-3 mb-4 border-bottom">
          <li>Bedrooms: <strong>{property.bedrooms}</strong></li>
          <li>Bathrooms: <strong>{property.bathrooms}</strong></li>
          <li>Area: <strong>{property.area}</strong></li>
          <li>Floor: <strong>{property.floor}</strong></li>
          <li>Parking: <strong>{property.parking}</strong></li>
        </ul>

        <div className="mt-auto d-flex justify-content-between align-items-center">
          <Link to={`/properties/${property.id}`} className="btn-card-details">
            View Details <ArrowRightOutlined className="ms-1" />
          </Link>
          <Link to="/contact" className="schedule-link small fw-semibold">
            Schedule Visit
          </Link>
        </div>
      </div>
    </article>
  );
}