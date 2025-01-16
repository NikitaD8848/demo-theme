import React from 'react';
import styles from '../../../styles/components/productDetail.module.scss';
interface DescriptionTabPropTypes {
  data: string | null;
}

function DescriptionTab({ data }: DescriptionTabPropTypes) {
  return (
    <div>
      {data !== null ? (
        <div dangerouslySetInnerHTML={{ __html: data }} className={`${styles.detail_description}`} />
      ) : (
        <p>No description provided.</p>
      )}
    </div>
  );
}

export default DescriptionTab;
