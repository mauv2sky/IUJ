import React, { useState, useEffect } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { setPriority } from '../../store/slices/prioritySlice';
import { CategoryStyleType, ResponsedPriorityItemType } from '../../types/MapType';
import { amenities, cultures, schools, securities, transports } from '../SetPriority/SetPriority';
import { pretreatPriority } from '../../utils/PretreatPriority';
import styles from './PriorityCard.module.scss';
import { requestDeletePriority } from '../../api/map';
import { customAlert } from '../../utils/CustomAlert';

/** 카테고리 명에 따라 아이콘과 색을 매핑하기위한 object */
export const categoryStyle: CategoryStyleType = {
  학군: { color: schools.color, icon: schools.icon },
  교통: { color: transports.color, icon: transports.icon },
  편의: { color: amenities.color, icon: amenities.icon },
  치안: { color: securities.color, icon: securities.icon },
  문화: { color: cultures.color, icon: cultures.icon },
};

type ResponsedPriorityItemPropsType = {
  priorityId: number;
  priority: ResponsedPriorityItemType[];
  SetPriorityDeleted: React.Dispatch<React.SetStateAction<number>>;
};

function PriorityCard({ priorityId, priority, SetPriorityDeleted }: ResponsedPriorityItemPropsType) {
  /** ========================= 변수 및 useState ========================= */
  const dispatch = useAppDispatch();
  /** 적용할 때 필요한 리스트, 인프라(ex 유치원, 병원 ...)만 가져와서 영어로 바꾼 뒤에 리스트에 담음 */
  const priorityForRequest: string[] = pretreatPriority(priority);

  /** ========================= event handler ========================= */
  /** 적용 버튼 클릭 시 */
  const onClickApplyBtn = () => {
    dispatch(setPriority({ priority: priorityForRequest, appliedPriority: priority }));
  };

  /** 삭제 버튼 클릭 시 */
  const onClickDeleteBtn = () => {
    requestDeletePriorityForComponent();
  };

  /** ========================= Axios ========================= */
  /** 삭제 요청 함수 */
  const requestDeletePriorityForComponent = async () => {
    try {
      const res = await requestDeletePriority(priorityId);
      customAlert('선호 순위가 삭제되었습니다.');
      SetPriorityDeleted((prev) => prev + 1);
      console.log(res);
    } catch (err) {
      console.error(err);
    }
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
