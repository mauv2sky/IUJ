import React from 'react';
import styles from './SetPriority.module.scss';

function SetPriority() {
  return (
    <div className={styles.component}>
      <h1 className={styles.title}>부동산 점수 환산을 위한 우선 순위를 설정해주세요</h1>
      <div className={styles.priority}>
        <div className={styles['priority-item']}>
          <div className={styles.first}></div>
        </div>
        <div className={styles['priority-item']}>
          <div className={styles.second}></div>
        </div>
        <div className={styles['priority-item']}>
          <div className={styles.third}></div>
        </div>
        <div className={styles['priority-item']}>
          <div className={styles.fourth}></div>
        </div>
        <div className={styles['priority-item']}>
          <div className={styles.fifth}></div>
        </div>
      </div>
    </div>
  );
}

export default SetPriority;
