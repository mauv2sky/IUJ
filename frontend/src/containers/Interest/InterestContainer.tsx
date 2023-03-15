import React, { useEffect, useState } from 'react';
import styles from './InterestContainer.module.scss';
import { useNavigate } from 'react-router-dom';
import { List } from 'reselect/es/types';
import InterestCard, { InterestType } from '../../components/InterestCard/InterestCard';

// API 호출 함수 만듦
// interface Item {
//   id: number;
//   name: string;
//   adress: list;
//   deal: list;
// }

// async function fetchItems(): Promise<Item[]> {
//   const response = await fetch('/api/like');
//   const data = await response.json();

//   return data;
// }

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
  // {
  //   name: '송삼',
  //   address: ['부산광역시 강서구 녹산산단335로 7', '부산 강서구 송정동 1627-5'],
  //   deal: ['123', '987'],
  // },
  // {
  //   name: '송삼',
  //   address: ['부산광역시 강서구 녹산산단335로 7', '부산 강서구 송정동 1627-5'],
  //   deal: ['123', '987'],
  // },
  // {
  //   name: '송삼',
  //   address: ['부산광역시 강서구 녹산산단335로 7', '부산 강서구 송정동 1627-5'],
  //   deal: ['123', '987'],
  // },
  // {
  //   name: '송삼',
  //   address: ['부산광역시 강서구 녹산산단335로 7', '부산 강서구 송정동 1627-5'],
  //   deal: ['123', '987'],
  // },
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

  // 목록에서 API호출 함수사용
  // const [loading, setLoading] = useState<boolean>(true);
  // const [items, setItems] = useState<Item[]>([]);

  // useEffect(() => {
  //   async function fetchItems() {
  //     const response = await fetch('/api/like');
  //     const data = await response.json();

  //     setItems(data);
  //     setLoading(false);
  //   }

  //   fetchItems();
  // }, []);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

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
        {/* <div className={styles.card}>
          {items.map((item) => (
            <div key={item.id}>
              <div>{item.name}</div>
              <div>{item.deal}</div>
              <div>{item.address}</div>
            </div>
          ))}
        </div> */}

        {/* 카드 레이아웃 */}
        <div className={styles.cardlist}>
          <div className={styles.interest}>{showInterest && <InterestCard interestList={interestList} />}</div>
          {showInterest && <div className={styles.hr} />}
        </div>
      </div>
    </div>
  );
}

export default InterestContainer;
