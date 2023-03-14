import React from 'react';
import styles from './DetailContainer.module.scss';
import { useNavigate } from 'react-router-dom';

function DetailContainer() {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div>여긴 상세 페이지</div>
    </div>
  );
}

export default DetailContainer;
