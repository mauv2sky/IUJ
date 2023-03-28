import React, { useState } from 'react';
import styles from './InfraIconschools.module.scss';
import { FaSchool } from 'react-icons/fa';
import { SiHtmlacademy } from 'react-icons/si';

type Props = {};

function InfraIconschools(props: Props) {
  const [selectedBtn, setSelectedBtn] = useState('');

  /** 어린이집 버튼 클릭 시 */
  const onClickBabyBtn = () => {
    console.log('어린이집 위치 요청');
    setSelectedBtn(selectedBtn === 'baby' ? '' : 'baby');
  };
  /** 유치원 버튼 클릭 시 */
  const onClickKidBtn = () => {
    console.log('유치원 위치 요청');
    setSelectedBtn(selectedBtn === 'kid' ? '' : 'kid');
  };
  /** 초등학교 버튼 클릭 시 */
  const onClickElementaryBtn = () => {
    console.log('초등학교 위치 요청');
    setSelectedBtn(selectedBtn === 'elementary' ? '' : 'elementary');
  };
  /** 중학교 버튼 클릭 시 */
  const onClickMiddleBtn = () => {
    console.log('중학교 위치 요청');
    setSelectedBtn(selectedBtn === 'middle' ? '' : 'middle');
  };
  /** 고등학교 버튼 클릭 시 */
  const onClickHighBtn = () => {
    console.log('고등학교 위치 요청');
    setSelectedBtn(selectedBtn === 'high' ? '' : 'high');
  };
  /** 특수학교 버튼 클릭 시 */
  const onClickHandicappedBtn = () => {
    console.log('특수학교 위치 요청');
    setSelectedBtn(selectedBtn === 'handicapped' ? '' : 'handicapped');
  };
  /** 입시학원 버튼 클릭 시 */
  const onClickEntranceBtn = () => {
    console.log('입시학원 위치 요청');
    setSelectedBtn(selectedBtn === 'entrance' ? '' : 'entrance');
  };
  /** 예체능 버튼 클릭 시 */
  const onClickArtsBtn = () => {
    console.log('예체능 위치 요청');
    setSelectedBtn(selectedBtn === 'arts' ? '' : 'arts');
  };
  return (
    <div className={styles.component}>
      <div className={styles.iconall}>
        <div className={`${styles.iconborder} ${selectedBtn === 'baby' ? styles.selected : ''}`} onClick={onClickBabyBtn}>
          <span className={styles.icon}>
            <FaSchool />
          </span>
        </div>
        <p>어린이집</p>
      </div>
      <div className={styles.iconall}>
        <div className={`${styles.iconborder} ${selectedBtn === 'kid' ? styles.selected : ''}`} onClick={onClickKidBtn}>
          <span className={styles.icon}>
            <FaSchool />
          </span>
        </div>
        <p>유치원</p>
      </div>
      <div className={styles.iconall}>
        <div className={`${styles.iconborder} ${selectedBtn === 'elementary' ? styles.selected : ''}`} onClick={onClickElementaryBtn}>
          <span className={styles.icon}>
            <FaSchool />
          </span>
        </div>
        <p>초등학교</p>
      </div>
      <div className={styles.iconall}>
        <div className={`${styles.iconborder} ${selectedBtn === 'middle' ? styles.selected : ''}`} onClick={onClickMiddleBtn}>
          <span className={styles.icon}>
            <FaSchool />
          </span>
        </div>
        <p>중학교</p>
      </div>
      <div className={styles.iconall}>
        <div className={`${styles.iconborder} ${selectedBtn === 'high' ? styles.selected : ''}`} onClick={onClickHighBtn}>
          <span className={styles.icon}>
            <FaSchool />
          </span>
        </div>
        <p>고등학교</p>
      </div>
      <div className={styles.iconall}>
        <div className={`${styles.iconborder} ${selectedBtn === 'handicapped' ? styles.selected : ''}`} onClick={onClickHandicappedBtn}>
          <span className={styles.icon}>
            <FaSchool />
          </span>
        </div>
        <p>특수학교</p>
      </div>
      <div className={styles.iconall}>
        <div className={`${styles.iconborder} ${selectedBtn === 'entrance' ? styles.selected : ''}`} onClick={onClickEntranceBtn}>
          <span className={styles.icon}>
            <SiHtmlacademy />
          </span>
        </div>
        <p>입시학원</p>
      </div>
      <div className={styles.iconall}>
        <div className={`${styles.iconborder} ${selectedBtn === 'arts' ? styles.selected : ''}`} onClick={onClickArtsBtn}>
          <span className={styles.icon}>
            <SiHtmlacademy />
          </span>
        </div>
        <p>예체능</p>
      </div>
    </div>
  );
}

export default InfraIconschools;
