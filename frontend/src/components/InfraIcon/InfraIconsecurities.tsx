import React, { useState } from 'react';
import styles from './InfraIconsecurities.module.scss';
import { BiCctv } from 'react-icons/bi';
import { GiPoliceBadge } from 'react-icons/gi';

type Props = {
  selectedBtn: string;
  setSelectedBtn: (btnName: string) => void;
};

function InfraIconsecurities(props: Props) {
  const { selectedBtn, setSelectedBtn } = props;
  const [onoffBtn, setOnoffBtn] = useState('');

  /** 버튼 클릭 시 */
  const onClickBtn = (type: string) => {
    console.log(`${type} 위치 요청`);
    setSelectedBtn(onoffBtn === type ? '' : type);
    setOnoffBtn(onoffBtn === type ? '' : type);
  };

  return (
    <div className={styles.component}>
      <div className={styles.iconall}>
        <div className={`${styles.iconborder} ${onoffBtn === 'cctv' ? styles.selected : ''}`} onClick={() => onClickBtn('cctv')}>
          <span className={styles.icon}>
            <BiCctv />
          </span>
        </div>
        <p className={styles.icontext}>cctv</p>
      </div>
      <div className={styles.iconall}>
        <div className={`${styles.iconborder} ${onoffBtn === 'police' ? styles.selected : ''}`} onClick={() => onClickBtn('police')}>
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
