import React from 'react';
import RealEstateItem, { RealEstateType } from '../RealEstateItem/RealEstateItem';
import styles from './RealEstateList.module.scss';

function RealEstateList() {
  const tmpRElist: RealEstateType[] = [
    {
      place: {
        name: '명지 더 웨스턴',
        type: '아파트',
        address: ['', '부산시 강서구 명지동 3399'],
        total_score: 87.56,
        score: {
          병원: 70,
          초등학교: 50,
          치안: 40,
          공원: 90,
          정류장: 60,
        },
      },
    },
    {
      place: {
        name: '명지 더 웨스턴',
        type: '아파트',
        address: ['', '부산시 강서구 명지동 3399'],
        total_score: 87.56,
        score: {
          병원: 70,
          초등학교: 50,
          치안: 40,
          공원: 90,
          정류장: 60,
        },
      },
    },
    {
      place: {
        name: '명지 더 웨스턴',
        type: '아파트',
        address: ['', '부산시 강서구 명지동 3399'],
        total_score: 87.56,
        score: {
          병원: 70,
          초등학교: 50,
          치안: 40,
          공원: 90,
          정류장: 60,
        },
      },
    },
  ];

  return (
    <div className={styles.component}>
      {tmpRElist.map((RE) => (
        <RealEstateItem RE={RE} />
      ))}
    </div>
  );
}

export default RealEstateList;
