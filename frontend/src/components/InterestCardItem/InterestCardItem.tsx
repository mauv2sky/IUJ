import React from 'react';
import { useNavigate } from 'react-router';
import { requestDeleteInterest } from '../../api/interest';
import { typeMap } from '../../containers/Map/MapContainer';
import styles from './InterestCardItem.module.scss';

export type InterestCardItemType = {
  name: string;
  address: string[];
  deal: string[];
  type: string;
  id: number;
};

type InterestCardItemPropsType = {
  interestcarditem: InterestCardItemType;
  setDeleted: React.Dispatch<React.SetStateAction<number>>;
};

function InterestCardItem({ interestcarditem, setDeleted }: InterestCardItemPropsType) {
  const navigate = useNavigate();

  const onClickName = () => {
    navigate(`/${interestcarditem.type}/${interestcarditem.id}`);
  };

  const onClickDeleteBtn = async (id: number, type: string) => {
    try {
      const res = await requestDeleteInterest(id, type);
      console.log(res);
      setDeleted((prev) => prev + 1);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.component}>
      <div className={styles.type}>{typeMap[interestcarditem.type]}</div>
      <div className={styles.name} onClick={onClickName}>
        {interestcarditem.name}
      </div>
      <div className={styles.address}>{interestcarditem.address[1]}</div>
      <div className={styles.address}>{interestcarditem.address[0]}</div>
      <button className={styles.deletebutton} onClick={() => onClickDeleteBtn(interestcarditem.id, interestcarditem.type)}>
        관심 매물 삭제
      </button>
    </div>
  );
}

export default InterestCardItem;
