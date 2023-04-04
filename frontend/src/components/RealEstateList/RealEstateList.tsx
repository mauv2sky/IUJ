import React from 'react';
import RealEstateItem from '../RealEstateItem/RealEstateItem';
import styles from './RealEstateList.module.scss';
import { RealEstateListPropsType } from '../MapSidebar/MapSidebar';

function RealEstateList({ realEstateList, level }: RealEstateListPropsType) {
  if (level > 4) {
    return <div className={styles.require}>지도를 더 확대해주세요.</div>;
  }

  return (
    <div className={styles.component}>
      {realEstateList &&
        realEstateList.map((realEstate, index) => {
          return <RealEstateItem key={index} realEstate={realEstate} />;
        })}
    </div>
  );
}

export default RealEstateList;
