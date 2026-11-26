import { useState, useEffect } from 'react';
import { Link, NavLink, useSearchParams, useLocation } from 'react-router-dom';
import { Dropdown, Drawer, Button } from 'antd';
import { DownOutlined, MenuOutlined, CalendarOutlined } from '@ant-design/icons';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();

  const currentType = searchParams.get('type') || 'all';
  const isPropertiesPage = pathname.startsWith('/properties');

  // 1. Scroll listener for Fixed Glass Capsule
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. Auto-close Mobile Drawer on Desktop resize (>= 992px)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const categoryItems = [
    {
      key: 'all',
      label: (
        <Link
          to="/properties"
          className={`dropdown-link ${isPropertiesPage && currentType === 'all' ? 'text-orange fw-bold' : ''}`}
        >
          All Properties
        </Link>
      ),
    },
    {
      type: 'divider',
    },
    {
      key: 'villa',
      label: (
        <Link
          to="/properties?type=villa"
          className={`dropdown-link ${isPropertiesPage && currentType === 'villa' ? 'text-orange fw-bold' : ''}`}
        >
          Luxury Villas
        </Link>
      ),
    },
    {
      key: 'apartment',
      label: (
        <Link
          to="/properties?type=apartment"
          className={`dropdown-link ${isPropertiesPage && currentType === 'apartment' ? 'text-orange fw-bold' : ''}`}
        >
          Apartments
        </Link>
      ),
    },
    {
      key: 'penthouse',
      label: (
        <Link
          to="/properties?type=penthouse"
          className={`dropdown-link ${isPropertiesPage && currentType === 'penthouse' ? 'text-orange fw-bold' : ''}`}
        >
          Penthouses
        </Link>
      ),
    },
  ];

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      {/* Stylish Dark Architectural Top Sub-Header */}
      <div className={`sub-header d-none d-lg-block ${isScrolled ? 'hide-sub' : ''}`}>
        <div className="container-fluid px-4 px-lg-5 d-flex justify-content-between align-items-center h-100">
          {/* Left: Clickable Contact Chips */}
          <div className="d-flex align-items-center gap-3">
            <a href="mailto:info@villa.co" className="topbar-info-link">
              <span className="topbar-icon-badge">
                <i className="fa-solid fa-envelope"></i>
              </span>
              info@villa.co
            </a>

            <span className="topbar-divider"></span>

            <a href="tel:+923000200340" className="topbar-info-link">
              <span className="topbar-icon-badge">
                <i className="fa-solid fa-phone"></i>
              </span>
              +92 300 0200340
            </a>

            <span className="topbar-divider"></span>

            <span className="topbar-info-text">
              <span className="topbar-icon-badge">
                <i className="fa-solid fa-location-dot"></i>
              </span>
              Kohinoor Plaza I, Faisalabad
            </span>
          </div>

          {/* Right: Live Verified Badge + Dark Glass Social Icons */}
          <div className="d-flex align-items-center gap-3">
            <span className="verified-status-pill">
              <span className="pulse-dot"></span> 100% NOC Verified Listings
            </span>

            <ul className="list-inline mb-0 social-links-top d-flex align-items-center gap-2">
              <li className="list-inline-item m-0">
                <a href="#facebook" aria-label="Facebook">
                  <i className="fab fa-facebook-f text-decoration-none"></i>
                </a>
              </li>
              <li className="list-inline-item m-0">
                <a href="#instagram" aria-label="Instagram">
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
              <li className="list-inline-item m-0">
                <a href="#linkedin" aria-label="LinkedIn">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Fixed Top Glass Capsule Navbar */}
      <div className={`navbar-wrapper ${isScrolled ? 'scrolled' : ''}`}>
        <header className="main-header">
          <div className="container-fluid px-4 px-lg-5 d-flex justify-content-between align-items-center">
            {/* Brand Logo */}
            <Link className="villa-logo" to="/">
              VILLA<span className="text-orange">.</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="desktop-nav d-none d-lg-flex align-items-center gap-4">
              <NavLink className="nav-item-link" to="/" end>
                Home
              </NavLink>
              <NavLink className="nav-item-link" to="/about">
                About Us
              </NavLink>

              <Dropdown menu={{ items: categoryItems }} trigger={['hover']} placement="bottomLeft">
                <NavLink className="nav-item-link d-inline-flex align-items-center gap-1" to="/properties">
                  Properties <DownOutlined style={{ fontSize: '11px' }} />
                </NavLink>
              </Dropdown>

              <NavLink className="nav-item-link" to="/contact">
                Contact Us
              </NavLink>

              <Link className="schedule-btn ms-2" to="/contact">
                <span className="calendar-icon">
                  <CalendarOutlined />
                </span>
                Schedule a visit
              </Link>
            </nav>

            {/* Mobile Hamburger Button */}
            <Button
              className="d-lg-none mobile-menu-trigger"
              type="text"
              icon={<MenuOutlined style={{ fontSize: '22px' }} />}
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open Menu"
            />
          </div>
        </header>
      </div>

      {/* Spacer div so Hero content doesn't hide behind fixed navbar */}
      <div className="navbar-spacer"></div>

      {/* Mobile Drawer Menu */}
      <Drawer
        rootClassName="d-lg-none"
        title={<span className="villa-logo fs-4">VILLA<span className="text-orange">.</span></span>}
        placement="right"
        onClose={closeMobileMenu}
        open={mobileMenuOpen}
        styles={{ wrapper: { width: 290 } }}
      >
        <div className="mobile-nav-links d-flex flex-column gap-3">
          <NavLink className="mobile-link" to="/" end onClick={closeMobileMenu}>
            Home
          </NavLink>
          <NavLink className="mobile-link" to="/about" onClick={closeMobileMenu}>
            About Us
          </NavLink>
          <NavLink className="mobile-link" to="/properties" end onClick={closeMobileMenu}>
            All Properties
          </NavLink>

          <div className="ps-3 border-start d-flex flex-column gap-2 my-1">
            <Link
              className={`mobile-sub-link ${isPropertiesPage && currentType === 'villa' ? 'text-orange fw-bold' : ''}`}
              to="/properties?type=villa"
              onClick={closeMobileMenu}
            >
              Luxury Villas
            </Link>
            <Link
              className={`mobile-sub-link ${isPropertiesPage && currentType === 'apartment' ? 'text-orange fw-bold' : ''}`}
              to="/properties?type=apartment"
              onClick={closeMobileMenu}
            >
              Apartments
            </Link>
            <Link
              className={`mobile-sub-link ${isPropertiesPage && currentType === 'penthouse' ? 'text-orange fw-bold' : ''}`}
              to="/properties?type=penthouse"
              onClick={closeMobileMenu}
            >
              Penthouses
            </Link>
          </div>

          <NavLink className="mobile-link" to="/contact" onClick={closeMobileMenu}>
            Contact Us
          </NavLink>

          <Link className="schedule-btn mt-3 justify-content-start" to="/contact" onClick={closeMobileMenu}>
            <span className="calendar-icon">
              <CalendarOutlined />
            </span>
            Schedule a visit
          </Link>
        </div>
      </Drawer>
    </>
  );
}