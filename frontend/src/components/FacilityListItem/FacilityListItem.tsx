import React from 'react';
import styles from './FacilityListItem.module.scss';

export type FacilityListItemType = {
  name: string;
  address: string;
  latlng: number[];
};

type FacilityListItemPropsType = {
  facilitylistitem: FacilityListItemType;
};

function FacilityListItem({ facilitylistitem }: FacilityListItemPropsType) {
  return (
    <div className={styles.container}>
      <div className={styles.itemname}>{facilitylistitem.name}</div>
      <div className={styles.itemaddress}>{facilitylistitem.address}</div>
    </div>
  );
}

export default FacilityListItem;
