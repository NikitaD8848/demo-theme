import React from 'react';
import styles from '../../../styles/components/productPage.module.scss';
import useProductVariants from '../../../hooks/ProductDetailPageHooks/useProductVariants';

const ProductPageVariants = ({ productVariantData }: any) => {
  const { selectedSlug, unavailableErr, selectedAttributes, availableColors, availableSizes, handleAttributeClick } =
    useProductVariants(productVariantData);

  return (
    <div>
      {selectedSlug === null && unavailableErr !== '' && <p className="text-danger">{unavailableErr}</p>}
      {productVariantData?.variants?.length > 1 && (
        <>
          {productVariantData?.attributes?.length > 0 &&
            productVariantData?.attributes?.map((attribute: any) => (
              <div key={attribute.field_name}>
                <h4 className={`m-0 my-2 ${styles.attribute_name}`}>
                  {attribute.field_name} : {selectedAttributes[attribute.field_name]}{' '}
                </h4>
                <div className="my-3">
                  {attribute?.values?.length > 0 &&
                    attribute.values?.map((value: string, index: number) => {
                      const isActive = selectedAttributes[attribute.field_name] === value;
                      const isDisabled =
                        attribute.field_name === 'Colour' ? !availableColors.includes(value) : !availableSizes.includes(value);

                      // Mapping for Colour variants using hex_values
                      if (attribute.field_name === 'Colour') {
                        const hexColor = attribute.hex_value?.[index] || '#000'; // Fallback to black if hex value is missing
                        return (
                          <div
                            key={value}
                            className={`${styles.colour_variant} ms-1 me-2`}
                            style={{
                              backgroundColor: hexColor,
                              border: isActive ? '2px solid #000' : '1px solid #ccc',
                              cursor: isDisabled ? 'not-allowed' : 'pointer',
                              opacity: isDisabled ? 0.5 : 1,
                              width: '30px',
                              height: '30px',
                              borderRadius: '50%',
                              display: 'inline-block',
                            }}
                            onClick={() => !isDisabled && handleAttributeClick(attribute.field_name, value)}
                            title={value}
                          ></div>
                        );
                      }

                      // Default for non-Colour attributes
                      return (
                        <button
                          key={value}
                          className={`me-2 rounded border ${
                            isActive ? styles.variant_btn_active : isDisabled ? styles.variant_btn_disabled : styles.variant_btn
                          }`}
                          onClick={() => handleAttributeClick(attribute.field_name, value)}
                          disabled={isDisabled}
                        >
                          {value}
                        </button>
                      );
                    })}
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default ProductPageVariants;
