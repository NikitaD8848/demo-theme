import ProductDetailInformation from './ProductDetailInformation';

const ProductDetailInformationRenderer = ({ productDetailComponentName, productDetailProps }: any) => {
  const renderProductDetailComponent = () => {
    switch (productDetailComponentName) {
      case 'Standard Product Information':
        return <ProductDetailInformation {...productDetailProps} />;
    }
  };
  return <>{renderProductDetailComponent()}</>;
};

export default ProductDetailInformationRenderer;
