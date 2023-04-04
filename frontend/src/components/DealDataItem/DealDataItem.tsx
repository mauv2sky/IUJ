import React from 'react';
import styles from './DealDataItem.module.scss';

function DealDataItem(dealDataItem: any) {
  // console.log('여긴 어디 나는 누구', dealDataItem.dealDataItem);
  const data = dealDataItem.dealDataItem;

  return (
    <div>
      <div className={data.dealType === '매매' ? styles.container : data.dealType === '전세' ? styles.container2 : styles.container3}>
        <div className={styles.type}>{data.dealType}</div>
        <div className={styles.time}>
          {data.contract_ym}
          {data.contract_day}
        </div>
        <div className={styles.space}>{data.area}</div>
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
