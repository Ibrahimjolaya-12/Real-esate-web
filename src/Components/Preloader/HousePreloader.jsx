import { useState, useEffect } from 'react';

export default function HousePreloader() {
  const [isLoading, setIsLoading] = useState(() => document.readyState !== 'complete');
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    let hideTimeout = null;
    let isMounted = true;

    const closePreloader = () => {
      if (!isMounted) return;
      setIsFading(true);
      document.body.style.overflow = '';
      hideTimeout = setTimeout(() => {
        if (isMounted) setIsLoading(false);
      }, 400);
    };

    const waitForImagesAndFinish = () => {
      const images = Array.from(document.images || []);
      const pendingImages = images.filter((img) => !img.complete);

      if (pendingImages.length === 0) {
        closePreloader();
        return;
      }

      let remaining = pendingImages.length;

      const onAssetSettled = () => {
        remaining -= 1;
        if (remaining <= 0) {
          closePreloader();
        }
      };

      pendingImages.forEach((img) => {
        img.addEventListener('load', onAssetSettled, { once: true });
        img.addEventListener('error', onAssetSettled, { once: true });
      });

      // Agar koi external image network par hang ho jaye toh max 4s safety guard
      setTimeout(closePreloader, 4000);
    };

    if (document.readyState === 'complete') {
      waitForImagesAndFinish();
    } else {
      setIsLoading(true);
      document.body.style.overflow = 'hidden';

      const handleLoad = () => {
        waitForImagesAndFinish();
      };

      window.addEventListener('load', handleLoad, { once: true });

      return () => {
        isMounted = false;
        window.removeEventListener('load', handleLoad);
        document.body.style.overflow = '';
        if (hideTimeout) clearTimeout(hideTimeout);
      };
    }

    return () => {
      isMounted = false;
      document.body.style.overflow = '';
      if (hideTimeout) clearTimeout(hideTimeout);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div
      className={`villa-house-preloader ${isFading ? 'fade-out' : ''}`}
      role="status"
      aria-live="polite"
      aria-label="Loading Villa Agency"
    >
      <div className="preloader-inner">
        <div className="house-blueprint-box">
          <svg
            viewBox="0 0 180 150"
            className="house-svg"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="15" y1="128" x2="165" y2="128" className="blueprint-ground" />
            <path
              d="M42 74 V128 H138 V74"
              className="draw-walls"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M26 78 L90 26 L154 78"
              className="draw-roof"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M122 50 V34 H134 V60"
              className="draw-chimney"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <rect
              x="79"
              y="92"
              width="22"
              height="36"
              rx="3"
              className="draw-door"
              strokeWidth="3.2"
            />
            <rect
              x="52"
              y="88"
              width="16"
              height="16"
              rx="2.5"
              className="draw-window window-left"
              strokeWidth="2.8"
            />
            <rect
              x="112"
              y="88"
              width="16"
              height="16"
              rx="2.5"
              className="draw-window window-right"
              strokeWidth="2.8"
            />
          </svg>
        </div>

        <div className="preloader-brand">
          VILLA<span>.</span>
        </div>
        <p className="preloader-caption">CRAFTING YOUR LUXURY ADDRESS</p>

        <div className="preloader-progress-track">
          <div className="preloader-progress-fill" />
        </div>
      </div>
    </div>
  );
}