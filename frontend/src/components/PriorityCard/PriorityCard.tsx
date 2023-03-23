import React, { useState, useEffect } from 'react';
import { FaSchool, FaBus, FaHospitalUser } from 'react-icons/fa';
import { MdSecurity, MdMovie } from 'react-icons/md';
import { amenities, cultures, schools, securities, transports } from '../SetPriority/SetPriority';
import styles from './PriorityCard.module.scss';

type CategoryStyleType = {
  [category: string]: {
    color: string;
    icon: React.ReactNode;
  };
};

/** 카테고리 명에 따라 아이콘과 색을 매핑하기위한 object */
const categoryStyle: CategoryStyleType = {
  학군: { color: schools.color, icon: schools.icon },
  교통: { color: transports.color, icon: transports.icon },
  편의: { color: amenities.color, icon: amenities.icon },
  치안: { color: securities.color, icon: securities.icon },
  문화: { color: cultures.color, icon: cultures.icon },
};

export type ResponsedPriorityItemType = {
  main: string;
  sub: string;
};

type ResponsedPriorityItemPropsType = {
  priorityId: number;
  priority: ResponsedPriorityItemType[];
};

function PriorityCard({ priorityId, priority }: ResponsedPriorityItemPropsType) {
  /** ========================= 변수 및 useState ========================= */
  /** 적용할 때 필요한 리스트 */
  const [priorityForRequest, setPriorityForRequest] = useState<string[]>([]);

  /** ========================= useEffect ========================= */

  /** 인프라(ex 유치원, 병원 ...)만 가져와서 리스트에 담음 */
  useEffect(() => {
    const newPriority = priority.map((priorityItem) => {
      return priorityItem.sub;
    });

    setPriorityForRequest(newPriority);
  }, []);

  /** ========================= event handler ========================= */

  /** 적용 버튼 클릭 시 */
  const onClickApplyBtn = () => {
    console.log(priorityForRequest, '로 선호 순위 적용 요청');
  };

  /** 삭제 버튼 클릭 시 */
  const onClickDeleteBtn = () => {
    console.log(priorityId, '번 선호 순위 삭제 요청');
  };

  return (
    <div className={styles.component}>
      {priority.map((priorityItem) => (
        <div key={priorityItem.sub} className={styles['priority-item']}>
          <div className={styles['icon-div']} style={{ border: `2px solid ${categoryStyle[priorityItem.main].color}` }}>
            <span style={{ color: categoryStyle[priorityItem.main].color }}>{categoryStyle[priorityItem.main].icon}</span>
          </div>
          <p>{priorityItem.sub}</p>
        </div>
      ))}
      <div className={styles['priority-item-option']}>
        <button className={styles['apply-btn']} onClick={onClickApplyBtn}>
          적용
        </button>
        <button className={styles['delete-btn']} onClick={onClickDeleteBtn}>
          삭제
        </button>
      </div>
    </div>
  );
}

export default PriorityCard;
