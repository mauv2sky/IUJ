import React from 'react';
import styles from './FacilityListItem.module.scss';

export type FacilityListItemType = {
  [key: string]: number | string | string | string | string | string;
};

type FacilityListItemPropsType = {
  facilitylistitem: FacilityListItemType;
};

function FacilityListItem({ facilitylistitem }: FacilityListItemPropsType) {
  return (
    <div className={styles.container}>
      <div className={styles.itemname}>{facilitylistitem.name}</div>
      <div className={styles.itemaddress}>{facilitylistitem.addr}</div>
    </div>
  );
}

export default FacilityListItem;
