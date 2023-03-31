import React, { useState, useEffect } from 'react';
import RealEstateItem from '../RealEstateItem/RealEstateItem';
import styles from './RealEstateList.module.scss';
import { RealEstateListPropsType } from '../MapSidebar/MapSidebar';

function RealEstateList({ realEstateList, level }: RealEstateListPropsType) {
  const [scrollY, setScrollY] = useState(0);
  const onScrollRealEstateList = (e: React.UIEvent) => {
    const target = e.target as Element;

    setScrollY(target.scrollTop);
  };

  if (level > 4) {
    return <div className={styles.component}>지도를 더 확대해주세요!</div>;
  }

  return (
    <div className={styles.component} onScroll={onScrollRealEstateList}>
      {realEstateList &&
        realEstateList.map((realEstate, index) => {
          return <RealEstateItem key={index} realEstate={realEstate} scrollY={scrollY} />;
        })}
    </div>
  );
}

export default RealEstateList;
