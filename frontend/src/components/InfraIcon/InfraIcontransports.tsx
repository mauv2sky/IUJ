import React, { useState, useEffect } from 'react';
import styles from './InfraIcontransports.module.scss';
import { FaBus } from 'react-icons/fa';
import { FaSubway } from 'react-icons/fa';

type Props = {
  selectedBtn: string;
  setSelectedBtn: (btnName: string) => void;
};

function InfraIcontransports(props: Props) {
  const { selectedBtn, setSelectedBtn } = props;
  const [onoffBtn, setOnoffBtn] = useState('');

  /** 버튼 클릭 시 */
  const onClickBtn = (type: string) => {
    // console.log(`${type} 위치 요청`);
    setSelectedBtn(onoffBtn === type ? '' : type);
    setOnoffBtn(onoffBtn === type ? '' : type);
  };

  return (
    <div className={styles.component}>
      <div className={styles.iconall}>
        <div className={`${styles.iconborder} ${onoffBtn === 'bus' ? styles.selected : ''}`} onClick={() => onClickBtn('bus')}>
          <span className={styles.icon}>
            <FaBus />
          </span>
        </div>
        <p className={styles.icontext}>버스</p>
      </div>
      <div className={styles.iconall}>
        <div className={`${styles.iconborder} ${onoffBtn === 'subway' ? styles.selected : ''}`} onClick={() => onClickBtn('subway')}>
          <span className={styles.icon}>
            <FaSubway />
          </span>
        </div>
        <p className={styles.icontext}>지하철</p>
      </div>
    </div>
  );
}

export default InfraIcontransports;
