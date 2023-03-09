import React from 'react';
import styles from './Navbar.module.scss';

function Navbar() {
  return (
    <div className={styles.component}>
      <div className={styles['component-inner']}>
        <p className={styles['tmp-logo']}>IUJ</p>
        <div className={styles['nav-right']}>
          <p>내 집 찾아보기</p>
          <div className={styles['tmp-profile-img']} />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
