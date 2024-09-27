import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useDisplayTagHooks from '../../../hooks/HomePageHooks/useFeaturedCollections';
import ErrorImage from '../../../public/assets/images/error-icon.png';
import { selectWishlist } from '../../../store/slices/wishlist-slices/wishlist-local-slice';
import CollectionsLoading from '../FeaturedCollections/CollectionsLoading';
import CardContainer from './CardContainer';
import FeaturedBtn from './FeaturedBtn';

function FeaturedCollection2Master() {
  const { allTagsData, fetchDisplayTagsDataFunction, isLoading, errorMessage } = useDisplayTagHooks();
  const wishlistData = useSelector(selectWishlist).items;
  const [activeTagData, setActiveTagData] = useState<any>(allTagsData && allTagsData[0]);

  const handleFeaturedBtnClick = (tagIndex: any) => {
    console.log(tagIndex, 'data1');
    setActiveTagData(allTagsData[tagIndex]);
  };
  useEffect(() => {
    setActiveTagData(allTagsData[0]);
  }, [allTagsData]);
  const handleDataRendering = () => {
    if (isLoading) {
      return <CollectionsLoading />;
    } else if (allTagsData?.length > 0) {
      return (
        <div className="p-0 mt-5 mb-3">
          <div className="d-flex justify-content-start flex-wrap py-2 ps-2 ps-md-0">
            {allTagsData?.length > 0 &&
              allTagsData?.map((tag: any, tagIndex: number) => (
                <FeaturedBtn
                  key={tagIndex}
                  tagName={tag?.tag_name}
                  handleFeaturedBtnClick={() => handleFeaturedBtnClick(tagIndex)}
                  isActive={activeTagData?.tag_name === tag.tag_name}
                />
              ))}
          </div>
          <CardContainer tagData={activeTagData?.value} wishlistData={wishlistData} />
        </div>
      );
    } else if (errorMessage) {
      <div className="p-3 d-flex justify-content-center align-items-center" style={{ fontSize: '40px' }}>
        <Image src={ErrorImage} width={250} height={250} alt="Error Image" />
      </div>;
    } else {
    }
  };
  return <>{handleDataRendering()}</>;
}

export default FeaturedCollection2Master;
