import React, { useState } from 'react';
import styles from './InfraIconsecurities.module.scss';
import { MdSecurity } from 'react-icons/md';

type Props = {};

function InfraIconsecurities(props: Props) {
  const [selectedBtn, setSelectedBtn] = useState('');

  /** 치안 버튼 클릭 시 */
  const onClickSecuritysBtn = () => {
    console.log('치안 위치 요청');
    setSelectedBtn(selectedBtn === 'security' ? '' : 'security');
  };

  return (
    <div className={styles.component}>
      <div className={styles.iconall}>
        <div className={`${styles.iconborder} ${selectedBtn === 'security' ? styles.selected : ''}`} onClick={onClickSecuritysBtn}>
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
