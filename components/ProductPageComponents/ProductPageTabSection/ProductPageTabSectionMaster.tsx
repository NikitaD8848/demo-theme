import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import DescriptionTab from './DescriptionTab';
import ProductDetailsTypes from '../../../interfaces/product-details-interface';
import styles from '../../../styles/components/productDetail.module.scss';
import SpecificationTab from './SpecificationTab';
import TechnologiesTab from './TechnologiesTab';
import ReviewsTab from './ReviewsTab';

interface ProductPageTabDectionPropTypes {
  data: ProductDetailsTypes;
}

function ProductPageTabSectionMaster({ data }: ProductPageTabDectionPropTypes) {
  return (
    <div className={`${styles.tab_section}`}>
      <div className="container-fluid w-100 ps-lg-5 pe-lg-4 product-detail-tab">
        <Tabs defaultActiveKey="description" id="fill-tab-example" className="mb-3 justify-content-center">
          <Tab eventKey="description" title="Description">
            <DescriptionTab data={data?.description && data?.description} />
          </Tab>
          <Tab eventKey="specification" title="Specification">
            <SpecificationTab />
          </Tab>
          <Tab eventKey="technologies" title="Technologies">
            <TechnologiesTab />
          </Tab>
          <Tab eventKey="reviews" title="Reviews">
            <ReviewsTab />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default ProductPageTabSectionMaster;
