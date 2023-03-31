import React, { useState } from 'react';
import FacilityListItem, { FacilityListItemType } from '../FacilityListItem/FacilityListItem';
import styles from './FacilityList.module.scss';

export type FacilityType = {
  [key: string]: number | string | string | string | string | string;
  // id: number;
  // name: string;
  // type: string;
  // lat: string;
  // lng: string;
  // addr: string;
};

type FacilityPropsType = {
  facilitylist: FacilityType[];
};

function FacilityList({ facilitylist }: FacilityPropsType) {
  const facilitylistitem: FacilityListItemType = {
    id: 0,
    name: '',
    type: '',
    lat: '',
    lng: '',
    addr: '',
  };

  return (
    <div className={styles.component}>
      <div>
        {facilitylist.map((item, index) => (
          <div key={index}>
            <FacilityListItem facilitylistitem={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default FacilityList;
