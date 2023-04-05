import React from 'react';
import styles from './FacilityListItem.module.scss';

export type FacilityListItemType = {
  [key: string]: number | string | string | string | string | string | number;
};

type FacilityListItemPropsType = {
  facilitylistitem: FacilityListItemType;
};

function FacilityListItem({ facilitylistitem }: FacilityListItemPropsType) {
  return (
    <div className={styles.container}>
      <div className={styles.itemname}>{facilitylistitem.name}</div>
      <div className={styles.itemaddress}>{facilitylistitem.addr}</div>
      <div className={styles.distance}>집에서 {facilitylistitem.distance}km</div>
    </div>
  );
}

export default FacilityListItem;
