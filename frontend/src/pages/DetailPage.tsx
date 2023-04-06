import React from 'react';
import DetailContainer, { DetailContainerProps } from '../containers/Detail/DetailContainer';
import { useParams } from 'react-router-dom';

type DetailPageParams = {
  id: string;
  type: string;
};

function DetailPage() {
  const { id, type } = useParams<DetailPageParams>();
  const detailProps: DetailContainerProps = { detailid: parseInt(id as string), detailtype: type as string };
  console.log(detailProps);

  return <DetailContainer {...detailProps} />;
}

export default DetailPage;
