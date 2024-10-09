import React from 'react';
import styles from '../../styles/components/productDetail.module.scss';

const AddToCartBtn = ({ handleAddToCart, selectedMultiLangData, addToCartLoaderBtn, cartData, productDetailData }: any) => {
  let cartProducts: any;
  {
    cartData?.length > 0 &&
      cartData?.map((item: any) => {
        if (item === productDetailData?.name) {
          cartProducts = item;
        }
      });
  }
  if (!cartProducts) {
    return (
      <button
        onClick={() => handleAddToCart()}
        className={`border-0 px-5 py-2 rounded-1 mb-3 mt-2 ${styles.buttonBackGround} ${styles.detail_page_btn}`}
      >
        {addToCartLoaderBtn ? (
          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        ) : (
          <>{selectedMultiLangData?.add_to_cart}</>
        )}
      </button>
    );
  } else {
    return (
      <button
        onClick={() => handleAddToCart()}
        className={`border-0 px-5 py-2 rounded-1 mb-3 mt-2 ${styles.buttonBackGround_added} ${styles.detail_page_btn}`}
      >
        {addToCartLoaderBtn ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : <>Added</>}
      </button>
    );
  }
};

export default AddToCartBtn;
