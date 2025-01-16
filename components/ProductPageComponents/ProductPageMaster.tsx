import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useProductDetail from '../../hooks/ProductDetailPageHooks/useProductDetail';
import { selectCart } from '../../store/slices/cart-slices/cart-local-slice';
import { SelectedFilterLangDataFromStore } from '../../store/slices/general_slices/selected-multilanguage-slice';
import styles from '../../styles/components/productDetail.module.scss';
import ProductDetailInformation from './ProductDetailInformation';
import ProductDetailSkeleton from './ProductDetailSkeleton';
import ImageGalleryMaster from './ProductImageGallery/ImageGalleryMaster';
import ProductPageTabSectionMaster from './ProductPageTabSection/ProductPageTabSectionMaster';
const ReviewMaster = dynamic(() => import('../Reviews/ReviewMaster'));
const MatchingProductsWithVariantsCard = dynamic(() => import('./MatchingProductWithVariantCard'));
const StockAvailabilityTable = dynamic(() => import('./StockAvailabilityTable'));
const ProductDetailSpecsAndTech = dynamic(() => import('./ProductDetailSpecsAndTech'));

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
              <div className="">
                {productDetailData?.slide_img && <ImageGalleryMaster slideShowImages={productDetailData?.slide_img} />}
              </div>
            </div>
            <div className="col-md-6 p-4">
              <ProductDetailInformation
                productDetailData={productDetailData}
                pinCode={userEnteredPinCode}
                getPincodesList={getPincodesList}
                checkPinCodeExists={checkPinCodeExists}
                validPinCode={validPinCode}
                handleQtyModificationOnInputEdit={handleQtyModificationOnInputEdit}
                handleQtyModificationOnButtonClick={handleQtyModificationOnButtonClick}
                productVariantData={productVariantData}
                handleStockAvailabilityData={handleStockAvailabilityData}
                itemList={itemList}
                handleMultipleQtyChange={handleMultipleQtyChange}
                qty={qty}
                selectedMultiLangData={selectedMultiLangData}
                cartData={cartData}
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
