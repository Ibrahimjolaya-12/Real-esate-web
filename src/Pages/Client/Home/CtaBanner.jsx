import { Link } from 'react-router-dom';
import { CalendarOutlined, PhoneOutlined } from '@ant-design/icons';

export default function CtaBanner() {
  return (
    <section className="cta-section py-5" aria-label="Schedule Consultation">
      <div className="container">
        <div className="cta-box rounded-4 p-4 p-md-5 text-white position-relative overflow-hidden" data-aos="zoom-in">
          <div className="row align-items-center g-4 position-relative" style={{ zIndex: 2 }}>
            <div className="col-lg-7">
              <span className="text-orange fw-bold small text-uppercase d-block mb-2" style={{ letterSpacing: '1.5px' }}>
                | BOOK A PRIVATE VIEWING
              </span>
              <h2 className="fw-bold mb-3 display-6">
                Ready To Tour Your Next Home?
              </h2>
              <p className="text-white-50 mb-0">
                Schedule an in-person site visit or a live 1-on-1 video walkthrough with our senior property consultants.
              </p>
            </div>

            <div className="col-lg-5 d-flex flex-wrap justify-content-lg-end gap-3">
              <Link to="/contact" className="btn-cta-primary">
                <CalendarOutlined className="me-2" /> Schedule a Visit
              </Link>
              <a href="tel:+923000200340" className="btn-cta-secondary">
                <PhoneOutlined className="me-2" /> Call Agent
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}