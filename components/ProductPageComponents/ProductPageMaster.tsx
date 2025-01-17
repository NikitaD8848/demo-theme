import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useProductDetail from '../../hooks/ProductDetailPageHooks/useProductDetail';
import { selectCart } from '../../store/slices/cart-slices/cart-local-slice';
import { SelectedFilterLangDataFromStore } from '../../store/slices/general_slices/selected-multilanguage-slice';
import styles from '../../styles/components/productDetail.module.scss';
import ProductDetailInformation from './ProductDetailInformationComponents/ProductDetailInformation';
import ProductDetailSkeleton from './ProductDetailSkeleton';
import ImageGalleryRenderer from './ProductImageGallery/ImageGalleryRenderer';
import ProductPageTabSectionMaster from './ProductPageTabSection/ProductPageTabSectionMaster';
import ProductDetailInformationRenderer from './ProductDetailInformationComponents/ProductDetailInformationRenderer';

function ProductPageMaster({ componentsList }: any) {
  const {
    productDetailData,
    productVariantData,
    isLoading,
    errorMessage,
    handleMultipleQtyChange,
    itemList,
    qty,
    handleQtyModificationOnInputEdit,
    handleQtyModificationOnButtonClick,
    handleStockAvailabilityData,
    stockAvailabilityData,
    userEnteredPinCode,
    getPincodesList,
    checkPinCodeExists,
    validPinCode,
  } = useProductDetail();
  const [selectedMultiLangData, setSelectedMultiLangData] = useState<any>();
  const cartData = useSelector(selectCart).items;

  const SelectedLangDataFromStore: any = useSelector(SelectedFilterLangDataFromStore);
  useEffect(() => {
    if (Object.keys(SelectedLangDataFromStore?.selectedLanguageData)?.length > 0) {
      setSelectedMultiLangData(SelectedLangDataFromStore?.selectedLanguageData);
    }
  }, [SelectedLangDataFromStore]);
  if (isLoading) {
    return (
      <div className={`container ${styles.detailContainer} `}>
        <ProductDetailSkeleton />
      </div>
    );
  }
  const productDetailProps = {
    productDetailData,
    userEnteredPinCode,
    getPincodesList,
    checkPinCodeExists,
    validPinCode,
    handleQtyModificationOnInputEdit,
    handleQtyModificationOnButtonClick,
    productVariantData,
    handleStockAvailabilityData,
    itemList,
    handleMultipleQtyChange,
    qty,
    selectedMultiLangData,
    cartData,
  };
  console.log(componentsList, 'data111');
  function renderProductPageHeaderComponents() {
    if (componentsList?.top_section_component?.length === 0) return;

    if (componentsList?.top_section_component?.length > 0) {
      return componentsList?.top_section_component?.map((componentName: any) => {
        const Component = require(`./${componentName.section_name}/${componentName?.component_name}/MasterComponent`).default;
        return (
          <section className="">
            <Component key={componentName?.component_name} />
          </section>
        );
      });
    }
  }
  function renderProductPageBottomComponents() {
    if (componentsList?.bottom_section_component?.length === 0) return;

    if (componentsList?.bottom_section_component?.length > 0) {
      return componentsList?.bottom_section_component?.map((componentName: any) => {
        const Component = require(`./${componentName.section_name}/${componentName?.component_name}/MasterComponent`).default;
        return (
          <section className="">
            <Component key={componentName?.component_name} />
          </section>
        );
      });
    }
  }

  if (Object?.keys(productDetailData)?.length > 0) {
    return (
      <>
        <div className={`container-fluid ${styles.detailContainer} w-100 ps-lg-5 pe-lg-4 `}>
          {renderProductPageHeaderComponents()}
          <div className="row">
            <div className="col-md-6 p-4 h-100">
              {productDetailData?.slide_img && (
                <ImageGalleryRenderer
                  imageComponentName={componentsList?.magnified_image_component}
                  slideShowImages={productDetailData?.slide_img}
                />
              )}
            </div>
            <div className="col-md-6 p-4">
              <ProductDetailInformationRenderer
                productDetailComponentName={componentsList?.product_information_component}
                productDetailProps={productDetailProps}
              />
            </div>
          </div>
        </div>
        <div className="col-12 mt-4">
          <ProductPageTabSectionMaster data={productDetailData} />
        </div>

        {renderProductPageBottomComponents()}
      </>
    );
  }

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }
  return <></>;
}

export default ProductPageMaster;
