// import React, { useState } from 'react';
// import styles from './DetailInformation.module.scss';
// import FacilityList, { FacilityType } from '../../components/FacilityList/FacilityList';
// import axios from 'axios';
// // import DealData, { DealType } from '../../components/DealData/DealData';

// export type DetailType = {
//   place: {
//     id: number;
//     name: string;
//     type: string;
//     latlng: number[];
//     address: string[];
//     deal: {
//       area: number[];
//       floor: number;
//       contract_ym: number;
//       deal_type: string;
//       guarantee: number;
//       price: number;
//       monthly: number;
//     }[];
//   };
//   total_score: number;
//   map: {
//     [infra: string]: {}[];
//   };
//   facility: {
//     [infra: string]: { [key: string]: string | number[] | number }[];
//   };
// };

// type DetailPropsType = {
//   detailRelist: DetailType;
// };

// function DetailInformation({ detailRelist }: DetailPropsType) {
//   const [tabIndex, setTabIndex] = useState(0);

//   const onClickTab = (index: number) => {
//     setTabIndex(index);
//   };

//   const [tabIndex2, setTabIndex2] = useState(0);

//   const onClickTab2 = (index: number) => {
//     setTabIndex2(index);
//   };

//   /** APIURL */
//   const APIURL = 'https://example.com';

//   /** 관심 매물 등록 버튼 클릭 시 */
//   const onClickInterestBtn = () => {
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

//   const facilitylist: FacilityType[] = [];
//   return (
//     <div className={styles.component}>
//       <div className={styles.information}>
//         <div className={styles.costgraph}>여긴 실거래가 그래프</div>
//         <div className={styles.school}>최근 1년간 실거래</div>
//         <div className={styles.costdata}>여긴 실거래가 데이터</div>
//         {/* <DealData deallist={detailRelist.place.deal ? detailRelist.place.deal : []} /> */}
//         <div className={styles.school}>인근 학교 정보</div>
//         <div className={styles.schooltap}>
//           <div className={styles.tab}>
//             <div onClick={() => onClickTab(0)} className={tabIndex === 0 ? styles.selected : styles['not-selected']}>
//               어린이집
//             </div>
//             <div onClick={() => onClickTab(1)} className={tabIndex === 1 ? styles.selected : styles['not-selected']}>
//               유치원
//             </div>
//             <div onClick={() => onClickTab(2)} className={tabIndex === 2 ? styles.selected : styles['not-selected']}>
//               초등학교
//             </div>
//             <div onClick={() => onClickTab(3)} className={tabIndex === 3 ? styles.selected : styles['not-selected']}>
//               중학교
//             </div>
//             <div onClick={() => onClickTab(4)} className={tabIndex === 4 ? styles.selected : styles['not-selected']}>
//               고등학교
//             </div>
//             <div onClick={() => onClickTab(5)} className={tabIndex === 5 ? styles.selected : styles['not-selected']}>
//               특수학교
//             </div>
//           </div>
//           {tabIndex === 0 && <FacilityList facilitylist={detailRelist.facility.어린이집 ? detailRelist.facility.어린이집 : []} />}
//           {tabIndex === 1 && <FacilityList facilitylist={detailRelist.facility.유치원 ? detailRelist.facility.유치원 : []} />}
//           {tabIndex === 2 && <FacilityList facilitylist={detailRelist.facility.초등학교 ? detailRelist.facility.초등학교 : []} />}
//           {tabIndex === 3 && <FacilityList facilitylist={detailRelist.facility.중학교 ? detailRelist.facility.중학교 : []} />}
//           {tabIndex === 4 && <FacilityList facilitylist={detailRelist.facility.고등학교 ? detailRelist.facility.고등학교 : []} />}
//           {tabIndex === 5 && <FacilityList facilitylist={detailRelist.facility.특수학교 ? detailRelist.facility.특수학교 : []} />}
//         </div>
//         <div className={styles.school}>인근 학원 정보</div>
//         <div className={styles.schooltap2}>
//           <div className={styles.tab}>
//             <div onClick={() => onClickTab2(0)} className={tabIndex2 === 0 ? styles.selected : styles['not-selected']}>
//               입시학원
//             </div>
//             <div onClick={() => onClickTab2(1)} className={tabIndex2 === 1 ? styles.selected : styles['not-selected']}>
//               예체능학원
//             </div>
//           </div>
//           {tabIndex2 === 0 && <FacilityList facilitylist={detailRelist.facility.입시학원 ? detailRelist.facility.입시학원 : []} />}
//           {tabIndex2 === 1 && <FacilityList facilitylist={detailRelist.facility.예체능학원 ? detailRelist.facility.예체능학원 : []} />}
//         </div>
//       </div>
//       <div className={styles.title}>
//         <div className={styles.type}>{detailRelist.place.type}</div>
//         <div className={styles.name}>{detailRelist.place.name}</div>
//         <div className={styles.address}>{detailRelist.place.address[0]}</div>
//         <div className={styles.address}>{detailRelist.place.address[1]}</div>
//         <button className={styles.interestbutton} onClick={onClickInterestBtn}>
//           관심 매물 등록
//         </button>
//       </div>
//     </div>
//   );
// }

// export default DetailInformation;

