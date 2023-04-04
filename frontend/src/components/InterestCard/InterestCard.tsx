import React from 'react';
import styles from './InterestCard.module.scss';
import InterestCardItem, { InterestCardItemType } from '../InterestCardItem/InterestCardItem';
import axios from 'axios';

export type InterestType = {
  name: string;
  address: string[];
  deal: string[];
  type: string;
  id: number;
};

type InterestPropsType = {
  interestList: InterestType[];
};

function InterestCard({ interestList }: InterestPropsType) {
  const onClickInterest = () => {
    window.open('http://localhost:5173/detail');
  };

  return (
    <div className={styles.component}>
      {interestList.map((item, index) => (
        <div key={index} onClick={onClickInterest} style={{ visibility: item ? 'visible' : 'hidden' }}>
          <InterestCardItem interestcarditem={item} />
        </div>
      ))}
    </div>
  );
}

export default InterestCard;
