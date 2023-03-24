import React, { useEffect, useRef, useState } from 'react';
import CountUp from 'react-countup';
import { RiQuestionnaireFill } from 'react-icons/ri';
import { pretreatAmount } from '../../utils/PretreatAmount';
import test from '../../assets/test.jpg';
import styles from './RealEstateItem.module.scss';

export type RealEstateType = {
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
    const graphBtn = document.getElementById('graph-btn' + RE.type + RE.id.toString());
    graphBtn?.addEventListener('click', function () {
      const component = document.getElementById('component' + RE.type + RE.id.toString());
      const graph = document.getElementById('graph' + RE.type + RE.id.toString());
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

  return (
    <div id={'component' + RE.type + RE.id.toString()} className={styles.component}>
      <p className={styles.name}>{RE.name}</p>
      <div className={styles['component-inner']}>
        <div className={styles.left}>
          <div className={styles.img} style={{ backgroundImage: `url(${test})` }}>
            <p className={styles.type}>
              <span>{RE.type}</span> <span>{RE.average_deal.deal_type}</span>
            </p>
          </div>
        </div>
        <div className={styles['content']}>
          {RE.average_deal.deal_type === '월세' && (
            <p className={styles.price}>
              평균 {pretreatAmount(RE.average_deal.guarantee)} / {pretreatAmount(RE.average_deal.monthly)}
            </p>
          )}
          {RE.average_deal.deal_type === '전세' && <p className={styles.price}>평균 {pretreatAmount(RE.average_deal.guarantee)}</p>}
          {RE.average_deal.deal_type === '매매' && <p className={styles.price}>평균 {pretreatAmount(RE.average_deal.price)}</p>}
          <p className={styles.address}>{RE.address}</p>
          <p className={styles.extent}>
            전용면적(㎡): {RE.range_extent[0]} ~ {RE.range_extent[1]}
          </p>
          <p className={styles.floor}>
            층수: {RE.range_floor[0]} ~ {RE.range_floor[1]}
          </p>
          <div className={styles.score}>
            <span>추천 점수: </span>
            <div>
              {RE.total_score < 70 && <CountUp end={RE.total_score} duration={1} decimals={2} decimal="." />}
              {RE.total_score >= 70 && RE.total_score < 90 && <CountUp end={RE.total_score} duration={1} decimals={2} decimal="." style={{ fontWeight: '600' }} />}
              {RE.total_score >= 90 && (
                <CountUp end={RE.total_score} duration={1} decimals={2} decimal="." style={{ color: 'rgba(161, 188, 215, 1)', fontWeight: '600' }} />
              )}
            </div>
            <RiQuestionnaireFill id={'graph-btn' + RE.type + RE.id.toString()} onClick={onClickGraphBtn} />
          </div>
        </div>
      </div>
      <div ref={graphRef} id={'graph' + RE.type + RE.id.toString()} className={showGraph ? styles['graph-show'] : styles['graph-no-show']}>
        <div ref={graphInnerRef} className={styles['graph-inner']}>
          {Object.entries(RE.score).map((data) => (
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
