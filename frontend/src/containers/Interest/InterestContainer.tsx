// import React, { useEffect, useState } from 'react';
// import styles from './InterestContainer.module.scss';
// import { useNavigate } from 'react-router-dom';
// import { List } from 'reselect/es/types';
// import InterestCard, { InterestType } from '../../components/InterestCard/InterestCard';

// const interestList: InterestType[] = [
//   {
//     name: '송정삼정그린코아',
//     address: ['부산광역시 강서구 녹산산단335로 7', '부산 강서구 송정동 1627-5'],
//     deal: ['1억 2000만원', '9억 8000만원'],
//     type: '아파트',
//     id: 1,
//   },
//   {
//     name: '송정삼정그린코아',
//     address: ['부산광역시 강서구 녹산산단335로 7', '부산 강서구 송정동 1627-5'],
//     deal: ['1억 2000만원', '9억 8000만원'],
//     type: '아파트',
//     id: 1,
//   },
//   {
//     name: '송정삼정그린코아',
//     address: ['부산광역시 강서구 녹산산단335로 7', '부산 강서구 송정동 1627-5'],
//     deal: ['1억 2000만원', '9억 8000만원'],
//     type: '아파트',
//     id: 1,
//   },
// ];

// function InterestContainer() {
//   const navigate = useNavigate();

//   /** 스크롤 */
//   const [scrollY, setScrollY] = useState<number>(0);

//   /** 스크롤 */
//   const handleScroll = () => {
//     setScrollY(window.scrollY);
//   };

//   /** 집 찾아보기 클릭 */
//   const onClickGoMap = () => {
//     navigate('/map');
//   };

//   /** 집 상세보기 클릭 */
//   const onClickGoDetail = () => {
//     navigate('/detail');
//   };

//   /** Interest 보여줄지 여부 */
//   const [showInterest, setShowInterest] = useState<boolean>(false);

//   /** 스크롤 이벤트 추가 */
//   useEffect(() => {
//     window.addEventListener('scroll', handleScroll);

//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   useEffect(() => {
//     /** 스크롤 300 이상이면 Interest 보여주기 */
//     if (scrollY >= 300) {
//       setShowInterest(true);
//     }
//   });

//   return (
//     <div className={styles.container}>
//       <div className={styles.container1}>
//         <div className={styles.bigbox}>
//           <div className={styles.box1}></div>
//           <div className={styles.box2}>
//             <div className={styles.box2_1}></div>
//             <div className={styles.box2_2}>
//               <br />
//               <br />
//               <br />
//               <h1 className="text-fade-in">관심 매물</h1>
//             </div>
//           </div>
//           <div className={styles.box3}>
//             <div className={styles.box3_1}></div>
//           </div>
//           <div className={styles.box4}></div>
//           <div className={styles.box5}></div>
//         </div>
//         <div>
//           <div className={styles.introduce}>
//             <h1 className="text-fade-in">마음에 드는 매물을 찾아서</h1>
//             <br />
//             <h1 className="text-fade-in">이 곳에 저장하세요!</h1>
//           </div>
//           <div className={styles['btn-div']}>
//             <button className={styles['find-btn']} onClick={onClickGoMap}>
//               집 찾아보기
//             </button>
//           </div>
//         </div>
//       </div>
//       <div className={styles.container2}>
//         <div className={styles.title}>
//           <h2>관심 매물 목록</h2>
//         </div>

//         {/* 카드 레이아웃 */}
//         <div className={styles.cardlist}>
//           <div className={styles.interest}>{showInterest && <InterestCard interestList={interestList} />}</div>
//           {showInterest && <div className={styles.hr} />}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default InterestContainer;

import React, { useEffect, useState } from 'react';
import styles from './InterestContainer.module.scss';
import { useNavigate } from 'react-router-dom';
import { List } from 'reselect/es/types';
import axios from 'axios';
import InterestCard, { InterestType } from '../../components/InterestCard/InterestCard';

const interestList: InterestType[] = [
  {
    name: '송정삼정그린코아',
    address: ['부산광역시 강서구 녹산산단335로 7', '부산 강서구 송정동 1627-5'],
    deal: ['1억 2000만원', '9억 8000만원'],
    type: '아파트',
    id: 1,
  },
  {
    name: '송정삼정그린코아',
    address: ['부산광역시 강서구 녹산산단335로 7', '부산 강서구 송정동 1627-5'],
    deal: ['1억 2000만원', '9억 8000만원'],
    type: '아파트',
    id: 1,
  },
  {
    name: '송정삼정그린코아',
    address: ['부산광역시 강서구 녹산산단335로 7', '부산 강서구 송정동 1627-5'],
    deal: ['1억 2000만원', '9억 8000만원'],
    type: '아파트',
    id: 1,
  },
];

function InterestContainer() {
  const navigate = useNavigate();

  /** 스크롤 */
  const [scrollY, setScrollY] = useState<number>(0);

  /** 스크롤 */
  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  /** 집 찾아보기 클릭 */
  const onClickGoMap = () => {
    navigate('/map');
  };

  /** 집 상세보기 클릭 */
  const onClickGoDetail = () => {
    navigate('/detail');
  };

  /** Interest 보여줄지 여부 */
  const [showInterest, setShowInterest] = useState<boolean>(false);

  /** 스크롤 이벤트 추가 */
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    /** 스크롤 300 이상이면 Interest 보여주기 */
    if (scrollY >= 300) {
      setShowInterest(true);
    }
  });

  // 관심 매물 목록 조회하기
  // const [interestList, setInterestList] = useState<InterestType[]>([]);

  // const APIURL = 'http://localhost:5000';

  // const getInterestList = () => {
  //   axios
  //     .get(`${APIURL}/api/like`)
  //     .then((response) => {
  //       console.log('데이터 조회 성공');
  //       console.log(response.data);
  //       setInterestList(response.data); // 받아온 데이터로 덮어쓰기
  //     })
  //     .catch((error) => {
  //       console.error('데이터 조회 실패');
  //       console.error(error);
  //     });
  // };

  // useEffect(() => {
  //   getInterestList();
  // }, []);
  return (
    <div className={styles.container}>
      <div className={styles.container1}>
        <div className={styles.bigbox}>
          <div className={styles.box1}></div>
          <div className={styles.box2}>
            <div className={styles.box2_1}></div>
            <div className={styles.box2_2}>
              <br />
              <br />
              <br />
              <h1 className="text-fade-in">관심 매물</h1>
            </div>
          </div>
          <div className={styles.box3}>
            <div className={styles.box3_1}></div>
          </div>
          <div className={styles.box4}></div>
          <div className={styles.box5}></div>
        </div>
        <div>
          <div className={styles.introduce}>
            <h1 className="text-fade-in">마음에 드는 매물을 찾아서</h1>
            <br />
            <h1 className="text-fade-in">이 곳에 저장하세요!</h1>
          </div>
          <div className={styles['btn-div']}>
            <button className={styles['find-btn']} onClick={onClickGoMap}>
              집 찾아보기
            </button>
          </div>
        </div>
      </div>
      <div className={styles.container2}>
        <div className={styles.title}>
          <h2>관심 매물 목록</h2>
        </div>

        {/* 카드 레이아웃 */}
        <div className={styles.cardlist}>
          <div className={styles.interest}>{showInterest && <InterestCard interestList={interestList} />}</div>
        </div>
      </div>
    </div>
  );
}

export default InterestContainer;
