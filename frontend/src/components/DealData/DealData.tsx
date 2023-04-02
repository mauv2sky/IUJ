// import React, { useState, useEffect } from 'react';
// import styles from './DealData.module.scss';
// import DealDataItem, { DealDataItemType } from '../DealDataItem/DealDataItem';
// import { useAppDispatch, useAppSelector } from '../../store/hooks';
// import { getdetailContainerState } from '../../store/slices/detailContainerSlice';

// export type DealType = {
//   type: string;
//   maxPrice: number;
//   minPrice: number;
//   deals: {
//     aptId: number;
//     area: string;
//     author: string;
//     contract_day: string;
//     contract_ym: string;
//     dealType: string;
//     floor: number;
//     guarantee: number;
//     id: number;
//     monthly: number;
//     price: number;
//   }[];
// };

// type DealPropsType = {
//   dealRelist: DealType;
// };

// function DealData({ dealRelist }: DealPropsType) {
//   const dispatch = useAppDispatch();
//   dispatch(getdetailContainerState());
//   const detailContainer = useAppSelector((state) => state.detailContainerSlice.detailContainer);
//   useEffect(() => {
//     console.log('디테일콘!!!', detailContainer);
//   }, [detailContainer]);

//   const [deals, setDeals] = useState<DealType['deals']>([]);

//   useEffect(() => {
//     if (dealRelist && dealRelist.deals) {
//       setDeals(dealRelist.deals);
//     }
//   }, [dealRelist]);
//   // console.log(1, dealRelist);
//   // console.log(2, dealRelist.deals);
//   return (
//     <div className={styles.component}>
//       <div>여긴 그래프</div>
//       <div className={styles.dealtitle}>
//         <div className={styles.time}>거래일</div>
//         <div className={styles.space}>전용면적</div>
//         <div className={styles.floor}>층</div>
//         <div className={styles.cost}>금액 (만원)</div>
//       </div>
//       <div>
//         {deals.map((item, index) => (
//           <div key={index}>
//             <DealDataItem dealdataitem={item} />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default DealData;

import React, { useState, useEffect } from 'react';
import styles from './DealData.module.scss';
import DealDataItem, { DealDataItemType } from '../DealDataItem/DealDataItem';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getdetailContainerState } from '../../store/slices/detailContainerSlice';

/** 프롭스 받은 매물 상세 정보 */
export type DealType = {
  Deal: {
    type: string;
    maxPrice: number;
    minPrice: number;
    deals: {
      aptId: number;
      area: string;
      author: string;
      contract_day: string;
      contract_ym: string;
      dealType: string;
      floor: number;
      guarantee: number;
      id: number;
      monthly: number;
      price: number;
    }[];
  };
  home: { id: number; lat: number; lng: number; sigungu: string; bungi: string; name: string; built_year: string; road_addr: string };
};
/** 프롭스 받은 매물 상세 정보 */
type DealPropsType = {
  dealRelist: DealType;
};

function DealData({ dealRelist }: DealPropsType) {
  console.log(dealRelist, '여기 맞냐');
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getdetailContainerState());
  }, [dispatch]);
  const detailContainer = useAppSelector((state) => state.detailContainerSlice.detailContainer);

  const [deals, setDeals] = useState<DealType['Deal']['deals']>([]);

  useEffect(() => {
    if (dealRelist && dealRelist.Deal && dealRelist.Deal.deals) {
      setDeals(dealRelist.Deal.deals);
    }
  }, [dealRelist]);

  return (
    <div className={styles.component}>
      <div>여긴 그래프</div>
      <div className={styles.dealtitle}>
        <div className={styles.time}>거래일</div>
        <div className={styles.space}>전용면적</div>
        <div className={styles.floor}>층</div>
        <div className={styles.cost}>금액 (만원)</div>
      </div>
      <div>
        {deals.map((item, index) => (
          <div key={index}>{item && <DealDataItem dealDataItem={item} />}</div>
        ))}
      </div>
    </div>
  );
}

export default DealData;
