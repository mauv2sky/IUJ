import React, { useState } from 'react';
import styles from './InfraIconsecurities.module.scss';
import { BiCctv } from 'react-icons/bi';
import { GiPoliceBadge } from 'react-icons/gi';

type Props = {};

function InfraIconsecurities(props: Props) {
  const [selectedBtn, setSelectedBtn] = useState('');

  /** 치안 버튼 클릭 시 */
  const onClickCctvBtn = () => {
    console.log('치안 위치 요청');
    setSelectedBtn(selectedBtn === 'cctv' ? '' : 'cctv');
  };
  const onClickPoliceBtn = () => {
    console.log('치안 위치 요청');
    setSelectedBtn(selectedBtn === 'police' ? '' : 'police');
  };

  return (
    <div className={styles.component}>
      <div className={styles.iconall}>
        <div className={`${styles.iconborder} ${selectedBtn === 'cctv' ? styles.selected : ''}`} onClick={onClickCctvBtn}>
          <span className={styles.icon}>
            <BiCctv />
          </span>
        </div>
        <p className={styles.icontext}>cctv</p>
      </div>
      <div className={styles.iconall}>
        <div className={`${styles.iconborder} ${selectedBtn === 'police' ? styles.selected : ''}`} onClick={onClickPoliceBtn}>
          <span className={styles.icon}>
            <GiPoliceBadge />
          </span>
        </div>
        <p className={styles.icontext}>파출소</p>
      </div>
    </div>
  );
}

export default InfraIconsecurities;
