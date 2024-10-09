import Link from 'next/link';
import React from 'react';
import UseBreadCrumbsHook from '../hooks/GeneralHooks/useBreadcrumbs';
import { FaHome } from 'react-icons/fa';
import { FaAngleRight } from 'react-icons/fa6';

function BreadCrumbs() {
  const { breadCrumbData, isLoading, errorMessage } = UseBreadCrumbsHook();
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link href="/" legacyBehavior>
            <a href="">
              <FaHome className=" mb-1" />
            </a>
          </Link>
        </li>
        {breadCrumbData?.length > 0 &&
          breadCrumbData?.map((item: any, index: number) => (
            <div key={index} className="d-flex">
              <FaAngleRight className=" my-1" size={15} color="#999" />
              <li className="breadcrumb-item active text-secondary" aria-current="page">
                <Link href={`${item?.link}?page=1`} legacyBehavior className="text-secondary">
                  {item?.name}
                </Link>
              </li>
            </div>
          ))}
      </ol>
    </nav>
  );
}

export default BreadCrumbs;
