import React from 'react';
import styles from './InfraIconsecurities.module.scss';
import { MdSecurity } from 'react-icons/md';

function InfraIconsecurities() {
  /** 치안 버튼 클릭 시 */
  const onClickSecuritysBtn = () => {
    console.log('치안 위치 요청');
  };

  return (
    <div className={styles.component}>
      <div className={styles.iconall} onClick={onClickSecuritysBtn}>
        <div className={styles.iconborder}>
          <span className={styles.icon}>
            <MdSecurity />
          </span>
        </div>
        <p className={styles.icontext}>치안</p>
      </div>
    </div>
  );
}

export default InfraIconsecurities;
