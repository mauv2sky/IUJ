import React, { useState, useEffect } from 'react';
import styles from './DealData.module.scss';
import DealDataItem from '../DealDataItem/DealDataItem';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getdetailContainerState } from '../../store/slices/detailContainerSlice';
import { DetailPropsType, DetailType } from '../DetailInformation/DetailInformation';
import DealChart from '../DealChart/DealChart';

function DealData(detaillist: DetailPropsType) {
  const dealRelist = detaillist.detailRelist.Deal;

  // const detailContainer = useAppSelector((state) => state.detailContainerSlice.detailContainer);

  useEffect(() => {
    console.log('dealRelist', dealRelist);
  }, []);

  return (
    <div className={styles.component}>
      <div>
        <DealChart />
      </div>
      <div className={styles.dealtitle}>
        <div className={styles.type}>거래타입</div>
        <div className={styles.time}>거래일</div>
        <div className={styles.space}>전용면적</div>
        <div className={styles.floor}>층</div>
        <div className={styles.cost}>금액 (만원)</div>
      </div>
      <div>
        {dealRelist &&
          dealRelist.map((data: any, index: number) => (
            <div key={index}>
              {data.deals.map((item: any, index: number) => (
                <DealDataItem key={index} dealDataItem={item} />
              ))}
            </div>
          ))}
      </div>
    </div>
  );
}

export default DealData;
