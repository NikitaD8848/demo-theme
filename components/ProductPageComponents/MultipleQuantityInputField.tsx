import React, { useEffect } from 'react';
import styles from '../../styles/components/productDetail.module.scss';
import { FaRegCheckCircle, FaWindowClose } from 'react-icons/fa';

function MultipleQuantityInputField({ productVariantData, handleMultipleQtyChange, itemList, selectedMultiLangData }: any) {
  return (
    <div>
      {productVariantData?.variants?.length > 0 &&
        productVariantData?.variants?.map((variant: any, index: any) => (
          <div className="d-flex" key={index}>
            <div>
              <p className={`my-1 ${styles.detailPriceSection}`}>
                {selectedMultiLangData?.sku_code} : <span>{variant?.variant_code}</span>
              </p>
              <div className={`my-1 ${styles.detailPriceSection}`}>
                <label htmlFor="productQuantity">{selectedMultiLangData?.quantity}:</label>
                <input
                  className={`ms-2 rounded border px-1 ${styles.input} ${styles.detailPriceSection}`}
                  id="productQuantity"
                  value={itemList[index]?.quantity}
                  onChange={(e) => handleMultipleQtyChange(index, variant?.variant_code, e.target.value)}
                />
              </div>
            </div>
            <div className="my-1 d-flex align-items-center">
              {variant?.stock ? (
                <span className={`fw-bold mx-4 ${styles.avalibility}`}>
                  <FaRegCheckCircle className={`text-success me-1 ${styles.stockSection}`} size={'1rem'} />
                  {selectedMultiLangData?.available}
                </span>
              ) : (
                <span className={`mx-4 fw-bold  ${styles.avalibility}`}>
                  <FaWindowClose className={`text-danger me-1 ${styles.stockSection}`} size={'1rem'} />
                  {selectedMultiLangData?.item_out_of_stock}
                </span>
              )}
            </div>
          </div>
        ))}
    </div>
  );
}

export default MultipleQuantityInputField;
