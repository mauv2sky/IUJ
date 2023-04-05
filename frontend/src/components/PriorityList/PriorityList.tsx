import React, { useState, useEffect } from 'react';
import PriorityCard from '../PriorityCard/PriorityCard';
import { ResponsedPriorityItemType } from '../../types/MapType';
import styles from './PriorityList.module.scss';
import { requestPriorityList } from '../../api/map';

type ResponsedPriorityType = {
  id: number;
  list: ResponsedPriorityItemType[];
};

function PriorityList() {
  const [priorityList, setPriorityList] = useState<ResponsedPriorityType[]>([]);
  const [priorityDeleted, SetPriorityDeleted] = useState<number>(0);

  useEffect(() => {
    requestPrioriyListForComponent();
  }, [priorityDeleted]);

  const requestPrioriyListForComponent = async () => {
    try {
      const res = await requestPriorityList();
      console.log(res);
      setPriorityList(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.component}>
      <div className={styles['component-inner']}>
        {priorityList.map((priority) => (
          <PriorityCard key={priority.id} priorityId={priority.id} priority={priority.list} SetPriorityDeleted={SetPriorityDeleted} />
        ))}
      </div>
    </div>
  );
}

export default PriorityList;
