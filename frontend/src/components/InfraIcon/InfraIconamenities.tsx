import React, { useState } from 'react';
import styles from './InfraIconamenities.module.scss';
import { MdLocalHospital } from 'react-icons/md';
import { BsFillBasket3Fill } from 'react-icons/bs';
import { MdLocalConvenienceStore } from 'react-icons/md';

function InfraIconamenities() {
  const [selectedBtn, setSelectedBtn] = useState('');

  /** 어린이집 버튼 클릭 시 */
  const onClickHospitalBtn = () => {
    console.log('병원 위치 요청');
    setSelectedBtn(selectedBtn === 'hospital' ? '' : 'hospital');
  };
  /** 유치원 버튼 클릭 시 */
  const onClickMartBtn = () => {
    console.log('마트 위치 요청');
    setSelectedBtn(selectedBtn === 'mart' ? '' : 'mart');
  };
  /** 초등학교 버튼 클릭 시 */
  const onClickConvenienceStoreBtn = () => {
    console.log('편의점 위치 요청');
    setSelectedBtn(selectedBtn === 'conveniencestore' ? '' : 'conveniencestore');
  };
  return (
    <div className={styles.component}>
      <div className={styles.iconall}>
        <div className={`${styles.iconborder} ${selectedBtn === 'hospital' ? styles.selected : ''}`} onClick={onClickHospitalBtn}>
          <span className={styles.icon}>
            <MdLocalHospital />
          </span>
        </div>
        <p>병원</p>
      </div>
      <div className={styles.iconall}>
        <div className={`${styles.iconborder} ${selectedBtn === 'mart' ? styles.selected : ''}`} onClick={onClickMartBtn}>
          <span className={styles.icon}>
            <BsFillBasket3Fill />
          </span>
        </div>
        <p>마트</p>
      </div>
      <div className={styles.iconall}>
        <div className={`${styles.iconborder} ${selectedBtn === 'conveniencestore' ? styles.selected : ''}`} onClick={onClickConvenienceStoreBtn}>
          <span className={styles.icon}>
            <MdLocalConvenienceStore />
          </span>
        </div>
        <p>편의점</p>
      </div>
    </div>
  );
}

export default InfraIconamenities;
