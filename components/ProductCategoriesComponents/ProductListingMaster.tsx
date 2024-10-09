import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useCatalogFunctions from '../../hooks/CatalogHooks/useCatalogFunctions';
import useProductListing from '../../hooks/ProductListPageHooks/useProductsDataHook';
import { selectCart } from '../../store/slices/cart-slices/cart-local-slice';
import { selectCatalogList } from '../../store/slices/catalog-slice/catalog-local-slice';
import { SelectedFilterLangDataFromStore } from '../../store/slices/general_slices/selected-multilanguage-slice';
import { selectWishlist } from '../../store/slices/wishlist-slices/wishlist-local-slice';
import BreadCrumbs from '../BreadCrumbs';
import AddToCatalogModal from '../Catalog/AddToCatalogModal';
import FilterModal from './FilterView/FilterModal';
import FloatingFilterBtn from './FloatingBtns/FloatingFilterBtn';
import FloatingSortbyBtn from './FloatingBtns/FloatingSortbyBtn';
import HorizantalFilterMaster from './HorizantalFilter/HorizantalFilterMaster';
import SortbyModal from './HorizantalFilter/SortbyModal';
import ProductGridView from './ProductListingView/ProductGridView';

function ProductListingMaster() {
  const {
    productListingData,
    productListTotalCount,
    toggleProductListView,
    handleToggleProductsListingView,
    handleLoadMore,
    handlePaginationBtn,
    query,
    isLoading,
    errorMessage,
    sortBy,
    handleSortBy,
  } = useProductListing();
  const wishlistData = useSelector(selectWishlist).items;
  const cartData = useSelector(selectCart).items;
  const isSuperAdmin = localStorage.getItem('isSuperAdmin');
  const pageOffset = Number(query?.page) - 1;
  const catalogListData = useSelector(selectCatalogList).catalogList;
  const { handleAddProductToCatalog, handleDeleteCatalogItem }: any = useCatalogFunctions();
  const [catalogItem, setCatalogItem] = useState('');
  const [showCatalogModal, setShowCatalogModal] = useState(false);
  const handleCloseCatalogModal = () => setShowCatalogModal(false);
  const handleShowCatalogModal = (item: any) => {
    setCatalogItem(item);
    setShowCatalogModal(true);
  };
  const handleSaveCatalogName = (catalogName: any) => {
    if (catalogItem !== '' && catalogName !== '') {
      handleAddProductToCatalog(catalogName, catalogItem);
      setShowCatalogModal(false);
    }
  };
  const handlePageClick = (event: any) => {
    handlePaginationBtn(event?.selected);
  };
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showSortbyModal, setShowSortbyModal] = useState(false);

  const handleCloseFilterModal = () => setShowFilterModal(false);
  const handleShowFilterModal = () => setShowFilterModal(true);

  const handleCloseSortbyModal = () => setShowSortbyModal(false);
  const handleShowSortbyModal = () => setShowSortbyModal(true);
  const [selectedMultiLangData, setSelectedMultiLangData] = useState<any>();
  const SelectedLangDataFromStore: any = useSelector(SelectedFilterLangDataFromStore);
  useEffect(() => {
    if (Object.keys(SelectedLangDataFromStore?.selectedLanguageData)?.length > 0) {
      setSelectedMultiLangData(SelectedLangDataFromStore?.selectedLanguageData);
    }
  }, [SelectedLangDataFromStore]);
  return (
    <>
      <section className="listing-page position-realtive">
        <div className="container-fluid d-flex justify-content-between w-100 ps-lg-5 pe-lg-5 px-sm-4 ">
          <div className="w-50 list-toggle-rtl">
            <BreadCrumbs />
          </div>
          <HorizantalFilterMaster sortBy={sortBy} handleSortBy={handleSortBy} />
        </div>
        <div className="container-fluid">
          <ProductGridView
            productListingData={productListingData}
            handlePaginationBtn={handlePaginationBtn}
            productListTotalCount={productListTotalCount}
            pageOffset={pageOffset}
            handlePageClick={handlePageClick}
            isLoading={isLoading}
            wishlistData={wishlistData}
            isSuperAdmin={isSuperAdmin}
            handleShowCatalogModal={handleShowCatalogModal}
            handleDeleteCatalogItem={handleDeleteCatalogItem}
            cartData={cartData}
          />
        </div>
        <div className="sticky_filter_btn w-100  d-block d-sm-none">
          <div className="row">
            <div className="col-6 p-0 border">
              <FloatingFilterBtn handleShow={handleShowFilterModal} selectedMultiLangData={selectedMultiLangData} />
            </div>
            <div className="col-6 p-0 border">
              <FloatingSortbyBtn handleShow={handleShowSortbyModal} selectedMultiLangData={selectedMultiLangData} />
            </div>
          </div>
        </div>
      </section>
      <FilterModal show={showFilterModal} handleClose={handleCloseFilterModal} title={selectedMultiLangData?.filter} />
      <SortbyModal show={showSortbyModal} handleClose={handleCloseSortbyModal} sortBy={sortBy} handleSortBy={handleSortBy} />
      <AddToCatalogModal
        show={showCatalogModal}
        handleClose={handleCloseCatalogModal}
        catalogListData={catalogListData}
        handleSaveCatalogName={handleSaveCatalogName}
      />
      <div className="handle_display_mob_filter">{/* <MobileFilter /> */}</div>
    </>
  );
}

export default ProductListingMaster;