import React, { useState } from 'react';
import styles from './DetailInformation.module.scss';
import FacilityList, { FacilityType } from '../../components/FacilityList/FacilityList';
import axios from 'axios';
// import DealData, { DealType } from '../../components/DealData/DealData';

export type DetailType = {
  place: {
    id: number;
    name: string;
    type: string;
    latlng: number[];
    address: string[];
    deal: {
      type: string;
      aptDeals: {
        id: number;
        area: string;
        contract_ym: string;
        contract_day: string;
        dealType: string;
        guarantee: number;
        price: number;
        floor: number;
        monthly: number;
        aptId: number;
        author: string | null;
      }[];
    }[];
  };
  total_score: number;
  map: {
    [infra: string]: {}[];
  };
  facility: {
    [infra: string]: { [key: string]: string | string | number[] }[];
  };
};

type DetailPropsType = {
  detailRelist: DetailType;
};

function DetailInformation({ detailRelist }: DetailPropsType) {
  const [tabIndex, setTabIndex] = useState(0);

  const onClickTab = (index: number) => {
    setTabIndex(index);
  };

  const [tabIndex2, setTabIndex2] = useState(0);

  const onClickTab2 = (index: number) => {
    setTabIndex2(index);
  };

  /** APIURL */
  const APIURL = 'https://example.com';

  /** 관심 매물 등록 버튼 클릭 시 */
  const onClickInterestBtn = () => {
    console.log('되냐?');
    // axios
    //   .post(APIURL + '/api/like', data)
    //   .then((response) => {
    //     console.log('데이터 전송 성공');
    //     console.log(response.data);
    //   })
    //   .catch((error) => {
    //     console.error('데이터 전송 실패');
    //     console.error(error);
    //   });
  };

  const facilitylist: FacilityType[] = [];
  return (
    <div className={styles.component}>
      <div className={styles.information}>
        <div className={styles.costgraph}>여긴 실거래가 그래프</div>
        <div className={styles.school}>최근 1년간 실거래</div>
        <div className={styles.costdata}>여긴 실거래가 데이터</div>
        {/* <DealData deallist={detailRelist.place.deal ? detailRelist.place.deal : []} /> */}
        <div className={styles.school}>인근 학교 정보</div>
        <div className={styles.schooltap}>
          <div className={styles.tab}>
            <div onClick={() => onClickTab(0)} className={tabIndex === 0 ? styles.selected : styles['not-selected']}>
              어린이집
            </div>
            <div onClick={() => onClickTab(1)} className={tabIndex === 1 ? styles.selected : styles['not-selected']}>
              유치원
            </div>
            <div onClick={() => onClickTab(2)} className={tabIndex === 2 ? styles.selected : styles['not-selected']}>
              초등학교
            </div>
            <div onClick={() => onClickTab(3)} className={tabIndex === 3 ? styles.selected : styles['not-selected']}>
              중학교
            </div>
            <div onClick={() => onClickTab(4)} className={tabIndex === 4 ? styles.selected : styles['not-selected']}>
              고등학교
            </div>
            <div onClick={() => onClickTab(5)} className={tabIndex === 5 ? styles.selected : styles['not-selected']}>
              특수학교
            </div>
          </div>
          {tabIndex === 0 && <FacilityList facilitylist={detailRelist.facility.어린이집 ? detailRelist.facility.어린이집 : []} />}
          {tabIndex === 1 && <FacilityList facilitylist={detailRelist.facility.유치원 ? detailRelist.facility.유치원 : []} />}
          {tabIndex === 2 && <FacilityList facilitylist={detailRelist.facility.초등학교 ? detailRelist.facility.초등학교 : []} />}
          {tabIndex === 3 && <FacilityList facilitylist={detailRelist.facility.중학교 ? detailRelist.facility.중학교 : []} />}
          {tabIndex === 4 && <FacilityList facilitylist={detailRelist.facility.고등학교 ? detailRelist.facility.고등학교 : []} />}
          {tabIndex === 5 && <FacilityList facilitylist={detailRelist.facility.특수학교 ? detailRelist.facility.특수학교 : []} />}
        </div>
        <div className={styles.school}>인근 학원 정보</div>
        <div className={styles.schooltap2}>
          <div className={styles.tab}>
            <div onClick={() => onClickTab2(0)} className={tabIndex2 === 0 ? styles.selected : styles['not-selected']}>
              입시학원
            </div>
            <div onClick={() => onClickTab2(1)} className={tabIndex2 === 1 ? styles.selected : styles['not-selected']}>
              예체능학원
            </div>
          </div>
          {tabIndex2 === 0 && <FacilityList facilitylist={detailRelist.facility.입시학원 ? detailRelist.facility.입시학원 : []} />}
          {tabIndex2 === 1 && <FacilityList facilitylist={detailRelist.facility.예체능학원 ? detailRelist.facility.예체능학원 : []} />}
        </div>
      </div>
      <div className={styles.title}>
        <div className={styles.type}>{detailRelist.place.type}</div>
        <div className={styles.name}>{detailRelist.place.name}</div>
        <div className={styles.address}>{detailRelist.place.address[0]}</div>
        <div className={styles.address}>{detailRelist.place.address[1]}</div>
        <button className={styles.interestbutton} onClick={onClickInterestBtn}>
          관심 매물 등록
        </button>
      </div>
    </div>
  );
}

export default DetailInformation;
