import React, { useState } from 'react';
import styles from './InfraIconcultures.module.scss';
import { MdMovie } from 'react-icons/md';
import { MdOutlinePark } from 'react-icons/md';
import { RiGalleryFill } from 'react-icons/ri';
import { BsBook } from 'react-icons/bs';

type Props = {
  selectedBtn: string;
  setSelectedBtn: (btnName: string) => void;
};

function InfraIconcultures(props: Props) {
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
        <div className={`${styles.iconborder} ${selectedBtn === 'park' ? styles.selected : ''}`} onClick={() => onClickBtn('bus')}>
          <span className={styles.icon}>
            <MdOutlinePark />
          </span>
        </div>
        <p>공원</p>
      </div>
      <div className={styles.iconall}>
        <div className={`${styles.iconborder} ${selectedBtn === 'cinema' ? styles.selected : ''}`} onClick={() => onClickBtn('cinema')}>
          <span className={styles.icon}>
            <MdMovie />
          </span>
        </div>
        <p>영화관</p>
      </div>
      <div className={styles.iconall}>
        <div className={`${styles.iconborder} ${selectedBtn === 'gallery' ? styles.selected : ''}`} onClick={() => onClickBtn('gallery')}>
          <span className={styles.icon}>
            <RiGalleryFill />
          </span>
        </div>
        <p>미술관</p>
      </div>
      <div className={styles.iconall}>
        <div className={`${styles.iconborder} ${selectedBtn === 'lib' ? styles.selected : ''}`} onClick={() => onClickBtn('lib')}>
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
