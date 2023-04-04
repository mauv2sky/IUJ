import React, { useState } from 'react';
import { RealEstateType } from '../../types/MapType';
import PriorityList from '../PriorityList/PriorityList';
import RealEstateList from '../RealEstateList/RealEstateList';
import SetPriority from '../SetPriority/SetPriority';
import styles from './MapSidebar.module.scss';

export type RealEstateListPropsType = {
  realEstateList: RealEstateType[];
  level: number;
};

function MapSidebar({ realEstateList, level }: RealEstateListPropsType) {
  const [tabIndex, setTabIndex] = useState(0);

  const onClickTab = (index: number) => {
    setTabIndex(index);
  };

  return (
    <div className={styles.component}>
      <div className={styles.tab}>
        <div onClick={() => onClickTab(0)} className={tabIndex === 0 ? styles.selected : styles['not-selected']}>
          선호 순위 설정
        </div>
        <div onClick={() => onClickTab(1)} className={tabIndex === 1 ? styles.selected : styles['not-selected']}>
          선호 순위 목록
        </div>
        <div onClick={() => onClickTab(2)} className={tabIndex === 2 ? styles.selected : styles['not-selected']}>
          실거래 목록
        </div>
      </div>
      {tabIndex === 0 && <SetPriority />}
      {tabIndex === 1 && <PriorityList />}
      {tabIndex === 2 && <RealEstateList realEstateList={realEstateList} level={level} />}
    </div>
  );
}

export default MapSidebar;
