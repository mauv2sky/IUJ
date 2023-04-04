// import React from 'react';
// import DetailContainer from '../containers/Detail/DetailContainer';

// function DetailPage() {
//   return <DetailContainer />;
// }

// export default DetailPage;

import React from 'react';
import DetailContainer, { DetailContainerProps } from '../containers/Detail/DetailContainer';
import { useParams } from 'react-router-dom';

interface DetailPageParams {
  id: string;
  type: string;
}

function DetailPage() {
  const { id, type } = useParams<DetailPageParams>();
  const detailProps: DetailContainerProps = { detailid: parseInt(id), detailtype: type };
  console.log(detailProps);

  return <DetailContainer {...detailProps} />;
}

export default DetailPage;
