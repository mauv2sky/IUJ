import React, { useEffect, useState } from 'react';
import styles from './InterestContainer.module.scss';
import { useNavigate } from 'react-router-dom';
import { List } from 'reselect/es/types';

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

function InterestContainer() {
  const navigate = useNavigate();

  /** 집 찾아보기 클릭 */
  const onClickGoMap = () => {
    navigate('/map');
  };

  /** 집 상세보기 클릭 */
  const onClickGoDetail = () => {
    navigate('/detail');
  };

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
    <div>
      <div className={styles.container1}>
        <div className={styles.bigbox}>
          <div className={styles.box1}></div>
          <div className={styles.box2}>
            <div className={styles.box2_1}></div>
            <div className={styles.box2_2}>
              <br />
              <br />
              <br />
              <h1>관심 매물</h1>
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
            <h1>마음에 드는 매물을 찾아서</h1>
            <br />
            <h1>이 곳에 저장하세요!</h1>
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
          <div className={styles.card}>
            <div>송삼</div>
            <div>1억 1000만 ~ 3억 5000만</div>
            <div>지번: 부산 강서구 송정동 1627-5</div>
            <div>도로명: 부산광역시 강서구 녹산산단335로 7 (송정동)</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InterestContainer;
