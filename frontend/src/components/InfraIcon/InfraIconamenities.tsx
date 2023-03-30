import React, { useState } from 'react';
import styles from './InfraIconamenities.module.scss';
import { MdLocalHospital } from 'react-icons/md';
import { BsFillBasket3Fill } from 'react-icons/bs';
import { MdLocalConvenienceStore } from 'react-icons/md';
import { BsFillBuildingFill } from 'react-icons/bs';

type Props = {
  selectedBtn: string;
  setSelectedBtn: (btnName: string) => void;
};

function InfraIconamenities(props: Props) {
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
        <div className={`${styles.iconborder} ${onoffBtn === 'hospital' ? styles.selected : ''}`} onClick={() => onClickBtn('hospital')}>
          <span className={styles.icon}>
            <MdLocalHospital />
          </span>
        </div>
        <p>병원</p>
      </div>
      <div className={styles.iconall}>
        <div className={`${styles.iconborder} ${onoffBtn === 'mart' ? styles.selected : ''}`} onClick={() => onClickBtn('mart')}>
          <span className={styles.icon}>
            <BsFillBasket3Fill />
          </span>
        </div>
        <p>마트</p>
      </div>
      <div className={styles.iconall}>
        <div className={`${styles.iconborder} ${onoffBtn === 'convi' ? styles.selected : ''}`} onClick={() => onClickBtn('convi')}>
          <span className={styles.icon}>
            <MdLocalConvenienceStore />
          </span>
        </div>
        <p>편의점</p>
      </div>
      <div className={styles.iconall}>
        <div className={`${styles.iconborder} ${onoffBtn === 'shopping' ? styles.selected : ''}`} onClick={() => onClickBtn('shopping')}>
          <span className={styles.icon}>
            <BsFillBuildingFill />
          </span>
        </div>
        <p>대형매장</p>
      </div>
    </div>
  );
}

export default InfraIconamenities;
