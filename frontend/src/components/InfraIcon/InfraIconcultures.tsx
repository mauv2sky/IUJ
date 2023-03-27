import React, { useState } from 'react';
import styles from './InfraIconcultures.module.scss';
import { MdMovie } from 'react-icons/md';
import { MdOutlinePark } from 'react-icons/md';

function InfraIconcultures() {
  const [selectedBtn, setSelectedBtn] = useState('');

  /** 공원 버튼 클릭 시 */
  const onClickParkBtn = () => {
    console.log('공원 위치 요청');
    setSelectedBtn(selectedBtn === 'park' ? '' : 'park');
  };
  /** 영화관 버튼 클릭 시 */
  const onClickMovieBtn = () => {
    console.log('영화관 위치 요청');
    setSelectedBtn(selectedBtn === 'movie' ? '' : 'movie');
  };
  return (
    <div className={styles.component}>
      <div className={styles.iconall}>
        <div className={`${styles.iconborder} ${selectedBtn === 'park' ? styles.selected : ''}`} onClick={onClickParkBtn}>
          <span className={styles.icon}>
            <MdOutlinePark />
          </span>
        </div>
        <p>공원</p>
      </div>
      <div className={styles.iconall}>
        <div className={`${styles.iconborder} ${selectedBtn === 'movie' ? styles.selected : ''}`} onClick={onClickMovieBtn}>
          <span className={styles.icon}>
            <MdMovie />
          </span>
        </div>
        <p>영화관</p>
      </div>
    </div>
  );
}

export default InfraIconcultures;
