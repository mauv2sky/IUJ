import React, { useState, useEffect } from 'react';
import styles from './DetailInformation.module.scss';
import FacilityList, { FacilityType } from '../../components/FacilityList/FacilityList';
import axios from 'axios';
import DealData from '../../components/DealData/DealData';
// import DealData from '../../components/DealData/DealData';

/** 프롭스 받은 매물 상세 정보 */
export type DetailType = {
  Deal: {
    type: string;
    maxPrice: number;
    minPrice: number;
    deals: {
      aptId: number;
      area: string;
      author: string;
      contract_day: string;
      contract_ym: string;
      dealType: string;
      floor: number;
      guarantee: number;
      id: number;
      monthly: number;
      price: number;
    }[];
  }[];
  home: {
    id: number;
    lat: number;
    lng: number;
    sigungu: string;
    bungi: string;
    name: string;
    built_year: string;
    road_addr: string;
  };
};
/** 프롭스 받은 매물 상세 정보 */
export type DetailPropsType = {
  detailid: number;
  detailtype: string;
  detailRelist: DetailType;
};

/** 학교 정보 axios 저장 */
interface SchoolType {
  id: number;
  name: string;
  type: string;
  lat: string;
  lng: string;
  addr: string;
}

interface AcademyType {
  id: number;
  name: string;
  lat: string;
  lng: string;
  type: string;
  addr: string;
}

interface StudyType {
  school: {
    type: string;
    schools: SchoolType[];
  }[];
  academy: {
    type: string;
    academys: AcademyType[];
  }[];
}

/** APIURL */
const APIURL = 'http://localhost:5000';

function DetailInformation(props: DetailPropsType) {
  const { detailid, detailtype, detailRelist } = props;
  // console.log('detailRelist', detailRelist);
  const detaillist = detailRelist;
  const [schoolRelist, setSchoolRelist] = useState<StudyType>({
    school: [
      {
        type: '',
        schools: [],
      },
    ],
    academy: [
      {
        type: '',
        academys: [],
      },
    ],
  });

  /** 학군 정보 요청 */
  useEffect(() => {
    axios({
      method: 'get',
      // url: APIURL + `/api/place/${props.type}/${props.id}`,
      url: APIURL + `/api/place/${detailtype}/${detailid}/school`,
    })
      .then((response) => {
        // console.log('데이터 전송 성공이냐옹');
        // console.log(response.data);
        setSchoolRelist(response.data);
      })
      .catch((error) => {
        // console.error('데이터 전송 실패이냐옹');
        console.error(error);
      });
  }, []);

  const [tabIndex, setTabIndex] = useState(0);

  const onClickTab = (index: number) => {
    setTabIndex(index);
  };

  const [tabIndex2, setTabIndex2] = useState(0);

  const onClickTab2 = (index: number) => {
    setTabIndex2(index);
  };

  /** APIURL */
  const APIURL = 'http://localhost:5000';

  /** 관심 매물 등록 버튼 클릭 시 */
  const onClickInterestBtn = () => {
    console.log('되냐?');
    axios
      .post(APIURL + `/api/like/`, {
        id: detailid,
        type: detailtype,
      })
      .then((response) => {
        console.log('데이터 전송 성공이다람쥐');
        console.log(response.data);
      })
      .catch((error) => {
        console.error('데이터 전송 실패이다람쥐');
        console.error(error);
      });
  };

  const facilitylist: StudyType[] = [];
  return (
    <div className={styles.component}>
      <div className={styles.information}>
        <div className={styles.deal}>최근 1년간 실거래</div>
        <div className={styles.costdata}>
          <DealData detailRelist={detaillist} detailid={detailid} detailtype={detailtype} />
        </div>

        <div className={styles.school}>인근 학교 정보</div>
        <div className={styles.schooltap}>
          <div className={styles.tab}>
            <div onClick={() => onClickTab(0)} className={tabIndex === 0 ? styles.selected : styles['not-selected']}>
              어린이집
            </div>
            <div onClick={() => onClickTab(1)} className={tabIndex === 1 ? styles.selected : styles['not-selected']}>
              유치원
            </div>
            <div onClick={() => onClickTab(2)} className={tabIndex === 2 ? styles.selected : styles['not-selected']}>
              초등학교
            </div>
            <div onClick={() => onClickTab(3)} className={tabIndex === 3 ? styles.selected : styles['not-selected']}>
              중학교
            </div>
            <div onClick={() => onClickTab(4)} className={tabIndex === 4 ? styles.selected : styles['not-selected']}>
              고등학교
            </div>
            <div onClick={() => onClickTab(5)} className={tabIndex === 5 ? styles.selected : styles['not-selected']}>
              특수학교
            </div>
          </div>
          {schoolRelist.school.map((item, index) => (
            <div key={index}>
              {item && (
                <div>
                  {tabIndex === 0 && item.type === '어린이집' && <FacilityList facilitylist={item.type === '어린이집' ? item.schools : []} />}
                  {tabIndex === 1 && item.type === '유치원' && <FacilityList facilitylist={item.type === '유치원' ? item.schools : []} />}
                  {tabIndex === 2 && item.type === '초등학교' && <FacilityList facilitylist={item.type === '초등학교' ? item.schools : []} />}
                  {tabIndex === 3 && item.type === '중학교' && <FacilityList facilitylist={item.type === '중학교' ? item.schools : []} />}
                  {tabIndex === 4 && item.type === '고등학교' && <FacilityList facilitylist={item.type === '고등학교' ? item.schools : []} />}
                  {tabIndex === 5 && item.type === '특수학교' && <FacilityList facilitylist={item.type === '특수학교' ? item.schools : []} />}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className={styles.school}>인근 학원 정보</div>
        <div className={styles.schooltap2}>
          <div className={styles.tab}>
            <div onClick={() => onClickTab2(0)} className={tabIndex2 === 0 ? styles.selected : styles['not-selected']}>
              입시학원
            </div>
            <div onClick={() => onClickTab2(1)} className={tabIndex2 === 1 ? styles.selected : styles['not-selected']}>
              예체능학원
            </div>
          </div>
          {schoolRelist.academy.map((item, index) => (
            <div key={index}>
              {item && (
                <div>
                  {tabIndex2 === 0 && item.type === '입시.검정 및 보습' && <FacilityList facilitylist={item.type === '입시.검정 및 보습' ? item.academys : []} />}
                  {tabIndex2 === 1 && item.type === '예체능' && <FacilityList facilitylist={item.type === '예체능' ? item.academys : []} />}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.title}>
        <div className={styles.full}>
          <div className={styles.type}>{detailtype}</div>
          <div className={styles.built_year}>{detaillist.home.built_year}</div>
        </div>
        <div className={styles.name}>{detaillist.home.name}</div>
        <div className={styles.address}>
          {detaillist.home.sigungu} {detaillist.home.bungi}
        </div>
        <div className={styles.address}>{detaillist.home.road_addr}</div>
        <button className={styles.interestbutton} onClick={onClickInterestBtn}>
          관심 매물 등록
        </button>
      </div>
    </div>
  );
}

export default DetailInformation;
