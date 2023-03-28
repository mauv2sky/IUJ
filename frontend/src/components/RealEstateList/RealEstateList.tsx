import React, { useEffect, useState } from 'react';
import RealEstateItem, { RealEstateType } from '../RealEstateItem/RealEstateItem';
import styles from './RealEstateList.module.scss';

function RealEstateList() {
  const [scrollY, setScrollY] = useState(0);
  const tmpRElist = [
    {
      id: 1,
      name: '명지 더 웨스턴',
      type: '아파트',
      address: ['', '부산시 강서구 명지동 3399'],
      total_score: 82.56,
      score: {
        병원: 90,
        초등학교: 70,
        치안: 80,
        공원: 60,
        정류장: 90,
      },
      average_deal: {
        deal_type: '전세',
        price: 0,
        guarantee: 35000,
        monthly: 0,
      },
      range_extent: [52.56, 84.61],
      range_floor: [1, 21],
    },
    {
      id: 2,
      name: '명지 퀸덤 1차 에디슨타운 아파트',
      type: '아파트',
      address: ['', '부산시 강서구 명지동 3230'],
      total_score: 93.56,
      score: {
        병원: 97,
        초등학교: 90,
        치안: 80,
        공원: 90,
        정류장: 90,
      },
      average_deal: {
        deal_type: '월세',
        price: 0,
        guarantee: 20000,
        monthly: 50,
      },
      range_extent: [52.56, 84.61],
      range_floor: [1, 21],
    },
    {
      id: 3,
      name: 'e편한세상 명지',
      type: '아파트',
      address: ['', '부산시 강서구 명지동 3230'],
      total_score: 50.56,
      score: {
        병원: 70,
        초등학교: 50,
        치안: 40,
        공원: 90,
        정류장: 60,
      },
      average_deal: {
        deal_type: '매매',
        price: 55000,
        guarantee: 0,
        monthly: 0,
      },
      range_extent: [52.56, 84.61],
      range_floor: [1, 21],
    },
    {
      id: 4,
      name: '명지 더 웨스턴',
      type: '아파트',
      address: ['', '부산시 강서구 명지동 3399'],
      total_score: 82.56,
      score: {
        병원: 90,
        초등학교: 70,
        치안: 80,
        공원: 60,
        정류장: 90,
      },
      average_deal: {
        deal_type: '전세',
        price: 0,
        guarantee: 35000,
        monthly: 0,
      },
      range_extent: [52.56, 84.61],
      range_floor: [1, 21],
    },
    {
      id: 5,
      name: '명지 퀸덤 1차 에디슨타운 아파트',
      type: '아파트',
      address: ['', '부산시 강서구 명지동 3230'],
      total_score: 93.56,
      score: {
        병원: 97,
        초등학교: 90,
        치안: 80,
        공원: 90,
        정류장: 90,
      },
      average_deal: {
        deal_type: '월세',
        price: 0,
        guarantee: 20000,
        monthly: 50,
      },
      range_extent: [52.56, 84.61],
      range_floor: [1, 21],
    },
    {
      id: 6,
      name: 'e편한세상 명지',
      type: '아파트',
      address: ['', '부산시 강서구 명지동 3230'],
      total_score: 50.56,
      score: {
        병원: 70,
        초등학교: 50,
        치안: 40,
        공원: 90,
        정류장: 60,
      },
      average_deal: {
        deal_type: '매매',
        price: 55000,
        guarantee: 0,
        monthly: 0,
      },
      range_extent: [52.56, 84.61],
      range_floor: [1, 21],
    },
  ];

  const onScrollREList = (e: React.UIEvent) => {
    const target = e.target as Element;

    setScrollY(target.scrollTop);
  };

  return (
    <div className={styles.component} onScroll={onScrollREList}>
      {tmpRElist.map((RE, index) => (
        <RealEstateItem key={index} RE={RE} scrollY={scrollY} />
      ))}
    </div>
  );
}

export default RealEstateList;
