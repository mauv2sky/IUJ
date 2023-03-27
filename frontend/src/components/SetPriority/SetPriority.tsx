import React, { useState } from 'react';
import { GrRefresh } from 'react-icons/gr';
import { FaSchool, FaBus, FaHospitalUser } from 'react-icons/fa';
import { MdSecurity, MdMovie } from 'react-icons/md';
import { AiFillSave } from 'react-icons/ai';
import { customAlert } from '../../utils/CustomAlert';
import styles from './SetPriority.module.scss';
import { useDispatch } from 'react-redux';
import { setPriority } from '../../store/slices/prioritySlice';

type priorityType = {
  kind: string;
  color: string;
  icon: React.ReactNode;
};

type priorityMapType = {
  [key: string]: string;
};

const priorityMapForRequest: priorityMapType = {
  서점: 'BOOKSTORE',
  버스: 'BUS_STOP',
  영화관: 'CINEMA',
  편의점: 'CONVENIENCE_STORE',
  입시학원: 'EDU_ACADEMY',
  초등학교: 'ELEMENTARY_SCHOOL',
  예체능학원: 'ENTERTAINMENT_ACADEMY',
  미술관: 'GALLERY',
  고등학교: 'HIGH_SCHOOL',
  병원: 'HOSPITAL',
  유치원: 'KINDERGARTEN',
  중학교: 'MIDDLE_SCHOOL',
  어린이집: 'NURSERY',
  공원: 'PARK',
  치안: 'SAFETY',
  마트: 'SHOPPING',
  특수학교: 'SPECIAL_SCHOOL',
  지하철: 'SUBWAY',
};

export const schools = {
  title: '학군',
  kind: ['어린이집', '유치원', '초등학교', '중학교', '고등학교', '특수학교', '입시학원', '예체능학원', '어린이집'],
  icon: <FaSchool />,
  color: '#DCBFB7',
};

export const transports = {
  title: '교통',
  kind: ['지하철', '버스'],
  icon: <FaBus />,
  color: '#DAB2E0',
};

export const amenities = {
  title: '편의',
  kind: ['병원', '마트', '편의점'],
  icon: <FaHospitalUser />,
  color: '#DBCEAF',
};

export const securities = {
  title: '치안',
  kind: ['치안'],
  icon: <MdSecurity />,
  color: '#B0C6DD',
};

export const cultures = {
  title: '문화',
  kind: ['공원', '영화관', '서점', '미술관'],
  icon: <MdMovie />,
  color: '#A4D8C5',
};

const categories = [schools, transports, amenities, securities, cultures];

function SetPriority() {
  /** ============================== 변수, useState ============================== */
  const dispatch = useDispatch();
  const [priority, setPrirorty] = useState<priorityType[]>([]);
  const dummyPriority = [0, 1, 2, 3, 4];
  const [priorityForRequest, setPriorityForRequest] = useState<string[]>([]);

  /** ============================== 함수 ============================== */
  /** 우선 순위 리스트를 요청용으로 전처리하기 위한 함수 */
  const pretreat = (list: priorityType[]) => {
    const listForRequest = list.map((priority) => {
      return priorityMapForRequest[priority.kind];
    });

    return listForRequest;
  };

  /** 우선 순위 삭제 */
  const deletePriority = (kind: string) => {
    for (let i = 0; i < priority.length; i++) {
      if (priority[i].kind === kind) {
        const newPriorityList = priority.filter((priority) => {
          return priority.kind !== kind;
        });

        setPrirorty(newPriorityList);

        return;
      }
    }
  };

  /** ============================== event handler ============================== */
  /** 카테고리 아이템 클릭 시 */
  const onClickKind = (kind: string, color: string, icon: React.ReactNode) => {
    /** 클릭한 카테고리가 이미 우선 순위 리스트에 포함되어 있는 경우 */
    for (let i = 0; i < priority.length; i++) {
      if (priority[i].kind === kind) {
        const newPriorityList = priority.filter((priority) => {
          return priority.kind !== kind;
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
    setPrirorty((prev) => [...prev, { kind, color, icon }]);
  };

  /** 우선 순위 초기화 */
  const onClickRefresh = () => {
    setPrirorty([]);
  };

  /** 우선 순위 삭제 */
  const onClickDelete = (kind: string) => {
    deletePriority(kind);
  };

  /** 선호 순위 저장하기 버튼 클릭 시 */
  const onClickSave = () => {
    if (priority.length === 0) {
      customAlert('선호 순위를 설정해주세요.');
      return;
    }

    console.log(pretreat(priority), '로 선호 순위 저장 요청');
  };

  /** 선호 순위 적용 버튼 클릭 시 */
  const onClickApply = () => {
    if (priority.length === 0) {
      customAlert('선호 순위를 설정해주세요.');
      return;
    }

    dispatch(setPriority({ priority: pretreat(priority) }));
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
          <div key={graph.kind} className={styles['graph-item']} style={{ height: `calc(90% - ${index * 7}%)` }}>
            <div style={{ backgroundColor: graph.color }} onClick={() => onClickDelete(graph.kind)}>
              <div style={{ color: graph.color }}>{graph.icon}</div>
            </div>
            <p>{graph.kind}</p>
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
                <span>{category.title}</span>
              </div>
            </div>
            <div className={styles['priority-category-content']}>
              {category.kind.map((kind, index) => (
                <span key={index} className={styles['priority-category-item']} onClick={() => onClickKind(kind, category.color, category.icon)}>
                  {kind}
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
