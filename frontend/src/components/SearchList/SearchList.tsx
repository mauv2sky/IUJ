import React, { useEffect } from 'react';
import { DocumentType, MetaType } from '../../types/SearchType';
import styles from './SearchList.module.scss';

type searchListPropsType = {
  document: DocumentType[];
  meta: MetaType | null;
  setStateCenter: React.Dispatch<React.SetStateAction<number[]>>;
};

function SearchList({ document, meta, setStateCenter }: searchListPropsType) {
  useEffect(() => {
    console.log(document);
  }, [document]);

  const onClickAddress = (lat: string, lng: string) => {
    setStateCenter([parseFloat(lat), parseFloat(lng)]);
  };

  return (
    <div className={styles.component}>
      {document.map((data) => (
        <p key={data.address} className={styles['address-item']} onClick={() => onClickAddress(data.lat, data.lng)}>
          {data.address}
        </p>
      ))}
    </div>
  );
}

export default SearchList;
