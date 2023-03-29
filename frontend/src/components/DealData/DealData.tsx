import React from 'react';
import styles from './DealData.module.scss';

export type DealType = {
  type: string;
  aptDeals: {}[];
  maxPrice: number;
  minPrice: number;
};

type DealPropsType = {
  dealRelist: DealType;
};
function DealData({ dealRelist }: DealPropsType) {
  console.log({ dealRelist });
  return <div>여기는 딜데이터</div>;
}

export default DealData;
