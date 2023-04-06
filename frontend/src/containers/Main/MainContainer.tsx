import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { setUserLoginState } from '../../store/slices/userSlice';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';
import News from '../../components/News/News';
import { NewsType } from '../../types/MainType';
import styles from './MainContainer.module.scss';
import { http } from '../../api/axios';

function MainContainer() {
  /** ==================================== 변수, useState ==================================== */
  const navigate = useNavigate();
  const [searchParams] = useSearchParams(window.location.search);
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
  /** NewsList */
  const [newsList, setNewsList] = useState<NewsType[]>([]);
  /** News 보여줄지 여부 */
  const [showNews, setShowNews] = useState<boolean>(false);
  /** dispatch */
  const dispatch = useAppDispatch();

  /** ==================================== useEffect ==================================== */
  /** 로그인 정보 가져오기 */
  useEffect(() => {
    const userName = searchParams.get('user_name') as string;
    const accessToken = searchParams.get('access_token') as string;
    const refreshToken = searchParams.get('refresh_token') as string;

    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      dispatch(setUserLoginState({ isLogin: true, userName }));
    }
  }, []);

  /** 스크롤 이벤트 추가 */
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  /** 공지사항 가져오기 */
  useEffect(() => {
    requestNews();
  }, []);

  /** 스크롤이 450 이상이면 공지사항 보여주기 */
  useEffect(() => {
    if (scrollY >= 450) {
      setShowNews(true);
    }
  }, [scrollY]);

  /** 타이틀 천천히 보여주기 */
  useEffect(() => {
    bannerTitleInteval = window.setInterval(() => {
      setShowBannerTitle((prev) => prev + 1);
    }, 150);
  }, []);

  /** 설명 첫째 줄 천천히 보여주기 */
  useEffect(() => {
    if (showBannerTitle === bannerTitle.length) {
      clearInterval(bannerTitleInteval);

      bannerDes1Interval = window.setInterval(() => {
        setShowBannerDes1((prev) => prev + 1);
      }, 20);
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
      }, 40);
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

  /** ==================================== Axios ==================================== */
  const requestNews = async () => {
    try {
      const res1 = await http.get('api/news');
      console.log(res1);
      setNewsList(res1.data);
    } catch (err) {
      console.error(err);
    }
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
      <div className={styles.news}>
        <p className={styles['news-title']}>News</p>
        {showNews && <News newsList={newsList} />}
        {!showNews && <div className={styles['news-null']} />}
      </div>
    </div>
  );
}

export default MainContainer;
