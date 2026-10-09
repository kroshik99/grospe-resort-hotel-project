/** The resort's own logo artwork (public/logo*.png, white on transparent) used as a CSS mask,
 *  so it takes the current text colour — gold on navy, navy on cream — from one file. */
export default function Logo({ full = false, className = '' }) {
  return <span className={`logo ${full ? 'logo-full' : 'logo-mark'} ${className}`} role="img" aria-label="Grospe Resort Boracay" />;
}

/** Mark + wordmark lockup for the header and footer. */
export function Brand({ onClick }) {
  return (
    <a href="/#top" className="brand" onClick={onClick}>
      <Logo />
      <span className="brand-word"><b>Grospe Resort</b><small>Boracay</small></span>
    </a>
  );
}
