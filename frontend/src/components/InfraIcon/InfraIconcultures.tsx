import React, { useState } from 'react';
import styles from './InfraIconcultures.module.scss';
import { MdMovie } from 'react-icons/md';
import { MdOutlinePark } from 'react-icons/md';
import { RiGalleryFill } from 'react-icons/ri';
import { BsBook } from 'react-icons/bs';

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
  /** 미술관 버튼 클릭 시 */
  const onClickArtBtn = () => {
    console.log('공원 위치 요청');
    setSelectedBtn(selectedBtn === 'art' ? '' : 'art');
  };
  /** 도서관 버튼 클릭 시 */
  const onClickbookBtn = () => {
    console.log('영화관 위치 요청');
    setSelectedBtn(selectedBtn === 'book' ? '' : 'book');
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
      <div className={styles.iconall}>
        <div className={`${styles.iconborder} ${selectedBtn === 'art' ? styles.selected : ''}`} onClick={onClickArtBtn}>
          <span className={styles.icon}>
            <RiGalleryFill />
          </span>
        </div>
        <p>미술관</p>
      </div>
      <div className={styles.iconall}>
        <div className={`${styles.iconborder} ${selectedBtn === 'book' ? styles.selected : ''}`} onClick={onClickbookBtn}>
          <span className={styles.icon}>
            <BsBook />
          </span>
        </div>
        <p>도서관</p>
      </div>
    </div>
  );
}

export default InfraIconcultures;
