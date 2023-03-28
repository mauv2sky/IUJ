import React, { useState } from 'react';
import styles from './InfraIconamenities.module.scss';
import { MdLocalHospital } from 'react-icons/md';
import { BsFillBasket3Fill } from 'react-icons/bs';
import { MdLocalConvenienceStore } from 'react-icons/md';
import { BsFillBuildingFill } from 'react-icons/bs';

function InfraIconamenities() {
  const [selectedBtn, setSelectedBtn] = useState('');

  /** 병원 버튼 클릭 시 */
  const onClickHospitalBtn = () => {
    console.log('병원 위치 요청');
    setSelectedBtn(selectedBtn === 'hospital' ? '' : 'hospital');
  };
  /** 마트 버튼 클릭 시 */
  const onClickMartBtn = () => {
    console.log('마트 위치 요청');
    setSelectedBtn(selectedBtn === 'mart' ? '' : 'mart');
  };
  /** 편의점 버튼 클릭 시 */
  const onClickConvenienceStoreBtn = () => {
    console.log('편의점 위치 요청');
    setSelectedBtn(selectedBtn === 'conveniencestore' ? '' : 'conveniencestore');
  };
  /** 백화점 버튼 클릭 시 */
  const onClickDepartmentStoreBtn = () => {
    console.log('편의점 위치 요청');
    setSelectedBtn(selectedBtn === 'departmentstore' ? '' : 'departmentstore');
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
      <div className={styles.iconall}>
        <div className={`${styles.iconborder} ${selectedBtn === 'departmentstore' ? styles.selected : ''}`} onClick={onClickDepartmentStoreBtn}>
          <span className={styles.icon}>
            <BsFillBuildingFill />
          </span>
        </div>
        <p>백화점</p>
      </div>
    </div>
  );
}

export default InfraIconamenities;
