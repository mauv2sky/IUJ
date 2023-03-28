import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = (): null => {
  const { pathname } = useLocation();

  const handleScrollTop = () => {
    window.onbeforeunload = function pushRefresh() {
      window.scrollTo(0, 0);
    };
  };

  useEffect(() => {
    handleScrollTop();
  }, [pathname]);

  return null;
};

export default ScrollToTop;
