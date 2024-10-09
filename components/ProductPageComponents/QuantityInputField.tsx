import React from 'react';
import styles from '../../styles/components/productDetail.module.scss';
import { FaMinus, FaPlus } from 'react-icons/fa6';

const QuantityInputField = ({ qty, handleQtyModificationOnInputEdit, handleQtyModificationOnButtonClick, selectedMultiLangData }: any) => {
  return (
    <>
      <div className={`my-1 ${styles.detailPriceSection}`}>
        <label htmlFor="productQuantity">{selectedMultiLangData?.quantity}:</label>
        <span className="mx-1">
          <FaMinus className="mx-1 cursor-pointer" onClick={() => handleQtyModificationOnButtonClick('decrease')} />
          <input
            className={` rounded border px-1 ${styles.input} ${styles.detailPriceSection}`}
            id="productQuantity"
            name="quantity"
            value={qty}
            onChange={(e) => handleQtyModificationOnInputEdit(e)}
          />
          <FaPlus className="mx-1 cursor-pointer" onClick={() => handleQtyModificationOnButtonClick('increase')} />
        </span>
      </div>
    </>
  );
};

export default QuantityInputField;
