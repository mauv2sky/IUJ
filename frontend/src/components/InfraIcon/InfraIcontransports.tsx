import React from 'react';
import styles from './InfraIcontransports.module.scss';
import { FaBus } from 'react-icons/fa';
import { FaSubway } from 'react-icons/fa';

function InfraIcontransports() {
  /** 버스 버튼 클릭 시 */
  const onClickBusBtn = () => {
    console.log('버스정류장 위치 요청');
  };

  /** 지하철 버튼 클릭 시 */
  const onClickSubwayBtn = () => {
    console.log('지하철 위치 요청');
  };
  return (
    <div className={styles.component}>
      <div className={styles.iconall} onClick={onClickBusBtn}>
        <div className={styles.iconborder}>
          <span className={styles.icon}>
            <FaBus />
          </span>
        </div>
        <p className={styles.icontext}>버스</p>
      </div>
      <div className={styles.iconall} onClick={onClickSubwayBtn}>
        <div className={styles.iconborder}>
          <span className={styles.icon}>
            <FaSubway />
          </span>
        </div>
        <p>지하철</p>
      </div>
    </div>
  );
}

export default InfraIcontransports;
