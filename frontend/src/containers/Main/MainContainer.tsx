import React, { useEffect, useRef, useState } from 'react';
import bannerMp4 from '../../assets/banner.mp4';
import Notice, { NoticeInterface } from '../../components/Notice/Notice';
import styles from './MainContainer.module.scss';
import service1 from '../../assets/service1.jpg';
import service2 from '../../assets/service2.jpg';
import { useNavigate } from 'react-router-dom';

const noticeList: NoticeInterface[] = [
  {
    title: '신혼희망타운',
    content: '육아·보육을 비롯한 신혼부부 수요를 반영하여 건설하고, 전량을 신혼부부에게 공급하는 신혼부부 특화형 공공주택입니다.',
    url: 'https://housing.seoul.go.kr/site/main/content/sh01_060511',
  },
  {
    title: '내집마련 디딤돌대출',
    content: '정부 지원 3대 서민 구입자금을 하나로 통합한 저금리의 주택구입자금 대출 제도',
    url: 'https://www.fss.or.kr/s1332/financial/financial03050101.jsp',
  },
  {
    title: '주거안정 월세대출',
    content: '월세 부담으로 고민인 분들을 위한 월세 자금 대출제도',
    url: 'https://www.fss.or.kr/s1332/financial/financial03050202.jsp',
  },
  {
    title: '청년 임차보증금 이자지원 사업',
    content: '목돈 마련이 어려운 근로청년 및 취업준비생의 소득대비 높은 주거비용 부담경감을 위해 임차보증금 대출을 지원 합니다.',
    url: 'https://housing.seoul.go.kr/site/main/content/sh01_040901',
  },
  {
    title: '중소기업취업청년 전월세보증금대출',
    content: '중소기업에 취업한 청년들에게 저리의 중소기업 취업청년 전월세보증금 대출해드립니다.',
    url: 'https://nhuf.molit.go.kr/FP/FP05/FP0502/FP05020603.jsp',
  },
  {
    title: '서울 신혼부부 임차보증금 이자지원 사업',
    content: '신혼부부들의 행복한 미래를 위해 더 나은 주거환경과 소득대비 높은 주거비 부담을 완화하기 위해 신혼부부 임차보증금 지원사업을 시행합니다.',
    url: 'https://housing.seoul.go.kr/site/main/content/sh01_0400800',
  },
];

