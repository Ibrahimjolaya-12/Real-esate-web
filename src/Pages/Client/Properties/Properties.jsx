import { useState, useEffect, useMemo, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Input, Select, Empty, Button, Drawer, Pagination, Badge } from 'antd';
import {
  SearchOutlined,
  ReloadOutlined,
  HomeOutlined,
  SlidersOutlined,
  CheckOutlined,
} from '@ant-design/icons';
import { propertiesData } from '../../../Data/propertiesData';
import PropertyCard from '../Home/PropertyCard';

const BANNER_IMAGE =
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80';

const categoryTabs = [
  { key: 'all', label: 'All Properties' },
  { key: 'villa', label: 'Luxury Villas' },
  { key: 'apartment', label: 'Apartments' },
  { key: 'penthouse', label: 'Penthouses' },
];

const PAGE_SIZE = 6; // Har page par sirf 6 cards

export default function Properties() {
  const [searchParams, setSearchParams] = useSearchParams();
  const bannerRef = useRef(null);
  const gridTopRef = useRef(null);

  const [parallaxY, setParallaxY] = useState(0);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  // Filter States
  const [selectedType, setSelectedType] = useState(searchParams.get('type') || 'all');
  const [selectedCity, setSelectedCity] = useState(searchParams.get('city') || 'all');
  const [maxBudget, setMaxBudget] = useState(searchParams.get('budget') || 'all');
  const [minBeds, setMinBeds] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // 88vh Banner Scroll Parallax
  useEffect(() => {
    let rafId = null;

    const handleScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        const el = bannerRef.current;
        if (el) {
          const rect = el.getBoundingClientRect();
          const height = el.offsetHeight || 1;
          if (rect.bottom > 0 && rect.top < window.innerHeight) {
            const progress = Math.min(Math.max(-rect.top / height, 0), 1);
            setParallaxY(progress * 100);
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

  // Sync URL parameters when Navbar sub-links or Hero search are clicked
  useEffect(() => {
    setSelectedType(searchParams.get('type') || 'all');
    setSelectedCity(searchParams.get('city') || 'all');
    setMaxBudget(searchParams.get('budget') || 'all');
    setCurrentPage(1);
  }, [searchParams]);

  const getBannerTitle = () => {
    if (selectedType === 'villa') return 'Luxury Villas For Sale';
    if (selectedType === 'apartment') return 'Modern Apartments';
    if (selectedType === 'penthouse') return 'Skyline Penthouses';
    return 'Explore All Properties';
  };

  const handleCategoryChange = (typeKey) => {
    setSelectedType(typeKey);
    setCurrentPage(1);
    const nextParams = new URLSearchParams(searchParams);
    if (typeKey === 'all') {
      nextParams.delete('type');
    } else {
      nextParams.set('type', typeKey);
    }
    setSearchParams(nextParams);
  };

  const handleResetFilters = () => {
    setSelectedType('all');
    setSelectedCity('all');
    setMaxBudget('all');
    setMinBeds('all');
    setSortBy('default');
    setSearchQuery('');
    setCurrentPage(1);
    setSearchParams({});
  };

  // Count active drawer filters for badge
  const activeFilterCount = [
    selectedCity !== 'all',
    maxBudget !== 'all',
    minBeds !== 'all',
    sortBy !== 'default',
    searchQuery.trim() !== '',
  ].filter(Boolean).length;

  // Filtered & Sorted list
  const filteredProperties = useMemo(() => {
    return propertiesData
      .filter((item) => {
        const matchType = selectedType === 'all' || item.type === selectedType;
        const matchCity = selectedCity === 'all' || item.city === selectedCity;
        const matchBudget = maxBudget === 'all' || item.price <= Number(maxBudget);
        const matchBeds = minBeds === 'all' || item.bedrooms >= Number(minBeds);
        const matchSearch =
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.city.toLowerCase().includes(searchQuery.toLowerCase());

        return matchType && matchCity && matchBudget && matchBeds && matchSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        return 0;
      });
  }, [selectedType, selectedCity, maxBudget, minBeds, sortBy, searchQuery]);

  // Slice 6 cards for current page
  const paginatedProperties = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    return filteredProperties.slice(startIndex, startIndex + PAGE_SIZE);
  }, [filteredProperties, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (gridTopRef.current) {
      gridTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="properties-page">
      {/* 1. 88vh Parallax Page Header Banner */}
      <section ref={bannerRef} className="page-banner text-center text-white">
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
            <span className="text-orange fw-semibold text-capitalize">
              {selectedType === 'all' ? 'Properties' : `${selectedType}s`}
            </span>
          </div>
          <h1 className="display-4 fw-bold mb-3">{getBannerTitle()}</h1>
          <p className="text-white-50 mb-0 mx-auto fs-6" style={{ maxWidth: '620px' }}>
            Verified residential listings across Faisalabad, Toronto &amp; Melbourne with transparent pricing and NOC clearance
          </p>
        </div>
      </section>

      {/* 2. Main Listings Section */}
      <section ref={gridTopRef} className="py-5" style={{ scrollMarginTop: '95px' }}>
        <div className="container">
          {/* Sleek Action Header: Category Tabs on Left + Unique Filter Drawer Trigger on Right */}
          <div
            className="properties-control-bar bg-white p-3 p-md-4 rounded-4 shadow-sm border mb-4 d-flex flex-wrap justify-content-between align-items-center gap-3"
            data-aos="fade-up"
          >
            {/* Left: Category Switcher Pills */}
            <div className="d-flex flex-wrap gap-2">
              {categoryTabs.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  className={`category-pill-btn ${selectedType === tab.key ? 'active' : ''}`}
                  onClick={() => handleCategoryChange(tab.key)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Right: Unique Slide-Over Filter Button */}
            <div className="d-flex align-items-center gap-2 ms-auto">
              {(activeFilterCount > 0 || selectedType !== 'all') && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="btn btn-sm btn-light rounded-pill px-3 py-2 text-muted fw-semibold border"
                >
                  <ReloadOutlined className="me-1" /> Reset
                </button>
              )}

              <Badge count={activeFilterCount} color="#f35525" offset={[-4, 4]}>
                <button
                  type="button"
                  className="filter-drawer-trigger-btn"
                  onClick={() => setFilterDrawerOpen(true)}
                >
                  <span className="filter-icon-circle">
                    <SlidersOutlined />
                  </span>
                  <span>Filters &amp; Sort</span>
                </button>
              </Badge>
            </div>
          </div>

          {/* Top Bar Above Cards: Results Count (Left) + Pagination (Right) */}
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4 px-1">
            <div className="small text-muted">
              Showing{' '}
              <strong className="text-dark">
                {filteredProperties.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1}–
                {Math.min(currentPage * PAGE_SIZE, filteredProperties.length)}
              </strong>{' '}
              of <strong className="text-dark">{filteredProperties.length}</strong> verified properties
              <span className="mx-2">•</span>
              <span>
                Page {currentPage} of {Math.max(1, Math.ceil(filteredProperties.length / PAGE_SIZE))}
              </span>
            </div>

            {filteredProperties.length > PAGE_SIZE && (
              <div className="pagination-pill-wrapper bg-white px-3 py-2 rounded-pill shadow-sm border align-self-start align-self-md-auto">
                <Pagination
                  current={currentPage}
                  total={filteredProperties.length}
                  pageSize={PAGE_SIZE}
                  onChange={handlePageChange}
                  showSizeChanger={false}
                />
              </div>
            )}
          </div>

          {/* 3-Column Grid (6 Cards Per Page) */}
          {paginatedProperties.length > 0 ? (
            <div className="row g-4">
              {paginatedProperties.map((property, index) => (
                <div
                  key={property.id}
                  className="col-md-6 col-lg-4"
                  data-aos="fade-up"
                  data-aos-delay={(index % 3) * 100}
                >
                  <PropertyCard property={property} />
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-light rounded-4 p-5 text-center my-4">
              <Empty description="No properties matched your selected filters.">
                <Button
                  type="primary"
                  onClick={handleResetFilters}
                  style={{ backgroundColor: '#f35525', borderColor: '#f35525' }}
                >
                  Reset All Filters
                </Button>
              </Empty>
            </div>
          )}
        </div>
      </section>

      {/* Right-Side Slide-Over Filter Drawer */}
      <Drawer
        title={
          <div className="d-flex align-items-center gap-2">
            <SlidersOutlined className="text-orange" />
            <span className="fw-bold">Filter &amp; Sort Properties</span>
          </div>
        }
        placement="right"
        onClose={() => setFilterDrawerOpen(false)}
        open={filterDrawerOpen}
        styles={{ wrapper: { width: 360 } }}
        footer={
          <div className="d-flex gap-2">
            <Button
              size="large"
              className="w-50 rounded-pill fw-semibold"
              onClick={handleResetFilters}
            >
              Reset All
            </Button>
            <Button
              type="primary"
              size="large"
              icon={<CheckOutlined />}
              className="w-50 rounded-pill fw-semibold"
              style={{ backgroundColor: '#f35525', borderColor: '#f35525' }}
              onClick={() => setFilterDrawerOpen(false)}
            >
              Show ({filteredProperties.length})
            </Button>
          </div>
        }
      >
        <div className="d-flex flex-column gap-4 py-2">
          {/* Search Keyword */}
          <div>
            <label className="form-label small fw-bold text-uppercase text-muted">
              Search Location or Title
            </label>
            <Input
              size="large"
              placeholder="e.g. Canal Road, Yorkville..."
              prefix={<SearchOutlined className="text-muted" />}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              allowClear
            />
          </div>

          {/* City Filter */}
          <div>
            <label className="form-label small fw-bold text-uppercase text-muted">
              City / Region
            </label>
            <Select
              size="large"
              className="w-100"
              value={selectedCity}
              onChange={(val) => {
                setSelectedCity(val);
                setCurrentPage(1);
              }}
              options={[
                { value: 'all', label: 'All Cities' },
                { value: 'Faisalabad', label: 'Faisalabad, Pakistan' },
                { value: 'Toronto', label: 'Toronto, Canada' },
                { value: 'Melbourne', label: 'Melbourne, Australia' },
              ]}
            />
          </div>

          {/* Max Budget Filter */}
          <div>
            <label className="form-label small fw-bold text-uppercase text-muted">
              Maximum Budget
            </label>
            <Select
              size="large"
              className="w-100"
              value={maxBudget}
              onChange={(val) => {
                setMaxBudget(val);
                setCurrentPage(1);
              }}
              options={[
                { value: 'all', label: 'Any Max Budget' },
                { value: '500000', label: 'Up to $500,000' },
                { value: '1000000', label: 'Up to $1,000,000' },
                { value: '1500000', label: 'Up to $1,500,000' },
                { value: '2000000', label: 'Up to $2,000,000' },
              ]}
            />
          </div>

          {/* Minimum Bedrooms */}
          <div>
            <label className="form-label small fw-bold text-uppercase text-muted">
              Minimum Bedrooms
            </label>
            <Select
              size="large"
              className="w-100"
              value={minBeds}
              onChange={(val) => {
                setMinBeds(val);
                setCurrentPage(1);
              }}
              options={[
                { value: 'all', label: 'Any Bedrooms' },
                { value: '3', label: '3+ Bedrooms' },
                { value: '4', label: '4+ Bedrooms' },
                { value: '5', label: '5+ Bedrooms' },
                { value: '6', label: '6+ Bedrooms' },
              ]}
            />
          </div>

          {/* Sort By */}
          <div>
            <label className="form-label small fw-bold text-uppercase text-muted">
              Sort Order
            </label>
            <Select
              size="large"
              className="w-100"
              value={sortBy}
              onChange={(val) => {
                setSortBy(val);
                setCurrentPage(1);
              }}
              options={[
                { value: 'default', label: 'Featured Default' },
                { value: 'price-asc', label: 'Price: Low to High' },
                { value: 'price-desc', label: 'Price: High to Low' },
              ]}
            />
          </div>
        </div>
      </Drawer>
    </div>
  );
}