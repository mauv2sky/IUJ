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

// B안;

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
//               <div className={styles.box1}>
//                 <p>{interest.type}</p>
//               </div>
//               <div className={styles.box2}>
//                 <div className={styles['interest-name']}>
//                   <p className={styles.interestname}>{interest.name}</p>
//                 </div>
//                 <div className={styles['interest-deal']}>
//                   <p style={{ whiteSpace: 'pre-wrap' }}>{interest.deal.join(' ~ ')}</p>
//                 </div>
//                 <div className={styles['interest-address']} style={{ whiteSpace: 'pre-wrap' }}>
//                   <p>{`지번 주소: ${interest.address[1]}\n도로명 주소: ${interest.address[0]}`}</p>
//                 </div>
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

//   /** APIURL */
//   const APIURL = 'https://example.com';

//   /** 관심 매물 삭제 버튼 클릭 시 */
//   const onClickDeleteBtn = () => {
//     console.log('되냐?');
//     // axios
//     //   .post(APIURL + '/api/like', data)
//     //   .then((response) => {
//     //     console.log('데이터 전송 성공');
//     //     console.log(response.data);
//     //   })
//     //   .catch((error) => {
//     //     console.error('데이터 전송 실패');
//     //     console.error(error);
//     //   });
//   };

//   return (
//     <div className={styles.component}>
//       {interestList.map((interest, index) => (
//         <div key={index} className={styles.interest} onClick={onClickInterest} style={{ visibility: interest ? 'visible' : 'hidden' }}>
//           {interest && (
//             <div>
//               <div className={styles.type}>{interest.type}</div>
//               <div className={styles.name}>{interest.name}</div>
//               <div className={styles.address}>{interest.address[1]}</div>
//               <div className={styles.address}>{interest.address[0]}</div>
//               <button className={styles.deletebutton} onClick={onClickDeleteBtn}>
//                 관심 매물 삭제
//               </button>
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default InterestCard;

import React from 'react';
import styles from './InterestCard.module.scss';
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

  return (
    <div className={styles.component}>
      {interestList.map((interest, index) => (
        <div key={index} className={styles.interest} onClick={onClickInterest} style={{ visibility: interest ? 'visible' : 'hidden' }}>
          {interest && (
            <div>
              <div className={styles.type}>{interest.type}</div>
              <div className={styles.name}>{interest.name}</div>
              <div className={styles.address}>{interest.address[1]}</div>
              <div className={styles.address}>{interest.address[0]}</div>
              <button className={styles.deletebutton} onClick={(event) => onClickDeleteBtn(event, interest.id)}>
                관심 매물 삭제
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default InterestCard;
