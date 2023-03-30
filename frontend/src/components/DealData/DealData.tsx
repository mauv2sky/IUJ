// import React, { useState, useEffect } from 'react';
// import styles from './DealData.module.scss';

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
//   const [deals, setDeals] = useState<DealType['deals']>([]);

//   useEffect(() => {
//     if (dealRelist && dealRelist.deals) {
//       setDeals(dealRelist.deals);
//     }
//   }, [dealRelist]);
//   console.log(dealRelist);

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
//         {dealRelist.deals.map((item, index) => (
//           <div key={index}>
//             {item && (
//               <div>
//                 <div className={styles.time}>
//                   {item.contract_ym}.{item.contract_day}
//                 </div>
//                 <div className={styles.time}>{item.area}</div>
//                 <div className={styles.floor}>{item.floor}</div>
//                 <div className={styles.cost}>{item.price}</div>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default DealData;

import React, { useState, useEffect } from 'react';
import styles from './DealData.module.scss';

export type DealType = {
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

type DealPropsType = {
  dealRelist: DealType;
};

function DealData({ dealRelist }: DealPropsType) {
  const [deals, setDeals] = useState<DealType['deals']>([]);

  useEffect(() => {
    if (dealRelist && dealRelist.deals) {
      setDeals(dealRelist.deals);
    }
  }, [dealRelist]);
  console.log(1, dealRelist);
  console.log(2, dealRelist.deals);
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
          <div key={index}>
            {item && (
              <div>
                <div className={styles.time}>
                  {item.contract_ym}.{item.contract_day}
                </div>
                <div className={styles.time}>{item.area}</div>
                <div className={styles.floor}>{item.floor}</div>
                <div className={styles.cost}>{item.price}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DealData;
