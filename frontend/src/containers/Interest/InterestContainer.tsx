import React, { useEffect, useState } from 'react';
import styles from './InterestContainer.module.scss';
import InterestCard, { InterestType } from '../../components/InterestCard/InterestCard';
import { requestInterestList } from '../../api/interest';

function InterestContainer() {
  const [interestList, setInterestList] = useState<InterestType[]>([]);
  const [deleted, setDeleted] = useState<number>(0);

  useEffect(() => {
    getInterestList();
  }, [deleted]);

  const getInterestList = async () => {
    try {
      const res = await requestInterestList();
      console.log(res);
      setInterestList(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.container}>
      <h1>관심 목록</h1>
      {interestList.length === 0 && (
        <div className={styles['no-show']}>
          <iframe src="https://embed.lottiefiles.com/animation/41252" />
          <p>관심 매물이 없어요.</p>
        </div>
      )}
      {interestList.length > 0 && (
        <div className={styles.interest}>
          <InterestCard interestList={interestList} setDeleted={setDeleted} />
        </div>
      )}
    </div>
  );
}

export default InterestContainer;
