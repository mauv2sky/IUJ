//A안
// import React from 'react';
// import styles from './InterestCard.module.scss';

// export type InterestType = {
//   name: string;
//   address: string[];
//   deal: string[];
//   type: string;
//   id: number;
// };

// type InterestPropsType = {
//   interestList: InterestType[];
// };

// function InterestCard({ interestList }: InterestPropsType) {
//   const onClickInterest = () => {
//     window.open('http://localhost:5173/detail');
//   };

//   return (
//     <div className={styles.component}>
//       {interestList.map((interest, index) => (
//         <div key={index} className={styles.interest} onClick={onClickInterest} style={{ visibility: interest ? 'visible' : 'hidden' }}>
//           {interest && (
//             <div className={styles['interest-inner']}>
//               <div className={styles['interest-name']}>
//                 <p className={styles.interestname}>{interest.name}</p>
//               </div>
//               <div className={styles['interest-deal']}>
//                 <p style={{ whiteSpace: 'pre-wrap' }}>{interest.deal.join(' ~ ')}</p>
//               </div>
//               <div className={styles['interest-address']} style={{ whiteSpace: 'pre-wrap' }}>
//                 <p>{`지번 주소: ${interest.address[1]}\n도로명 주소: ${interest.address[0]}`}</p>
//               </div>
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default InterestCard;

//B안

import React from 'react';
import styles from './InterestCard.module.scss';

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
      {interestList.map((interest, index) => (
        <div key={index} className={styles.interest} onClick={onClickInterest} style={{ visibility: interest ? 'visible' : 'hidden' }}>
          {interest && (
            <div className={styles['interest-inner']}>
              <div className={styles.box1}>
                <p>{interest.type}</p>
              </div>
              <div className={styles.box2}>
                <div className={styles['interest-name']}>
                  <p className={styles.interestname}>{interest.name}</p>
                </div>
                <div className={styles['interest-deal']}>
                  <p style={{ whiteSpace: 'pre-wrap' }}>{interest.deal.join(' ~ ')}</p>
                </div>
                <div className={styles['interest-address']} style={{ whiteSpace: 'pre-wrap' }}>
                  <p>{`지번 주소: ${interest.address[1]}\n도로명 주소: ${interest.address[0]}`}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default InterestCard;
