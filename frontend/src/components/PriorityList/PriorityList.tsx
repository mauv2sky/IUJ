import React, { useEffect } from 'react';
import PriorityCard from '../PriorityCard/PriorityCard';
import { ResponsedPriorityItemType } from '../../types/MapType';
import styles from './PriorityList.module.scss';

type ResponsedPriorityType = {
  id: number;
  list: ResponsedPriorityItemType[];
};

function PriorityList() {
  const tmpPrioriyList: ResponsedPriorityType[] = [
    {
      id: 1,
      list: [
        {
          main: '편의',
          sub: '병원',
        },
        {
          main: '학군',
          sub: '유치원',
        },
        {
          main: '교통',
          sub: '지하철',
        },
        {
          main: '치안',
          sub: '치안',
        },
        {
          main: '학군',
          sub: '초등학교',
        },
      ],
    },
    {
      id: 2,
      list: [
        {
          main: '학군',
          sub: '중학교',
        },
        {
          main: '편의',
          sub: '병원',
        },

        {
          main: '교통',
          sub: '지하철',
        },
        {
          main: '문화',
          sub: '영화관',
        },
        {
          main: '치안',
          sub: '치안',
        },
      ],
    },
    {
      id: 3,
      list: [
        {
          main: '문화',
          sub: '공원',
        },
        {
          main: '치안',
          sub: '치안',
        },
        {
          main: '편의',
          sub: '편의점',
        },
        {
          main: '교통',
          sub: '정류장',
        },
        {
          main: '학군',
          sub: '초등학교',
        },
      ],
    },
    {
      id: 4,
      list: [
        {
          main: '학군',
          sub: '중학교',
        },
        {
          main: '편의',
          sub: '병원',
        },

        {
          main: '교통',
          sub: '지하철',
        },
        {
          main: '문화',
          sub: '영화관',
        },
        {
          main: '치안',
          sub: '치안',
        },
      ],
    },
    {
      id: 5,
      list: [
        {
          main: '편의',
          sub: '병원',
        },
        {
          main: '학군',
          sub: '유치원',
        },
        {
          main: '교통',
          sub: '지하철',
        },
        {
          main: '치안',
          sub: '치안',
        },
        {
          main: '학군',
          sub: '초등학교',
        },
      ],
    },
  ];

  useEffect(() => {
    console.log('선호 순위 리스트 요청');
  }, []);

  return (
    <div className={styles.component}>
      <div className={styles['component-inner']}>
        {tmpPrioriyList.map((priority) => (
          <PriorityCard key={priority.id} priorityId={priority.id} priority={priority.list} />
        ))}
      </div>
    </div>
  );
}

export default PriorityList;
