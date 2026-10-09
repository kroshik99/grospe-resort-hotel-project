import { useState } from 'react';

/** <img> that fades in once loaded. A missing photo renders a quiet navy placeholder. */
export default function Photo({ src, alt = '', eager = false, className = '' }) {
  const [loaded, setLoaded] = useState(false);
  if (!src) return <span className="ph-missing" aria-hidden="true" />;
  return (
    <img
      className={`ph${loaded ? ' loaded' : ''} ${className}`}
      src={src}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      ref={(el) => { if (el?.complete && el.naturalWidth) setLoaded(true); }}
      onLoad={() => setLoaded(true)}
    />
  );
}
