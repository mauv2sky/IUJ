import React, { useEffect, useRef, useState } from 'react';
import styles from './MainContainer.module.scss';

function MainContainer() {
  const [scrollY, setScrollY] = useState(0);
  const [showP, setShowP] = useState(0);
  const pDivRef = useRef<HTMLDivElement>(null);
  const pRef = useRef<HTMLParagraphElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);

  const pList = [
    '김희제 바보 김희제 바보 김희제 바보 김희제 바보 김희제 바보',
    '바보 김희제 바보 김희제 바보 김희제 바보 김희제 바보 김희제',
    '박준수 바보 박준수 바보 박준수 바보 박준수 바보 박준수 바보',
    '바보 김희제 바보 김희제 바보 김희제 바보 김희제 바보 김희제',
    '김희제 바보 김희제 바보 김희제 바보 김희제 바보 김희제 바보',
    '바보 김희제 바보 김희제 바보 김희제 바보 김희제 바보 김희제',
  ].slice(0, showP);

  useEffect(() => {
    let interval = window.setInterval(() => {
      setShowP((prev) => prev + 1);
    }, 600);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (pDivRef.current) {
      pDivRef.current.style.marginTop = `calc(20rem + ${scrollY}px)`;
    }
    if (bannerRef.current) {
      bannerRef.current.style.opacity = `calc((100 - ${scrollY}) / 100)`;
    }
  }, [scrollY]);

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  const onClickBanner = () => {
    for (let i = 0; i < 1; i++) {
      alert(
        'ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ 김희제 바보 ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ 김희제 바보 ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ 김희제 바보 ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ  김희제 바보 ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ 김희제 바보 ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ',
      );
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.banner} ref={bannerRef} onClick={onClickBanner}>
          <h1 className={styles.title}>김희제 바보</h1>
        </div>
        <div className={styles['main-content']}>
          <div ref={pDivRef}>
            {pList.map((content, index) => (
              <p key={index} ref={pRef}>
                {content}
              </p>
            ))}
          </div>
        </div>
        <div className={styles.forScroll} />
      </div>
    </div>
  );
}

export default MainContainer;
