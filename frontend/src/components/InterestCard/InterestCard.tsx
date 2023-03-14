import React, { useEffect, useState } from 'react';
import styles from './InterestCard.module.scss';

export interface InterestCardInterface {
  name: string;
  address: string;
  deal: string;
}

function InterestCard({ interestList }: { interestList: InterestCardInterface[] }) {
  const [page, setPage] = useState(1);
  const pageInterestList = interestList.slice(4 * (page - 1), 4 * page);
  const [showInterest, setShowInterest] = useState(0);
  const resultList = pageInterestList.slice(0, showInterest);

  useEffect(() => {
    setShowInterest(0);

    const interestInterval = window.setInterval(() => {
      setShowInterest((prev) => prev + 1);
    }, 100);

    return () => {
      clearInterval(interestInterval);
    };
  }, [page]);

  const onClickSlideBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    if (target.name === 'right') {
      setPage(2);
    } else {
      setPage(1);
    }
  };

  const onClickInterest = (url: string) => {
    window.open(url);
  };

  return (
    <div className={styles.component}>
      {page > 1 && (
        <button name="left" className={styles['left-btn']} onClick={onClickSlideBtn}>
          {'<'}
        </button>
      )}
      {resultList.map((interest, index) => (
        <div
          key={index}
          className={styles.interest}
          onClick={() => {
            onClickInterest(interest.deal);
          }}
        >
          <div className={styles['interest-inner']}>
            <p className={styles['interest-name']}>{interest.name}</p>
            <p className={styles['interest-address']}>{interest.address}</p>
          </div>
        </div>
      ))}
      {page === 1 && (
        <button name="right" className={styles['right-btn']} onClick={onClickSlideBtn}>
          {'>'}
        </button>
      )}
    </div>
  );
}

export default InterestCard;
