import React from 'react';
import styles from './InterestCard.module.scss';
import InterestCardItem from '../InterestCardItem/InterestCardItem';

export type InterestType = {
  name: string;
  address: string[];
  deal: string[];
  type: string;
  id: number;
};

type InterestPropsType = {
  interestList: InterestType[];
  setDeleted: React.Dispatch<React.SetStateAction<number>>;
};

function InterestCard({ interestList, setDeleted }: InterestPropsType) {
  return (
    <div className={styles.component}>
      {interestList.map((item, index) => (
        <div key={index}>
          <InterestCardItem interestcarditem={item} setDeleted={setDeleted} />
        </div>
      ))}
    </div>
  );
}

export default InterestCard;
