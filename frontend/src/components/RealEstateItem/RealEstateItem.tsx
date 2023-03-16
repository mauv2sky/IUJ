import React from 'react';
import styles from './RealEstateItem.module.scss';

export type RealEstateType = {
  place: {
    name: string;
    type: string;
    address: string[];
    total_score: number;
    score: {
      [kind: string]: number;
    };
  };
};

type RealEstatePropsType = {
  RE: RealEstateType;
};

function RealEstateItem({ RE }: RealEstatePropsType) {
  return (
    <div className={styles.component}>
      <p>{RE.place.name}</p>
      <p>{RE.place.address}</p>
      <p>{RE.place.total_score}</p>
    </div>
  );
}

export default RealEstateItem;
