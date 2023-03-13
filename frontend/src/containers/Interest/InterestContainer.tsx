import React, { useState } from 'react';
import styles from './InterestContainer.module.scss';

function InterestContainer() {
  // const [first, setfirst] = useState(0);

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
          <div className={styles.searchbutton}>집 찾아보기</div>
        </div>
      </div>
      <div className={styles.container2}>
        <div>
          <h5>매물 주소</h5>
          <h5>건물 종류</h5>
        </div>
      </div>
    </div>
  );
}

export default InterestContainer;
