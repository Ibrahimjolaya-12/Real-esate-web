import { useRef, useState } from 'react';
import { Carousel, Rate } from 'antd';
import {
  CheckCircleFilled,
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons';

const reviewsData = [
  {
    id: 1,
    name: 'Ahmed Tariq',
    initials: 'AT',
    location: 'Canal Road, Faisalabad',
    propertyBought: 'Executive Luxury Villa',
    rating: 5,
    quote:
      'Every legal document and NOC was verified before we even sat down for the token. Zero hidden agent commissions and smooth bank transfer.',
  },
  {
    id: 2,
    name: 'Sarah Khan',
    initials: 'SK',
    location: 'Yorkville, Toronto',
    propertyBought: 'Contemporary Smart Villa',
    rating: 5,
    quote:
      'Booked a live virtual video walkthrough while traveling and finalized my home within ten days. Their team shared exact floor plans upfront.',
  },
  {
    id: 3,
    name: 'Marcus Reid',
    initials: 'MR',
    location: 'Southbank, Melbourne',
    propertyBought: 'Skyline River Penthouse',
    rating: 5,
    quote:
      'The installment calculator matched the actual developer payment schedule down to the dollar. Honest consultants who actually listen.',
  },
  {
    id: 4,
    name: 'Zainab Mahmood',
    initials: 'ZM',
    location: 'Kohinoor City, Faisalabad',
    propertyBought: 'Luxury High-Rise Apartment',
    rating: 5,
    quote:
      'From site visit to final registry paperwork, everything was handled professionally without any last-minute price surprises.',
  },
  {
    id: 5,
    name: 'Daniel Brooks',
    initials: 'DB',
    location: 'Harbourfront, Toronto',
    propertyBought: 'Lakeview Modern Condo',
    rating: 5,
    quote:
      'Clear floor breakdowns, transparent monthly breakdown, and fast replies whenever I had questions about building amenities.',
  },
  {
    id: 6,
    name: 'Hina Siddiqui',
    initials: 'HS',
    location: 'Toorak, Melbourne',
    propertyBought: 'Duplex Sky Penthouse',
    rating: 5,
    quote:
      'They helped us compare two penthouses side by side with real maintenance costs instead of sales fluff. Truly reliable advisors.',
  },
];

export default function Testimonials() {
  const carouselRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const total = reviewsData.length;
  // Desktop (3 visible cards): index 0 = left, index 1 = center, index 2 = right
  const centerIndex = (currentSlide + 1) % total;

  const handleBeforeChange = (_, nextSlide) => {
    setCurrentSlide(nextSlide);
  };

  return (
    <section className="testimonials-section py-5 bg-light" aria-labelledby="testimonialsHeading">
      <div className="container py-lg-4">
        <div className="text-center mb-5" data-aos="fade-up">
          <span className="section-subtitle">| CLIENT STORIES</span>
          <h2 id="testimonialsHeading" className="section-title">
            Trusted By Homeowners &amp; Investors
          </h2>
        </div>

        {/* Carousel + Left/Right Side Arrows */}
        <div className="reviews-slider-wrapper position-relative" data-aos="fade-up">
          <button
            type="button"
            className="slider-side-arrow arrow-left"
            onClick={() => carouselRef.current?.prev()}
            aria-label="Previous Reviews"
          >
            <LeftOutlined />
          </button>

          <button
            type="button"
            className="slider-side-arrow arrow-right"
            onClick={() => carouselRef.current?.next()}
            aria-label="Next Reviews"
          >
            <RightOutlined />
          </button>

          <Carousel
            ref={carouselRef}
            dots
            infinite
            speed={500}
            slidesToShow={3}
            slidesToScroll={1}
            beforeChange={handleBeforeChange}
            responsive={[
              {
                breakpoint: 992,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1,
                },
              },
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                },
              },
            ]}
          >
            {reviewsData.map((item, idx) => {
              const isCenterCard = idx === centerIndex;

              return (
                <div key={item.id} className="review-slide-item">
                  <article
                    className={`review-card p-4 rounded-4 h-100 d-flex flex-column ${
                      isCenterCard ? 'is-center' : ''
                    }`}
                  >
                    <div className="d-flex justify-content-between align-items-center mb-3 gap-2">
                      <Rate
                        disabled
                        defaultValue={item.rating}
                        className="custom-review-rate"
                      />
                      <span className="verified-tag">
                        <CheckCircleFilled className="me-1" /> Verified Buyer
                      </span>
                    </div>

                    <p className="review-quote mb-4 flex-grow-1">"{item.quote}"</p>

                    <div className="d-flex align-items-center gap-3 pt-3 reviewer-footer">
                      <div className="reviewer-avatar">{item.initials}</div>
                      <div>
                        <h3 className="h6 fw-bold mb-0 reviewer-name">{item.name}</h3>
                        <small className="d-block reviewer-property">{item.propertyBought}</small>
                        <small className="fw-medium reviewer-location">{item.location}</small>
                      </div>
                    </div>
                  </article>
                </div>
              );
            })}
          </Carousel>
        </div>
      </div>
    </section>
  );
}