import useProductVariants from '../../hooks/ProductDetailPageHooks/useProductVariants';
import styles from '../../styles/components/productDetail.module.scss';

const ProductVariants = ({ productVariantData }: any) => {
  const { selectedSlug, unavailableErr, selectedAttributes, availableColors, availableSizes, handleAttributeClick } =
    useProductVariants(productVariantData);
  return (
    <div>
      {selectedSlug === null && unavailableErr !== '' && <p className="text-danger">{unavailableErr}</p>}
      {productVariantData?.variants?.length > 1 && (
        <>
          {productVariantData?.attributes?.length > 0 &&
            productVariantData?.attributes?.map((attribute: any) => (
              <div key={attribute.field_name} className="py-1">
                <p className="fs-14 m-0">Select {attribute.field_name} :</p>
                <div>
                  {attribute?.values?.length > 0 &&
                    attribute.values?.map((value: string) => {
                      const isActive = selectedAttributes[attribute.field_name] === value;
                      const isDisabled =
                        attribute.field_name === 'Colour' ? !availableColors.includes(value) : !availableSizes.includes(value);
                      return (
                        <button
                          key={value}
                          className={`me-2 px-2 py-1 border ${
                            isActive ? styles.variant_btn_active : isDisabled ? styles.variant_btn_disabled : styles.variant_btn
                          }`}
                          onClick={() => handleAttributeClick(attribute.field_name, value)}
                        >
                          {value}
                        </button>
                      );
                    })}
                </div>
              </div>
            ))}
          <hr className="my-2" />
        </>
      )}
    </div>
  );
};

export default ProductVariants;
