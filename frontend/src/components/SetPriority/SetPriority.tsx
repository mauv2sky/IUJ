import React, { useEffect, useState, CSSProperties } from 'react';
import { GrRefresh } from 'react-icons/gr';
import { FaSchool, FaBus, FaHospitalUser } from 'react-icons/fa';
import { MdSecurity, MdMovie } from 'react-icons/md';
import { AiFillSave, AiFillCloseCircle } from 'react-icons/ai';
import styles from './SetPriority.module.scss';

type priorityListType = {
  kind: string;
  color: string;
  icon: React.ReactNode;
};

function SetPriority() {
  /** ============================== 변수, useState ============================== */
  const [priorityList, setPrirortyList] = useState<priorityListType[]>([]);
  const defaultDummyList = [0, 1, 2, 3, 4];
  const [dummyList, setDummyList] = useState<number[]>(defaultDummyList);
  const [priorityListForRequest, setPriorityListForRequest] = useState<string[]>([]);
  const schools = {
    title: '학군',
    kind: ['어린이집', '유치원', '초등학교', '중학교', '고등학교', '특수학교', '입시학원', '예체능학원'],
    icon: <FaSchool />,
    color: '#c40000',
  };
  const transports = {
    title: '교통',
    kind: ['지하철', '정류장'],
    icon: <FaBus />,
    color: '#dc9e00',
  };
  const amenities = {
    title: '편의 시설',
    kind: ['병원', '마트', '편의점'],
    icon: <FaHospitalUser />,
    color: '#6aae45',
  };
  const securities = {
    title: '치안',
    kind: ['치안'],
    icon: <MdSecurity />,
    color: '#525cb6',
  };
  const cultures = {
    title: '문화',
    kind: ['공원', '영화관'],
    icon: <MdMovie />,
    color: '#55286f',
  };

  const categories = [schools, transports, amenities, securities, cultures];

  /** ============================== useEffect ============================== */
  useEffect(() => {
    const newDummyList = defaultDummyList.slice(priorityList.length, 5);
    setDummyList(newDummyList);
  }, [priorityList]);

  useEffect(() => {
    console.log(dummyList);
  }, [dummyList]);

  /** ============================== 함수 ============================== */

  /** 우선 순위 리스트를 요청용으로 전처리하기 위한 함수 */
  const pretreat = (list: priorityListType[]) => {
    const listForRequest = list.map((priority) => {
      return priority.kind;
    });

    return listForRequest;
  };

  /** 우선 순위 삭제 */
  const deletePriority = (kind: string) => {
    for (let i = 0; i < priorityList.length; i++) {
      if (priorityList[i].kind === kind) {
        const newPriorityList = priorityList.filter((priority) => {
          return priority.kind !== kind;
        });

        setPrirortyList(newPriorityList);

        return;
      }
    }
  };

  /** ============================== handleOnEvent ============================== */

  /** 카테고리 아이템 클릭 시 */
  const onClickKind = (kind: string, color: string, icon: React.ReactNode) => {
    /** 클릭한 카테고리가 이미 우선 순위 리스트에 포함되어 있는 경우 */
    for (let i = 0; i < priorityList.length; i++) {
      if (priorityList[i].kind === kind) {
        const newPriorityList = priorityList.filter((priority) => {
          return priority.kind !== kind;
        });

        setPrirortyList(newPriorityList);

        return;
      }
    }

    /** 포함되어 있지 않은 경우 */
    /** 5개가 다 찼으면 더 이상 추가되지 않는다. */
    if (priorityList.length == 5) {
      return;
    }

    /** 리스트에 추가 */
    setPrirortyList((prev) => [...prev, { kind, color, icon }]);
    setPriorityListForRequest((prev) => [...prev, kind]);
  };

  /** 우선 순위 초기화 */
  const onClickRefresh = () => {
    setPrirortyList([]);
  };

  /** 우선 순위 삭제 */
  const onClickDelete = (kind: string) => {
    deletePriority(kind);
  };

  /** 선호 순위 저장하기 버튼 클릭 시 */
  const onClickSave = () => {
    setPriorityListForRequest(pretreat(priorityList));
    console.log(priorityListForRequest, '로 선호 순위 저장 요청');
  };

  /** 선호 순위 적용 버튼 클릭 시 */
  const onClickApply = () => {
    setPriorityListForRequest(pretreat(priorityList));
    console.log(priorityListForRequest, '로 선호 순위 적용 요청');
  };

  return (
    <div className={styles.component}>
      <h1 className={styles.title}>부동산 점수 환산을 위한 우선 순위를 설정해주세요.</h1>
      <div className={styles.graph}>
        <GrRefresh className={styles.refresh} onClick={onClickRefresh} />
        {priorityList.map((graph, index) => (
          <div key={graph.kind} className={styles['graph-item']} style={{ height: `calc(90% - ${index * 7}%)` }}>
            <div style={{ backgroundColor: graph.color }} onClick={() => onClickDelete(graph.kind)}>
              <div style={{ color: graph.color }}>{graph.icon}</div>
            </div>
            <p>{graph.kind}</p>
          </div>
        ))}
        {dummyList.map((value) => (
          <div key={value} className={styles['graph-item']} style={{ height: `calc(90% - ${value * 7}%)` }}>
            <div style={{ backgroundColor: 'grey', marginBottom: '23.5px' }}></div>
          </div>
        ))}
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
