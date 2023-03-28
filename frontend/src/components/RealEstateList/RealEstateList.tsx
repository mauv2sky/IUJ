import React, { useState, useEffect } from 'react';
import RealEstateItem from '../RealEstateItem/RealEstateItem';
import { useAppSelector } from '../../store/hooks';
import { RealEstateType } from '../../types/MapType';
import styles from './RealEstateList.module.scss';
import { RealEstateListPropsType } from '../MapSidebar/MapSidebar';

function RealEstateList({ realEstateList }: RealEstateListPropsType) {
  const [scrollY, setScrollY] = useState(0);
  const onScrollRealEstateList = (e: React.UIEvent) => {
    const target = e.target as Element;

    setScrollY(target.scrollTop);
  };

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
