import React from 'react';
import styles from './LoginContainer.module.scss';
import { useNavigate } from 'react-router-dom';

function LoginContainer() {
  const navigate = useNavigate();
  const onClickGoMap = () => {
    navigate('/map');
  };

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.title}>
          <h1>나의 맞춤 매물을</h1>
          <h1>찾아보세요</h1>
          <div className={styles['btn-div']}>
            <button className={styles['find-btn']} onClick={onClickGoMap}>
              구글 로그인
            </button>
          </div>
        </div>
      </div>
      <div className={styles.footerstyle}>
        <div className={styles.box1}></div>
        <div className={styles.box2}>
          <div className={styles.box2_1}></div>
          <div className={styles.box2_2}></div>
        </div>
        <div className={styles.box3}>
          <div className={styles.box3_1}></div>
          <div className={styles.box3_2}></div>
        </div>
        <div className={styles.box4}></div>
      </div>
    </div>
  );
}

export default LoginContainer;
