import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export function useFocusOnRouteChange() {
  const location = useLocation();
  const mainRef = useRef<HTMLElement>(null);
  const prevPathname = useRef(location.pathname);

  useEffect(() => {
    if (prevPathname.current !== location.pathname) {
      // Focus on main content after route change
      if (mainRef.current) {
        mainRef.current.focus();
      }
      prevPathname.current = location.pathname;
    }
  }, [location.pathname]);

  return mainRef;
}
