import React from 'react';
import styles from './DealDataItem.module.scss';

export type DealDataItemType = {
  [key: string]: number | string | string | string | string | string;
};
type DealDataItemPropsType = {
  dealDataItem: DealDataItemType;
};
function DealDataItem({ dealDataItem }: DealDataItemPropsType) {
  console.log('여긴 어디 나는 누구', dealDataItem);
  return (
    <div className={styles.container}>
      <div className={styles.itemname}>{dealDataItem.name}</div>
      <div className={styles.itemaddress}>{dealDataItem.addr}</div>
    </div>
  );
}

export default DealDataItem;
