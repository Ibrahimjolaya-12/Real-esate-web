import { Link } from 'react-router-dom';
import { ArrowRightOutlined } from '@ant-design/icons';
import { propertiesData } from '../../../Data/propertiesData';
import PropertyCard from './PropertyCard';

export default function FeaturedProperties() {
  // Sirf featured: true wali top 3 properties nikalega
  const featuredList = propertiesData.filter((item) => item.featured).slice(0, 3);

  return (
    <section className="py-5 bg-light" aria-labelledby="featuredPropsHeading">
      <div className="container py-lg-4">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-5" data-aos="fade-up">
          <div>
            <span className="text-orange fw-bold small text-uppercase d-block mb-2" style={{ letterSpacing: '1.5px' }}>
              | FEATURED LISTINGS
            </span>
            <h2 id="featuredPropsHeading" className="fw-bold mb-0" style={{ fontSize: '36px', color: '#1e1e1e' }}>
              Handpicked Luxury Properties
            </h2>
          </div>

          <Link
            to="/properties"
            className="btn btn-dark rounded-pill px-4 py-2 fw-semibold mt-3 mt-md-0 d-inline-flex align-items-center"
          >
            View All Properties <ArrowRightOutlined className="ms-2" />
          </Link>
        </div>

        {/* Yahan PropertyCard use ho raha hai */}
        <div className="row g-4">
          {featuredList.map((property, index) => (
            <div key={property.id} className="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay={index * 150}>
              <PropertyCard property={property} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}