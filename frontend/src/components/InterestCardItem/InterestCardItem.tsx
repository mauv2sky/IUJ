import React from 'react';
import styles from './InterestCardItem.module.scss';
import axios from 'axios';

export type InterestCardItemType = {
  name: string;
  address: string[];
  deal: string[];
  type: string;
  id: number;
};

type InterestCardItemPropsType = {
  interestcarditem: InterestCardItemType;
};

/** APIURL */
const APIURL = 'http://localhost:5000';

/** 관심 매물 삭제 버튼 클릭 시 */
const onClickDeleteBtn = (event: React.MouseEvent<HTMLButtonElement>, id: number) => {
  console.log('삭제 되냐?');
  event.stopPropagation();
  axios
    .delete(`${APIURL}/api/like/${id}`)
    .then((response) => {
      console.log('데이터 전송 성공');
      console.log(response.data);
    })
    .catch((error) => {
      console.error('데이터 전송 실패');
      console.error(error);
    });
};

function InterestCardItem({ interestcarditem }: InterestCardItemPropsType) {
  return (
    <div>
      <div className={styles.type}>{interestcarditem.type}</div>
      <div className={styles.name}>{interestcarditem.name}</div>
      <div className={styles.address}>{interestcarditem.address[1]}</div>
      <div className={styles.address}>{interestcarditem.address[0]}</div>
      <button className={styles.deletebutton} onClick={(event) => onClickDeleteBtn(event, interestcarditem.id)}>
        관심 매물 삭제
      </button>
    </div>
  );
}

export default InterestCardItem;
