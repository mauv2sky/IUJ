import React, { useState, useEffect } from 'react';
import RealEstateItem from '../RealEstateItem/RealEstateItem';
import styles from './RealEstateList.module.scss';
import { RealEstateListPropsType } from '../MapSidebar/MapSidebar';
import { useAppSelector } from '../../store/hooks';
import AppliedPriority from '../AppliedPriority/AppliedPriority';

function RealEstateList({ realEstateList, level }: RealEstateListPropsType) {
  /** 스크롤 */
  const [scrollY, setScrollY] = useState(0);
  /** 선호 필터 */
  const priority = useAppSelector((state) => state.prioritySlice.priority);

  /** 컴포넌트에 스크롤 이벤트 발생 시 */
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
