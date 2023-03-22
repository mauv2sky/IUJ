import React, { useState } from 'react';
import styles from './DetailInformation.module.scss';

export type DetailType = {
  place: {
    id: number;
    name: string;
    type: string;
    latlng: number[];
    address: string[];
    deal: {
      area: number[];
      floor: number;
      contract_ym: number;
      deal_type: string;
      guarantee: number;
      price: number;
      monthly: number;
    }[];
  };
  total_score: number;
  map: {
    [infra: string]: {}[];
  };
  facility: {
    [infra: string]: { [key: string]: string | number[] | number }[];
  };
};

type DetailPropsType = {
  detailRelist: DetailType;
};

function DetailInformation({ detailRelist }: DetailPropsType) {
  return (
    <div className={styles.component}>
      <div className={styles.information}>
        <div className={styles.costgraph}>여긴 실거래가 그래프</div>
        <div className={styles.costdata}>여긴 실거래가 데이터</div>
        <div className={styles.study}>여긴 학군 및 학원 정보</div>
        <div className={styles.study}>여긴 학군 및 학원 정보</div>
        <div className={styles.study}>여긴 학군 및 학원 정보</div>
      </div>
      <div className={styles.title}>{RE.place.name}</div>
    </div>
  );
}

export default DetailInformation;
