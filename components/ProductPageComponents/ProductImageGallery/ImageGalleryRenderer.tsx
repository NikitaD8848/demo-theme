import { ProductSlideshowImages } from '../../../interfaces/product-slideshow-images';
import ImageGalleryWithLeftThumbnails from './ImageGalleryWithLeftThumbnails';
import ImageGalleryWithRightThumbnails from './ImageGalleryWithRightThumbnails';
import ImageGalleryWithBottomThumbnails from './ImageGalleryWithBottomThumbnails';
const ImageGalleryRenderer = ({ imageComponentName, slideShowImages }: any) => {
  const renderImageComponent = () => {
    switch (imageComponentName) {
      case 'Image Thumbnails on the Left':
        return <ImageGalleryWithLeftThumbnails slideShowImages={slideShowImages} />;

      case 'Image Thumbnails on the Right':
        return <ImageGalleryWithRightThumbnails slideShowImages={slideShowImages} />;

      case 'Image Thumbnails on the Bottom':
        return <ImageGalleryWithBottomThumbnails slideShowImages={slideShowImages} />;
    }
  };
  return <>{renderImageComponent()}</>;
};

export default ImageGalleryRenderer;
