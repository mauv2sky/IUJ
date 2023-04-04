import React, { useState } from 'react';
import { GrRefresh } from 'react-icons/gr';
import { FaSchool, FaBus, FaHospitalUser } from 'react-icons/fa';
import { MdSecurity, MdMovie } from 'react-icons/md';
import { AiFillSave } from 'react-icons/ai';
import { pretreatPriority } from '../../utils/PretreatPriority';
import { customAlert } from '../../utils/CustomAlert';
import { useDispatch } from 'react-redux';
import { setPriority } from '../../store/slices/prioritySlice';
import { priorityType, ResponsedPriorityItemType } from '../../types/MapType';
import styles from './SetPriority.module.scss';

export const schools = {
  main: '학군',
  subList: ['어린이집', '유치원', '초등학교', '중학교', '고등학교', '특수학교', '입시학원', '예체능학원'],
  icon: <FaSchool />,
  color: '#DCBFB7',
};

export const transports = {
  main: '교통',
  subList: ['지하철', '버스'],
  icon: <FaBus />,
  color: '#DAB2E0',
};

export const amenities = {
  main: '편의',
  subList: ['병원', '마트', '편의점', '관공서'],
  icon: <FaHospitalUser />,
  color: '#DBCEAF',
};

export const securities = {
  main: '치안',
  subList: ['치안'],
  icon: <MdSecurity />,
  color: '#B0C6DD',
};

export const cultures = {
  main: '문화',
  subList: ['공원', '영화관', '서점', '미술관', '도서관'],
  icon: <MdMovie />,
  color: '#A4D8C5',
};

const categories = [schools, transports, amenities, securities, cultures];

function SetPriority() {
  /** ============================== 변수, useState ============================== */
  const dispatch = useDispatch();
  const [priority, setPrirorty] = useState<priorityType[]>([]);
  const dummyPriority = [0, 1, 2, 3, 4];

  /** ============================== 함수 ============================== */
  /** 우선 순위 삭제 */
  const deletePriority = (sub: string) => {
    for (let i = 0; i < priority.length; i++) {
      if (priority[i].sub === sub) {
        const newPriorityList = priority.filter((priority) => {
          return priority.sub !== sub;
        });

        setPrirorty(newPriorityList);

        return;
      }
    }
  };

  /** ============================== event handler ============================== */
  /** 카테고리 아이템 클릭 시 */
  const onClickKind = (main: string, sub: string, color: string, icon: React.ReactNode) => {
    /** 클릭한 카테고리가 이미 우선 순위 리스트에 포함되어 있는 경우 */
    for (let i = 0; i < priority.length; i++) {
      if (priority[i].sub === sub) {
        const newPriorityList = priority.filter((priority) => {
          return priority.sub !== sub;
        });

        setPrirorty(newPriorityList);

        return;
      }
    }

    /** 포함되어 있지 않은 경우 */
    /** 5개가 다 찼으면 더 이상 추가되지 않는다. */
    if (priority.length == 5) {
      return;
    }

    /** 리스트에 추가 */
    setPrirorty((prev) => [...prev, { main, sub, color, icon }]);
  };

  /** 우선 순위 초기화 */
  const onClickRefresh = () => {
    setPrirorty([]);
  };

  /** 우선 순위 삭제 */
  const onClickDelete = (sub: string) => {
    deletePriority(sub);
  };

  /** 선호 순위 저장하기 버튼 클릭 시 */
  const onClickSave = () => {
    if (priority.length === 0) {
      customAlert('선호 순위를 설정해주세요.');
      return;
    }

    console.log(pretreatPriority(priority), '로 선호 순위 저장 요청');
  };

  /** 선호 순위 적용 버튼 클릭 시 */
  const onClickApply = () => {
    if (priority.length === 0) {
      customAlert('선호 순위를 설정해주세요.');
      return;
    }

    const appliedPriority: ResponsedPriorityItemType[] = priority.map((item) => {
      return { main: item.main, sub: item.sub };
    });

    dispatch(setPriority({ priority: pretreatPriority(priority), appliedPriority }));
  };

  return (
    <div className={styles.component}>
      <h1 className={styles.title} style={{ margin: '2rem 0 0.5rem 0' }}>
        부동산 맞춤 추천을 위한
      </h1>
      <h1 className={styles.title}>주변 인프라의 선호 순위를 설정해주세요.</h1>
      <div className={styles.graph}>
        <GrRefresh className={styles.refresh} onClick={onClickRefresh} />
        {priority.map((graph, index) => (
          <div key={graph.sub} className={styles['graph-item']} style={{ height: `calc(90% - ${index * 7}%)` }}>
            <div style={{ backgroundColor: graph.color }} onClick={() => onClickDelete(graph.sub)}>
              <div style={{ color: graph.color }}>{graph.icon}</div>
            </div>
            <p>{graph.sub}</p>
          </div>
        ))}
        {priority.length === 0 &&
          dummyPriority.map((value) => (
            <div key={value} className={styles['graph-item']} style={{ height: `calc(90% - ${value * 7}%)` }}>
              <div style={{ backgroundColor: 'rgb(240, 240, 240)', marginBottom: '23.5px' }}></div>
            </div>
          ))}
        {priority.length === 0 && <p className={styles['priority-comment']}>하단의 원하는 인프라를 클릭해 선호 순위를 설정해주세요.</p>}
      </div>
      <div className={styles.priority}>
        {categories.map((category, index) => (
          <div key={index} className={styles['priority-item']}>
            <div className={styles['priority-category']}>
              <div className={styles['priority-category-title']}>
                <span style={{ color: category.color }} className={styles['priority-category-title-text']}>
                  {category.icon}
                </span>
                <span>{category.main}</span>
              </div>
            </div>
            <div className={styles['priority-category-content']}>
              {category.subList.map((sub, index) => (
                <span key={index} className={styles['priority-category-item']} onClick={() => onClickKind(category.main, sub, category.color, category.icon)}>
                  {sub}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className={styles['button-div']}>
        <p onClick={onClickSave}>
          <AiFillSave />
          <span>선호 순위 저장하기</span>
        </p>
        <button onClick={onClickApply}>적용</button>
      </div>
    </div>
  );
}

export default SetPriority;
