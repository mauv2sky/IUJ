import React, { useState, useEffect } from 'react';
import FacilityListItem, { FacilityListItemType } from '../FacilityListItem/FacilityListItem';
import styles from './FacilityList.module.scss';
import { BiLeftArrow } from 'react-icons/bi';
import { BiRightArrow } from 'react-icons/bi';

export type FacilityType = {
  [key: string]: number | string | string | string | string | string | number;
};

type FacilityPropsType = {
  facilitylist: FacilityType[];
};

function FacilityList(facilitylist: any) {
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 9;

  const facility = facilitylist.facilitylist.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePrevPageClick = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPageClick = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  console.log(facility.length);

  return (
    <div className={styles.component}>
      <div>
        {facility.map((item: FacilityListItemType, index: number) => (
          <div key={index}>
            <FacilityListItem facilitylistitem={item} />
          </div>
        ))}
      </div>
      {currentPage > 1 && (
        <button name="left" className={styles['left-btn']} disabled={currentPage === 1} onClick={handlePrevPageClick}>
          <BiLeftArrow />
        </button>
      )}

      {/* 여기 수정 */}
      {facility.length === 9 && (
        <button name="right" className={styles['right-btn']} disabled={currentPage * itemsPerPage >= facilitylist.facilitylist.length} onClick={handleNextPageClick}>
          <BiRightArrow />
        </button>
      )}
    </div>
  );
}

export default FacilityList;
