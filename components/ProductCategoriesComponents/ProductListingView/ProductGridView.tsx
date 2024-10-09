import WebFilter from '../FilterView/WebFilter';
import ProductlistingGridViewMaster from './ProductlistingGridViewMaster';

function ProductGridView({
  isLoading,
  productListingData,
  handlePaginationBtn,
  pageOffset,
  handlePageClick,
  productListTotalCount,
  wishlistData,
  isSuperAdmin,
  handleShowCatalogModal,
  handleDeleteCatalogItem,
  cartData,
}: any) {
  return (
    <div className="row ps-lg-5 ps-sm-2 pe-lg-5">
      <div className="col-12 col-md-2 px-sm-3 web-filter d-none d-sm-block ">
        <WebFilter />
      </div>
      <div className="container-md col-md-10">
        <div className="row mt-2 product-listing-row">
          <ProductlistingGridViewMaster
            productListingData={productListingData}
            handlePaginationBtn={handlePaginationBtn}
            productListTotalCount={productListTotalCount}
            pageOffset={pageOffset}
            handlePageClick={handlePageClick}
            wishlistData={wishlistData}
            isLoading={isLoading}
            isSuperAdmin={isSuperAdmin}
            handleShowCatalogModal={handleShowCatalogModal}
            handleDeleteCatalogItem={handleDeleteCatalogItem}
            cartData={cartData}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductGridView;
