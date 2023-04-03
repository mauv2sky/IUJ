import React, { useEffect, useRef, useState } from 'react';
import CountUp from 'react-countup';
import { RiQuestionnaireFill } from 'react-icons/ri';
import { pretreatAmount } from '../../utils/PretreatAmount';
import { RealEstateType } from '../../types/MapType';
import { TypeMappingType } from '../../types/MapType';
import { typeMap } from '../../containers/Map/MapContainer';
import test from '../../assets/test.jpg';
import styles from './RealEstateItem.module.scss';
import { useNavigate } from 'react-router';

const dealTypeMap: TypeMappingType = {
  BUY: '매매',
  LONG_TERM_RENT: '전세',
  MONTHLY_RENT: '월세',
};

type RealEstatePropsType = {
  realEstate: RealEstateType;
  scrollY: number;
};

function RealEstateItem({ realEstate, scrollY }: RealEstatePropsType) {
  /** =================================== 변수, useState, useRef =================================== */
  const [showGraph, setShowGraph] = useState<boolean>(false);
  const graphRef = useRef<HTMLDivElement>(null);
  const graphInnerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  /** =================================== useEffect =================================== */
  /** 물음표 버튼을 누르면 옆에 그래프가 뜨도록 함 */
  /** css로 하면 absolute 요소가 overflow로 처리되는 문제로 인해 JS로 처리 */
  useEffect(() => {
    const graphBtn = document.getElementById('graph-btn' + realEstate.type + realEstate.id.toString());
    graphBtn?.addEventListener('click', function () {
      const component = document.getElementById('component' + realEstate.type + realEstate.id.toString());
      const graph = document.getElementById('graph' + realEstate.type + realEstate.id.toString());
      const componentPos = component?.getBoundingClientRect();

      if (graph && componentPos && component) {
        graph.style.height = 200 + 'px';
        graph.style.width = 500 + 'px';
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

  /** 주소 전처리 */
  const pretreatAddress = (address: string) => {
    const addressList = address.split(' ').slice(0, 3);
    return addressList[0] + ' ' + addressList[1] + ' ' + addressList[2];
  };

  /** 매물 클릭 시 */
  const onClickRealEstate = (type: string, id: number) => {
    navigate(`../${type}/${id}`);
  };

  return (
    <div id={'component' + realEstate.type + realEstate.id.toString()} className={styles.component}>
      <p
        className={styles.name}
        onClick={() => {
          onClickRealEstate(realEstate.type, realEstate.id);
        }}
      >
        {realEstate.name}
      </p>
      <div className={styles['component-inner']}>
        <div
          className={styles.left}
          onClick={() => {
            onClickRealEstate(realEstate.type, realEstate.id);
          }}
        >
          <div className={styles.img} style={{ backgroundImage: `url(${realEstate.img ? realEstate.img : test})` }}>
            <p className={styles.type}>
              <span>{typeMap[realEstate.type]}</span> <span>{dealTypeMap[realEstate.average_deal?.deal_type as string]}</span>
            </p>
          </div>
        </div>
        <div className={styles['content']}>
          {realEstate.average_deal?.deal_type === 'MONTHLY' && (
            <p className={styles.price}>
              평균 {pretreatAmount(realEstate.average_deal.guarantee)} / {pretreatAmount(realEstate.average_deal.monthly)}
            </p>
          )}
          {realEstate.average_deal?.deal_type === 'LONG_TERM_RENT' && <p className={styles.price}>평균 {pretreatAmount(realEstate.average_deal.guarantee)}</p>}
          {realEstate.average_deal?.deal_type === 'BUY' && <p className={styles.price}>평균 {pretreatAmount(realEstate.average_deal.price)}</p>}
          {realEstate.address && <p className={styles.address}>{pretreatAddress(realEstate.address[1])}</p>}
          {realEstate.range_extent && (
            <p className={styles.extent}>
              전용면적(㎡): {Math.round(realEstate.range_extent[0] * 100) / 100} ~ {Math.round(realEstate.range_extent[1] * 100) / 100}
            </p>
          )}
          {realEstate.range_floor && (
            <p className={styles.floor}>
              층수: {realEstate.range_floor[0]} ~ {realEstate.range_floor[1]}
            </p>
          )}
          <div className={styles.score}>
            <span>추천 점수: </span>
            <div>
              {realEstate.total_score < 70 && <CountUp end={realEstate.total_score} duration={1} decimals={2} decimal="." />}
              {realEstate.total_score >= 70 && realEstate.total_score < 90 && (
                <CountUp end={realEstate.total_score} duration={1} decimals={2} decimal="." style={{ fontWeight: '600' }} />
              )}
              {realEstate.total_score >= 90 && (
                <CountUp end={realEstate.total_score} duration={1} decimals={2} decimal="." style={{ color: 'rgba(161, 188, 215, 1)', fontWeight: '600' }} />
              )}
            </div>
            <RiQuestionnaireFill className={styles['graph-btn']} id={'graph-btn' + realEstate.type + realEstate.id.toString()} onClick={onClickGraphBtn} />
          </div>
        </div>
      </div>
      <div ref={graphRef} id={'graph' + realEstate.type + realEstate.id.toString()} className={showGraph ? styles['graph-show'] : styles['graph-no-show']}>
        <div ref={graphInnerRef} className={styles['graph-inner']}>
          {realEstate.score &&
            Object.entries(realEstate.score).map((data) => (
              <div key={data[0]} className={styles['graph-item']} style={{ height: `${data[1]}%` }}>
                <p className={styles['graph-item-kind']}>{data[0]}</p>
                <p className={styles['graph-item-kind']} style={{ color: 'skyblue' }}>
                  {data[1]}
                </p>
                <div className={styles['graph-item-stick']} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default RealEstateItem;
