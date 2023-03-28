// import React, { useState } from 'react';
// import FacilityListItem from '../FacilityListItem/FacilityListItem';
// import styles from './FacilityList.module.scss';

// export type FacilityType = {
//   [key: string]: string | number[] | number;
// };

// type FacilityPropsType = {
//   facilitylist: FacilityType[];
// };

// function FacilityList({ facilitylist }: FacilityPropsType) {
//   return (
//     <div>
//       {facilitylist.map((item, index) => (
//         <div key={index}>
//           <div>이름: {item.name}</div>
//           <div>주소: {item.address}</div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default FacilityList;

import React, { useState } from 'react';
import FacilityListItem, { FacilityListItemType } from '../FacilityListItem/FacilityListItem';
import styles from './FacilityList.module.scss';

export type FacilityType = {
  // [key: string]: string | string | number[];
  name: string;
  address: string;
  latlng: number[];
};

type FacilityPropsType = {
  facilitylist: FacilityType[];
};

function FacilityList({ facilitylist }: FacilityPropsType) {
  const facilitylistitem: FacilityListItemType = {
    name: '',
    address: '',
    latlng: [0, 0],
  };

  return (
    <div className={styles.component}>
      {facilitylist.map((item, index) => (
        <div key={index}>
          <FacilityListItem facilitylistitem={item} />
        </div>
      ))}
    </div>
  );
}

export default FacilityList;
