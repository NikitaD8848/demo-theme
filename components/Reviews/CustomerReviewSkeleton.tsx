import React from 'react';
import { Card, Placeholder } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';

const CustomerReviewSkeleton = () => {
  return (
    <div className="row listing-card py-2">
      <div className="col-lg-12 p-2 border ">
        <div className="row">
          <div className="col-md-2">
            <div className="fs-2 mb-0">
              <FaUserCircle size={27} />
              <Placeholder as={Card.Title} animation="glow">
                <Placeholder style={{ width: '75%', minHeight: '10px' }} />
                <Placeholder style={{ width: '40%', minHeight: '10px' }} />
              </Placeholder>
            </div>
          </div>
          <div className="col-md-8">
            <Placeholder as={Card.Title} animation="glow">
              <Placeholder style={{ width: '75%', minHeight: '10px' }} />
              <Placeholder style={{ width: '50%', minHeight: '10px' }} />
              <Placeholder style={{ width: '70%', minHeight: '10px' }} />
            </Placeholder>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerReviewSkeleton;
