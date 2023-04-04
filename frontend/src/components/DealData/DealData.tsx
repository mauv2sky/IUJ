import React, { useState, useEffect } from 'react';
import styles from './DealData.module.scss';
import DealDataItem from '../DealDataItem/DealDataItem';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getdetailContainerState } from '../../store/slices/detailContainerSlice';
import { DetailPropsType, DetailType } from '../DetailInformation/DetailInformation';
import { DealChart, DealType } from '../DealChart/DealChart';
import axios from 'axios';

/** APIURL */
const APIURL = 'http://localhost:5000';

function DealData(detaillist: DetailPropsType) {
  const dealRelist = detaillist.detailRelist.Deal;
  const [dealChartlist, setDealChartlist] = useState<DealType>();

  useEffect(() => {
    axios({
      method: 'get',
      // url: APIURL + `/api/place/${props.type}/${props.id}`,
      url: APIURL + `/api/place/APT/9/graph`,
    })
      .then((response) => {
        // console.log('데이터 전송 성공이구아나');
        // console.log(response.data);
        setDealChartlist(response.data);
      })
      .catch((error) => {
        // console.error('데이터 전송 실패이구아나');
        console.error(error);
      });
  }, []);

  return (
    <div className={styles.component}>
      <div>
        <DealChart dealChartlist={dealChartlist} />
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
