import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Navbar.module.scss';

function Navbar() {
  const navigate = useNavigate();
  /** 네브바 보여줄지 여부 */
  const [showNavbar, setShowNavbar] = useState(true);

  /** 네브바 보여줄지 여부 결정 */
  useEffect(() => {
    let prevScrollpos = window.pageYOffset;

    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isScrolledDown = prevScrollpos < currentScrollPos;
      if (currentScrollPos < 400) {
        setShowNavbar(true);
      } else {
        setShowNavbar(!isScrolledDown);
      }
      prevScrollpos = currentScrollPos;
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /** 로고 클릭 시 */
  const onClickLogo = () => {
    navigate('/');
  };

  /** 내 집 찾아보기 클릭 시 */
  const onClickGoMap = () => {
    navigate('/map');
  };

  return (
    <div className={`${styles.component} ${showNavbar || window.pageYOffset < 400 ? '' : styles.hidden}`}>
      <div className={styles['component-inner']}>
        <p className={styles['tmp-logo']} onClick={onClickLogo}>
          IUJ
        </p>
        <div className={styles['nav-right']}>
          <a onClick={onClickGoMap}>내 집 찾아보기</a>
          <div className={styles['tmp-profile-img']}>B</div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
