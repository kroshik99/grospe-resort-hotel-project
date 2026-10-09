import { useEffect, useState } from 'react';
import Icon from './Icon.jsx';

/** A short confirmation (e.g. "Inquiry copied") that clears itself. */
export function useToast() {
  const [toast, setToast] = useState('');
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(''), 3600);
    return () => clearTimeout(t);
  }, [toast]);
  return [toast, setToast];
}

export default function Toast({ text }) {
  if (!text) return null;
  return <div className="toast" role="status" key={text}><Icon name="check" size={18} stroke={2.4} />{text}</div>;
}
