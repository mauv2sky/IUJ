import React, { useEffect, useRef, useState } from 'react';
import bannerMp4 from '../../assets/banner.mp4';
import styles from './MainContainer.module.scss';

function MainContainer() {
  const [showBannerLogo, setShowBannerLogo] = useState(0);
  const bannerLogo = 'IUJ';
  const bannerLogoList = bannerLogo.split('').slice(0, showBannerLogo);
  let logoInterval: number | undefined;
  const [showBanner, setShowBanner] = useState(false);
  const [showBannerDes1, setShowBannerDes1] = useState(0);
  const [showBannerDes2, setShowBannerDes2] = useState(0);
  const [showBannerDes3, setShowBannerDes3] = useState(0);
  const bannerDes1 = 'for happiness and peace';
  const bannerDes2 = 'in your family';
  const bannerDes3 = 'look for a house of your taste';
  const bannerDesList1 = bannerDes1.split('').slice(0, showBannerDes1);
  const bannerDesList2 = bannerDes2.split('').slice(0, showBannerDes2);
  const bannerDesList3 = bannerDes3.split('').slice(0, showBannerDes3);
  let des1Interval: number | undefined;
  let des2Interval: number | undefined;
  let des3Interval: number | undefined;
  const [showFindBtn, setShowFindBtn] = useState(false);

  /** 로고 천천히 보여주기 */
  useEffect(() => {
    if (showBannerLogo === 0) {
      logoInterval = window.setInterval(() => {
        setShowBannerLogo((prev) => prev + 1);
      }, 25);
    }
  }, [showBannerLogo]);

  /** 설명 첫째 줄 천천히 보여주기 */
  useEffect(() => {
    if (showBannerLogo === bannerLogo.length) {
      clearInterval(logoInterval);
      setShowBanner(true);
      des1Interval = window.setInterval(() => {
        setShowBannerDes1((prev) => prev + 1);
      }, 15);
    }
  }, [showBannerLogo]);

  /** 설명 둘째 줄 천천히 보여주기 */
  useEffect(() => {
    if (showBannerDes1 === bannerDes1.length) {
      clearInterval(des1Interval);
      des2Interval = window.setInterval(() => {
        setShowBannerDes2((prev) => prev + 1);
      }, 30);
    }
  }, [showBannerDes1]);

  /** 설명 셋째 줄 천천히 보여주기 */
  useEffect(() => {
    if (showBannerDes3 === bannerDes3.length) {
      clearInterval(des3Interval);
      setShowFindBtn(true);
    }

    if (showBannerDes2 === bannerDes2.length) {
      clearInterval(des2Interval);
      des3Interval = window.setInterval(() => {
        setShowBannerDes3((prev) => prev + 1);
      }, 45);
    }
  }, [showBannerDes2, showBannerDes3]);

  return (
    <div className={styles.container}>
      <div className={styles.banner}>
        <div className={styles.circle} />
        <div className={styles.diag} />
        <div className={styles.square} />
        <div className={styles['banner-content']}>
          <div className={styles['banner-content-left']}>
            <p className={styles['tmp-logo']}>
              {bannerLogoList.map((char, index) => (
                <span key={index}>{char}</span>
              ))}
            </p>
            {showBanner && (
              <div className={styles['banner-frame']}>
                <video muted autoPlay loop className={styles['banner-mp4']}>
                  <source src={bannerMp4} type="video/mp4" />
                </video>
              </div>
            )}
          </div>
          <div className={styles['banner-content-right']}>
            <div className={styles['banner-des-div']}>
              <p className={styles['banner-des']}>
                {bannerDesList1.map((char, index) => (
                  <span key={index}>{char}</span>
                ))}
              </p>
              <p className={styles['banner-des']}>
                {bannerDesList2.map((char, index) => (
                  <span key={index}>{char}</span>
                ))}
              </p>
              <p className={styles['banner-des']}>
                {bannerDesList3.map((char, index) => (
                  <span key={index}>{char}</span>
                ))}
              </p>
            </div>
            <div className={styles['btn-div']}>{showFindBtn && <button className={styles['find-btn']}>집 찾아보기</button>}</div>
          </div>
        </div>
      </div>
      <div className={styles.notice}>
        <p className={styles['notice-title']}>Notice</p>
      </div>
    </div>
  );
}

export default MainContainer;
