import React, { useState } from 'react';
import styles from './InfraIconschools.module.scss';
import { FaSchool } from 'react-icons/fa';
import { SiHtmlacademy } from 'react-icons/si';

type Props = {
  selectedBtn: string;
  setSelectedBtn: (btnName: string) => void;
};

function InfraIconschools(props: Props) {
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
        <div className={`${styles.iconborder} ${onoffBtn === '어린이집' ? styles.selected : ''}`} onClick={() => onClickBtn('어린이집')}>
          <span className={styles.icon}>
            <FaSchool />
          </span>
        </div>
        <p>어린이집</p>
      </div>
      <div className={styles.iconall}>
        <div className={`${styles.iconborder} ${onoffBtn === '유치원' ? styles.selected : ''}`} onClick={() => onClickBtn('유치원')}>
          <span className={styles.icon}>
            <FaSchool />
          </span>
        </div>
        <p>유치원</p>
      </div>
      <div className={styles.iconall}>
        <div className={`${styles.iconborder} ${onoffBtn === '초등학교' ? styles.selected : ''}`} onClick={() => onClickBtn('초등학교')}>
          <span className={styles.icon}>
            <FaSchool />
          </span>
        </div>
        <p>초등학교</p>
      </div>
      <div className={styles.iconall}>
        <div className={`${styles.iconborder} ${onoffBtn === '중학교' ? styles.selected : ''}`} onClick={() => onClickBtn('중학교')}>
          <span className={styles.icon}>
            <FaSchool />
          </span>
        </div>
        <p>중학교</p>
      </div>
      <div className={styles.iconall}>
        <div className={`${styles.iconborder} ${onoffBtn === '고등학교' ? styles.selected : ''}`} onClick={() => onClickBtn('고등학교')}>
          <span className={styles.icon}>
            <FaSchool />
          </span>
        </div>
        <p>고등학교</p>
      </div>
      <div className={styles.iconall}>
        <div className={`${styles.iconborder} ${onoffBtn === '특수학교' ? styles.selected : ''}`} onClick={() => onClickBtn('특수학교')}>
          <span className={styles.icon}>
            <FaSchool />
          </span>
        </div>
        <p>특수학교</p>
      </div>
      <div className={styles.iconall}>
        <div className={`${styles.iconborder} ${onoffBtn === '입시.검정 및 보습' ? styles.selected : ''}`} onClick={() => onClickBtn('입시.검정 및 보습')}>
          <span className={styles.icon}>
            <SiHtmlacademy />
          </span>
        </div>
        <p>입시학원</p>
      </div>
      <div className={styles.iconall}>
        <div className={`${styles.iconborder} ${onoffBtn === '예체능' ? styles.selected : ''}`} onClick={() => onClickBtn('예체능')}>
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
