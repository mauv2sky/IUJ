import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import ProfileMenu from '../ProfileMenu/ProfileMenu';
import logo from '../../assets/logo.png';
import styles from './Navbar.module.scss';

function Navbar() {
  const { isLogin, userName } = useAppSelector((state) => state.userSlice);
  const navigate = useNavigate();
  /** 네브바 보여줄지 여부 */
  const [showNavbar, setShowNavbar] = useState(true);
  /** 프로필 메뉴 보여줄지 여부 */
  const [showProfileMenu, setShowProfileMenu] = useState<boolean>(false);

  /** 네브바 보여줄지 여부 결정 */
  useEffect(() => {
    let prevScrollpos = window.pageYOffset;

    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isScrolledDown = prevScrollpos < currentScrollPos;
      if (currentScrollPos < 300) {
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

  /** 로그인 클릭 시 */
  const onClickLogin = () => {
    navigate('/login');
  };

  return (
    <div className={`${styles.component} ${showNavbar || window.pageYOffset < 300 ? '' : styles.hidden}`}>
      <div className={styles['component-inner']}>
        <img src={logo} alt="logo" onClick={onClickLogo} className={styles.logo} />
        <div className={styles['nav-right']}>
          <a className={styles.hover} onClick={onClickGoMap}>
            내 집 찾아보기
          </a>
          {!isLogin && (
            <p className={styles.hover} onClick={onClickLogin}>
              로그인
            </p>
          )}
          {isLogin && (
            <div id={styles.profile}>
              어서오세요,{' '}
              <span
                className={styles.hover}
                onClick={() => {
                  setShowProfileMenu(true);
                }}
              >
                {userName}
              </span>{' '}
              님{showProfileMenu && <ProfileMenu setShowProfileMenu={setShowProfileMenu} />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
