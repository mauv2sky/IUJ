import React from 'react';
import styles from './Footer.module.scss';

function Footer() {
  return (
    <div className={styles.component}>
      <div className={styles['component-inner']}>
        <div className={styles.content}>
          <p className={styles.title}>IUJ</p>
          <p className={styles.copyright}>Copyright © IUJ 아이유정 All rights reserved. (becoding96@gmail.com)</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
