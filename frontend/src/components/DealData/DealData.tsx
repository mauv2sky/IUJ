import React, { useState, useEffect } from 'react';
import styles from './DealData.module.scss';
import DealDataItem from '../DealDataItem/DealDataItem';
import { DealType, DetailPropsType, DetailType } from '../DetailInformation/DetailInformation';
import DealChart from '../DealChart/DealChart';
import axios from 'axios';
import { BiLeftArrow } from 'react-icons/bi';
import { BiRightArrow } from 'react-icons/bi';

/** APIURL */
const APIURL = 'https://j8e103.p.ssafy.io';

/** 차트데이터 요청 */
function DealData({ detailRelist, detailid, detailtype }: DetailPropsType) {
  const dealRelist: DealType[] = detailRelist.Deal;
  const [dealChartlist, setDealChartlist] = useState<any>();
  const [max, setMax] = useState<number>(0);
  const [min, setMin] = useState<number>(100000);

  for (let i = 0; i < dealRelist.length; i++) {
    if (dealRelist[i].maxPrice > max) {
      setMax(dealRelist[i].maxPrice);
    }
    if (dealRelist[i].minPrice < min) {
      setMin(dealRelist[i].minPrice);
    }
  }

  useEffect(() => {
    axios({
      method: 'get',
      url: APIURL + `/api/place/${detailtype}/chart/${detailid}`,
    })
      .then((response) => {
        console.log('데이터 전송 성공이구아나');
        console.log(response.data, '여기 확인부탁');
        setDealChartlist(response.data);
      })
      .catch((error) => {
        console.error('데이터 전송 실패이구아나');
        console.error(error);
      });
  }, []);

  // 페이지당 아이템 수
  const itemsPerPage = 10;
  // 현재 페이지
  const [currentPage, setCurrentPage] = useState<number>(1);
  // 시작 인덱스
  const startIndex = (currentPage - 1) * itemsPerPage;
  // 끝 인덱스
  const endIndex = currentPage * itemsPerPage;

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // 총 아이템 수
  const totalItems = dealRelist.reduce((total, data) => {
    return total + data.deals.length;
  }, 0);

  // 전체 페이지 수
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // 현재 페이지의 아이템 목록
  const currentPageItems = dealRelist.flatMap((data) => data.deals).slice(startIndex, endIndex);
  // console.log('제발', dealChartlist);

  return (
    <div className={styles.component}>
      <div>
        <DealChart dealChartlist={dealChartlist} min={min} max={max} />{' '}
      </div>
      <div className={styles.dealtitle}>
        <div className={styles.type}>거래타입</div>
        <div className={styles.time}>거래일</div>
        <div className={styles.space}>전용면적</div>
        <div className={styles.floor}>층</div>
        <div className={styles.cost}>금액(만원)</div>
      </div>

      {currentPage > 1 && (
        <button name="left" className={styles['left-btn']} onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          <BiLeftArrow />
        </button>
      )}
      {currentPage < totalPages && (
        <button name="right" className={styles['right-btn']} onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          <BiRightArrow />
        </button>
      )}
      <div>
        {currentPageItems.map((item: any, index: number) => (
          <DealDataItem key={index} dealDataItem={item} />
        ))}
      </div>
    </div>
  );
}

export default DealData;