function MainContainer() {
  // ================================ 변수, useState ================
  const navigate = useNavigate();
  /** 글자 천천히 보여주기 위한 Interval */
  let logoInterval: number | undefined, des1Interval: number | undefined, des2Interval: number | undefined, des3Interval: number | undefined;
  /** 스크롤 */
  const [scrollY, setScrollY] = useState(0);
  /** 배너 로고 얼만큼 보여줄지 */
  const [showBannerLogo, setShowBannerLogo] = useState(0);
  const bannerLogo = 'IUJ';
  const bannerLogoList = bannerLogo.split('').slice(0, showBannerLogo);
  /** 배너 mp4 보여줄지 여부 */
  const [showBanner, setShowBanner] = useState(false);
  /** ===== 배너 설명 첫째 줄 ~ 셋째 줄 얼만큼 보여줄지 ===== */
  const [showBannerDes1, setShowBannerDes1] = useState(0);
  const [showBannerDes2, setShowBannerDes2] = useState(0);
  const [showBannerDes3, setShowBannerDes3] = useState(0);
  /** ======================================================= */
  const bannerDes1 = 'for happiness and peace';
  const bannerDes2 = 'in your family';
  const bannerDes3 = 'look for a house of your taste';
  const bannerDesList1 = bannerDes1.split('').slice(0, showBannerDes1);
  const bannerDesList2 = bannerDes2.split('').slice(0, showBannerDes2);
  const bannerDesList3 = bannerDes3.split('').slice(0, showBannerDes3);
  /** 집 찾아보기 버튼 보여줄지 여부 */
  const [showFindBtn, setShowFindBtn] = useState(false);
  /** Notice 보여줄지 여부 */
  const [showNotice, setShowNotice] = useState(false);
  /** Service 첫 번째 제목 ref */
  const serviceTitle1Ref = useRef<HTMLParagraphElement>(null);
  /** Service 첫 번째 내용 ref */
  const serviceContent1Ref = useRef<HTMLParagraphElement>(null);
  /** Service 첫 번째 이미지 ref */
  const serviceImg1Ref = useRef<HTMLImageElement>(null);
  /** Service 두 번째 제목 ref */
  const serviceTitle2Ref = useRef<HTMLParagraphElement>(null);
  /** Service 두 번째 내용 ref */
  const serviceContent2Ref = useRef<HTMLPreElement>(null);
  /** Service 두 번째 이미지 ref */
  const serviceImg2Ref = useRef<HTMLImageElement>(null);

  // ================================ useEffect ================================
  /** 스크롤 이벤트 추가 */
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    /** 스크롤 300 이상이면 Notice 보여주기 */
    if (scrollY >= 300) {
      setShowNotice(true);
    }

    /** service 첫 번째 내용 애니메이션 */
    if (scrollY >= 1000 && scrollY < 1400) {
      if (serviceTitle1Ref.current && serviceContent1Ref.current && serviceImg1Ref.current) {
        serviceTitle1Ref.current.style.opacity = '1';
        serviceTitle1Ref.current.style.fontSize = '70px';
        serviceTitle1Ref.current.style.letterSpacing = '3px';

        serviceContent1Ref.current.style.opacity = '1';
        serviceContent1Ref.current.style.fontSize = '25px';

        serviceImg1Ref.current.style.opacity = '1';
        serviceImg1Ref.current.style.filter = 'grayscale(0.2)';
      }
    } else {
      if (serviceTitle1Ref.current && serviceContent1Ref.current && serviceImg1Ref.current) {
        serviceTitle1Ref.current.style.opacity = '0.7';
        serviceTitle1Ref.current.style.fontSize = '65px';
        serviceTitle1Ref.current.style.letterSpacing = '0px';

        serviceContent1Ref.current.style.opacity = '0.7';
        serviceContent1Ref.current.style.fontSize = '25px';

        serviceImg1Ref.current.style.opacity = '0.7';
        serviceImg1Ref.current.style.filter = 'grayscale(1)';
      }
    }

    /** service 두 번째 내용 애니메이션 */
    if (scrollY >= 1450) {
      if (serviceTitle2Ref.current && serviceContent2Ref.current && serviceImg2Ref.current) {
        serviceTitle2Ref.current.style.opacity = '1';
        serviceTitle2Ref.current.style.fontSize = '70px';
        serviceTitle2Ref.current.style.letterSpacing = '3px';

        serviceContent2Ref.current.style.opacity = '1';
        serviceContent2Ref.current.style.fontSize = '25px';

        serviceImg2Ref.current.style.opacity = '1';
        serviceImg2Ref.current.style.filter = 'grayscale(0.3)';
      }
    } else {
      if (serviceTitle2Ref.current && serviceContent2Ref.current && serviceImg2Ref.current) {
        serviceTitle2Ref.current.style.opacity = '0.7';
        serviceTitle2Ref.current.style.fontSize = '65px';
        serviceTitle2Ref.current.style.letterSpacing = '0px';

        serviceContent2Ref.current.style.opacity = '0.7';
        serviceContent2Ref.current.style.fontSize = '25px';

        serviceImg2Ref.current.style.opacity = '0.7';
        serviceImg2Ref.current.style.filter = 'grayscale(1)';
      }
    }
  }, [scrollY]);

  /** 로고 천천히 보여주기 */
  useEffect(() => {
    logoInterval = window.setInterval(() => {
      setShowBannerLogo((prev) => prev + 1);
    }, 50);
  }, []);

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

  // ================================ Handler ================================

  /** 스크롤 */
  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  /** 집 찾아보기 클릭 */
  const onClickGoMap = () => {
    navigate('/map');
  };

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
            <div className={styles['btn-div']}>
              {showFindBtn && (
                <button className={styles['find-btn']} onClick={onClickGoMap}>
                  집 찾아보기
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.notice}>
        <p className={styles['notice-title']}>Notice</p>
        {showNotice && <Notice noticeList={noticeList} />}
      </div>
      {showNotice && <div className={styles.hr} />}
      {showNotice && (
        <div className={styles.service}>
          <p className={styles['service-title']}>Service</p>
          <div className={styles['service-content']}>
            <div className={styles['service-content-item']}>
              <div className={styles['service-content-item-des']}>
                <p ref={serviceTitle1Ref} className={styles['service-content-item-des-title']} style={{ textAlign: 'right' }}>
                  Customized
                </p>
                <p ref={serviceContent1Ref} className={styles['service-content-item-des-content']} style={{ textAlign: 'right' }}>
                  부동산 추천에 사용되는 점수는 당신이 원하는 인프라를 기반으로 산출됩니다.
                </p>
              </div>
              <img src={service1} ref={serviceImg1Ref} className={styles['service-content-item-img']} />
            </div>
            <div className={styles['service-content-item']}>
              <img src={service2} ref={serviceImg2Ref} className={styles['service-content-item-img']} />
              <div className={styles['service-content-item-des']}>
                <p ref={serviceTitle2Ref} className={styles['service-content-item-des-title']}>
                  For Children
                </p>
                <pre ref={serviceContent2Ref} className={styles['service-content-item-des-content']}>
                  교통, 치안 등의 기본 시설 외에도 유치원, 학군, 학원 등의 <br />
                  자녀를 위한 정보를 제공합니다.
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MainContainer;
