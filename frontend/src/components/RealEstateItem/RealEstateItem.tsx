import React, { useEffect, useRef, useState } from 'react';
import CountUp from 'react-countup';
import { RiQuestionnaireFill } from 'react-icons/ri';
import test from '../../assets/test.jpg';
import styles from './RealEstateItem.module.scss';

export type RealEstateType = {
  place: {
    id: number;
    name: string;
    type: string;
    address: string[];
    total_score: number;
    score: {
      [kind: string]: number | undefined;
    };
    average_deal: {
      deal_type: string;
      price: number;
      guarantee: number;
      monthly: number;
    };
    range_extent: number[];
    range_floor: number[];
  };
};

type RealEstatePropsType = {
  RE: RealEstateType;
  scrollY: number;
};

function RealEstateItem({ RE, scrollY }: RealEstatePropsType) {
  /** =================================== 변수, useState, useRef =================================== */
  const [showGraph, setShowGraph] = useState<boolean>(false);
  const graphRef = useRef<HTMLDivElement>(null);
  const graphInnerRef = useRef<HTMLDivElement>(null);

  /** =================================== useEffect =================================== */
  /** 물음표 버튼을 누르면 옆에 그래프가 뜨도록 함 */
  /** css로 하면 absolute로 해도 overflow로 처리되는 문제로 인해 JS로 처리 */
  useEffect(() => {
    const graphBtn = document.getElementById('graph-btn' + RE.place.type + RE.place.id.toString());
    graphBtn?.addEventListener('click', function () {
      const component = document.getElementById('component' + RE.place.type + RE.place.id.toString());
      const graph = document.getElementById('graph' + RE.place.type + RE.place.id.toString());
      const componentPos = component?.getBoundingClientRect();

      if (graph && componentPos && component) {
        graph.style.height = getComputedStyle(component).height;
        graph.style.width = getComputedStyle(component).width;
        graph.style.top = componentPos.top + 'px';
        graph.style.left = componentPos.left + component.offsetWidth + 10 + 'px';
      }
    });
  }, []);

  /** 그래프 버튼 누르면 안쪽 부분 투명도 없게 */
  useEffect(() => {
    if (showGraph && graphInnerRef.current) {
      graphInnerRef.current.style.opacity = '1';
    }
  }, [showGraph]);

  /** RealEstateList 컴포넌트 내에서 스크롤 움직이면 그래프 없어지게 */
  useEffect(() => {
    hideGraph();
  }, [scrollY]);

  /** =================================== function, event handler =================================== */
  /** 그래프 버튼 클릭 시 */
  const onClickGraphBtn = () => {
    if (showGraph) {
      hideGraph();
    } else {
      setShowGraph(true);
    }
  };

  /** 그래프 닫을 때 처리 */
  const hideGraph = () => {
    if (graphRef.current && graphInnerRef.current) {
      graphRef.current.style.width = '0'; // 검은 배경의 넓이는 줄어들고
      graphInnerRef.current.style.opacity = '0'; // 내부의 투명도를 최대로 함
    }

    /** 위 transition이 실행되고 나면 그래프 */
    setTimeout(() => {
      setShowGraph(false);
    }, 500);
  };

  /** 매매가, 보증금, 월세 보기 쉽게 전처리 */
  const pretreatAmount = (amount: number) => {
    if (amount > 10000 && amount % 10000) {
      const tmp = amount.toString();
      const result = tmp.substring(0, 1) + '억 ' + tmp.substring(1, tmp.length) + '만';
      return result;
    } else if (amount % 10000 === 0) {
      const tmp = amount.toString();
      const result = tmp.substring(0, 1) + '억';
      return result;
    } else {
      return amount.toString() + '만';
    }
  };

  return (
    <div id={'component' + RE.place.type + RE.place.id.toString()} className={styles.component}>
      <p className={styles.name}>{RE.place.name}</p>
      <div className={styles['component-inner']}>
        <div className={styles.left}>
          <div className={styles.img} style={{ backgroundImage: `url(${test})` }}>
            <p className={styles.type}>
              <span>{RE.place.type}</span> <span>{RE.place.average_deal.deal_type}</span>
            </p>
          </div>
        </div>
        <div className={styles['content']}>
          {RE.place.average_deal.deal_type === '월세' && (
            <p className={styles.price}>
              평균 {pretreatAmount(RE.place.average_deal.guarantee)} / {pretreatAmount(RE.place.average_deal.monthly)}
            </p>
          )}
          {RE.place.average_deal.deal_type === '전세' && <p className={styles.price}>평균 {pretreatAmount(RE.place.average_deal.guarantee)}</p>}
          {RE.place.average_deal.deal_type === '매매' && <p className={styles.price}>평균 {pretreatAmount(RE.place.average_deal.price)}</p>}
          <p className={styles.address}>{RE.place.address}</p>
          <p className={styles.extent}>
            전용면적(㎡): {RE.place.range_extent[0]} ~ {RE.place.range_extent[1]}
          </p>
          <p className={styles.floor}>
            층수: {RE.place.range_floor[0]} ~ {RE.place.range_floor[1]}
          </p>
          <div className={styles.score}>
            <span>추천 점수: </span>
            <div>
              {RE.place.total_score < 70 && <CountUp end={RE.place.total_score} duration={1} decimals={2} decimal="." />}
              {RE.place.total_score >= 70 && RE.place.total_score < 90 && (
                <CountUp end={RE.place.total_score} duration={1} decimals={2} decimal="." style={{ fontWeight: '600' }} />
              )}
              {RE.place.total_score >= 90 && (
                <CountUp end={RE.place.total_score} duration={1} decimals={2} decimal="." style={{ color: 'rgba(255, 148, 148, 1)', fontWeight: '600' }} />
              )}
            </div>
            <RiQuestionnaireFill id={'graph-btn' + RE.place.type + RE.place.id.toString()} onClick={onClickGraphBtn} />
          </div>
        </div>
      </div>
      <div ref={graphRef} id={'graph' + RE.place.type + RE.place.id.toString()} className={showGraph ? styles['graph-show'] : styles['graph-no-show']}>
        <div ref={graphInnerRef} className={styles['graph-inner']}>
          {Object.entries(RE.place.score).map((data) => (
            <div key={data[0]} className={styles['graph-item']} style={{ height: `${data[1]}%` }}>
              <p className={styles['graph-item-kind']}>{data[0]}</p>
              <div className={styles['graph-item-stick']} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RealEstateItem;
