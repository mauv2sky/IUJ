import React, { useRef, useState } from 'react';
import CountUp from 'react-countup';
import { RiQuestionnaireFill } from 'react-icons/ri';
import { AiOutlineClose } from 'react-icons/ai';
import { pretreatAmount } from '../../utils/PretreatAmount';
import { RealEstateType } from '../../types/MapType';
import { TypeMappingType } from '../../types/MapType';
import { typeMap } from '../../containers/Map/MapContainer';
import test from '../../assets/test.jpg';
import styles from './RealEstateItem.module.scss';

const dealTypeMap: TypeMappingType = {
  BUY: '매매',
  LONG_TERM_RENT: '전세',
  MONTHLY_RENT: '월세',
};

type RealEstatePropsType = {
  realEstate: RealEstateType;
};

function RealEstateItem({ realEstate }: RealEstatePropsType) {
  /** =================================== 변수, useState, useRef =================================== */
  const [showGraph, setShowGraph] = useState<boolean>(false);

  /** =================================== function, event handler =================================== */
  /** 주소 전처리 */
  const pretreatAddress = (address: string) => {
    const addressList = address.split(' ').slice(0, 3);
    return addressList[0] + ' ' + addressList[1] + ' ' + addressList[2];
  };

  /** 매물 클릭 시 */
  const onClickRealEstate = (type: string, id: number) => {
    window.open(`../${type}/${id}`);
  };

  return (
    <div className={styles.component}>
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
            <RiQuestionnaireFill
              className={styles['graph-btn']}
              onClick={() => {
                setShowGraph(true);
              }}
            />
          </div>
        </div>
      </div>
      <div className={showGraph ? styles['graph-show'] : styles['graph-no-show']}>
        <div className={styles['graph-inner']}>
          <AiOutlineClose onClick={() => setShowGraph(false)} />
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
