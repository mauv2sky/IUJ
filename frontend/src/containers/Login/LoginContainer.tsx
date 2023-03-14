import React from 'react';
import styles from './LoginContainer.module.scss';
import { useNavigate } from 'react-router-dom';

function LoginContainer() {
  const navigate = useNavigate();
  const onClickGoMap = () => {
    navigate('/map');
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>간편하게 회원가입하고</h1>
        <h1>로그인하세요</h1>
        <div className={styles['btn-div']}>
          <button className={styles['find-btn']} onClick={onClickGoMap}>
            구글 로그인
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginContainer;
