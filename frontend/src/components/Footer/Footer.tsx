import React from 'react';
import logo from '../../assets/logo.png';
import styles from './Footer.module.scss';

function Footer() {
  return (
    <div className={styles.component}>
      <div className={styles['component-inner']}>
        <div className={styles.content}>
          <img src={logo} alt="logo" className={styles.logo} />
          <p className={styles.copyright}>Copyright © IUJ 아이유정 All rights reserved. (becoding96@gmail.com)</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
