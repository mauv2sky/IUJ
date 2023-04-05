import React from 'react';
import styles from './FacilityListItem.module.scss';

export type FacilityListItemType = {
  [key: string]: number | string | string | string | string | string | number;
};

type FacilityListItemPropsType = {
  facilitylistitem: FacilityListItemType;
};

function FacilityListItem({ facilitylistitem }: FacilityListItemPropsType) {
  const address = facilitylistitem.addr as string;
  const pretreatedAddressList = address.split(' ').slice(0, 2);
  const pretreatedAddress = pretreatedAddressList[0] + ' ' + pretreatedAddressList[1];

  return (
    <div className={styles.container}>
      <div className={styles.itemname}>{facilitylistitem.name}</div>
      <div className={styles.itemaddress}>{pretreatedAddress}</div>
      <div className={styles.distance}>{facilitylistitem.distance}km</div>
    </div>
  );
}

export default FacilityListItem;
