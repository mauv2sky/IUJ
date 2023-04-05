import React from 'react';
import styles from './DealDataItem.module.scss';

function DealDataItem(dealDataItem: any) {
  const data = dealDataItem.dealDataItem;

  const pretreatYM = (ym: string) => {
    return ym.substring(0, 4) + '.' + ym.substring(4) + '.';
  };

  const pretreatDay = (day: string) => {
    if (day.length === 1) {
      return '0' + day;
    }
    return day;
  };

  return (
    <div>
      <div className={data.dealType === '매매' ? styles.container : data.dealType === '전세' ? styles.container2 : styles.container3}>
        <div className={styles.type}>{data.dealType}</div>
        <div className={styles.time}>
          {pretreatYM(data.contract_ym)}
          {pretreatDay(data.contract_day)}
        </div>
        <div className={styles.space}>{data.area}㎡</div>
        <div className={styles.floor}>{data.floor}</div>
        {data.dealType === '매매' ? (
          <div className={styles.cost}>{data.price}</div>
        ) : data.dealType === '전세' ? (
          <div className={styles.cost}>{data.guarantee}</div>
        ) : (
          <div className={styles.cost}>
            {data.guarantee} / {data.monthly}
          </div>
        )}
      </div>
    </div>
  );
}

export default DealDataItem;
