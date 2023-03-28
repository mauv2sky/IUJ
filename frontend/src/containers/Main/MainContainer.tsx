import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';
import Notice from '../../components/Notice/Notice';
import { NoticeType } from '../../types/MainType';
import styles from './MainContainer.module.scss';

const noticeList: NoticeType[] = [
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
  /** ==================================== 변수, useState ==================================== */
  const navigate = useNavigate();
  /** 스크롤 */
  const [scrollY, setScrollY] = useState<number>(0);
  let bannerTitleInteval: number | undefined, bannerDes1Interval: number | undefined, bannerDes2Interval: number | undefined;
  /** 배너 속 타이틀 몇 글자 보여줄지 */
  const [showBannerTitle, setShowBannerTitle] = useState<number>(0);
  const bannerTitle = 'IUJ';
  const bannerTitleList = bannerTitle.split('').slice(0, showBannerTitle);
  /** ===== 배너 속 설명 첫째 줄 ~ 셋째 줄 얼만큼 보여줄지 ===== */
  const [showBannerDes1, setShowBannerDes1] = useState<number>(0);
  const [showBannerDes2, setShowBannerDes2] = useState<number>(0);
  /** ======================================================= */
  const bannerDes1 = '유저가 원하는 인프라를 기반으로';
  const bannerDes2 = '맞춤형 주거 공간을 추천해드립니다.';
  const bannerDesList1 = bannerDes1.split('').slice(0, showBannerDes1);
  const bannerDesList2 = bannerDes2.split('').slice(0, showBannerDes2);
  /** 집 찾아보기 버튼 보여줄지 여부 */
  const [showFindBtn, setShowFindBtn] = useState<boolean>(false);
  /** Notice 보여줄지 여부 */
  const [showNotice, setShowNotice] = useState<boolean>(false);

  /** ==================================== useEffect ==================================== */
  /** 스크롤 이벤트 추가 */
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  /**  */
  useEffect(() => {
    console.log(scrollY);

    if (scrollY >= 450) {
      setShowNotice(true);
    }
  }, [scrollY]);

  /** 타이틀 천천히 보여주기 */
  useEffect(() => {
    bannerTitleInteval = window.setInterval(() => {
      setShowBannerTitle((prev) => prev + 1);
    }, 100);
  }, []);

  /** 설명 첫째 줄 천천히 보여주기 */
  useEffect(() => {
    if (showBannerTitle === bannerTitle.length) {
      clearInterval(bannerTitleInteval);

      bannerDes1Interval = window.setInterval(() => {
        setShowBannerDes1((prev) => prev + 1);
      }, 15);
    }
  }, [showBannerTitle]);

  /** 설명 둘째 줄 천천히 보여주기 */
  useEffect(() => {
    if (showBannerDes2 === bannerDes2.length) {
      clearInterval(bannerDes2Interval);
      setShowFindBtn(true);
    }

    if (showBannerDes1 === bannerDes1.length) {
      clearInterval(bannerDes1Interval);

      bannerDes2Interval = window.setInterval(() => {
        setShowBannerDes2((prev) => prev + 1);
      }, 30);
    }
  }, [showBannerDes1]);

  /** ==================================== event handler ==================================== */
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
        <div className={styles['banner-inner']}>
          <p className={styles['banner-title']}>
            {bannerTitleList.map((char, index) => (
              <span key={index}>{char}</span>
            ))}
          </p>
          <div className={styles['banner-right']}>
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
            </div>
            <div className={styles.margin} />
            <div className={styles['banner-btn-div']}>{showFindBtn && <BsFillArrowRightCircleFill className={styles['banner-btn']} onClick={onClickGoMap} />}</div>
          </div>
        </div>
      </div>
      <div className={styles.notice}>
        <p className={styles['notice-title']}>Notice</p>
        {showNotice && <Notice noticeList={noticeList} />}
        {!showNotice && <div className={styles['notice-null']} />}
      </div>
    </div>
  );
}

export default MainContainer;
