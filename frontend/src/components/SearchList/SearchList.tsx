import React from 'react';
import { DocumentType, MetaType } from '../../types/SearchType';
import styles from './SearchList.module.scss';

type searchListPropsType = {
  document: DocumentType[];
  meta: MetaType | null;
  setStateCenter: React.Dispatch<React.SetStateAction<number[]>>;
  setSearchClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setDocument: React.Dispatch<React.SetStateAction<DocumentType[]>>;
};

function SearchList({ document, meta, setStateCenter, setSearchClicked, setDocument }: searchListPropsType) {
  const onClickAddress = (lat: string, lng: string) => {
    setSearchClicked((prev) => !prev);
    setDocument([]);
    setStateCenter([parseFloat(lat), parseFloat(lng)]);
    return;
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
