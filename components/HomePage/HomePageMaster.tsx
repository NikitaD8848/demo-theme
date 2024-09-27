import HomeBanner from './BannerSection/HomeBanner';
import TopCategories from './PersonalizedCategories/TopCategories';
import BrandListing from './BrandSection/BrandListingMaster';
import CollectionsMaster from './FeaturedCollections/CollectionMaster';
import style from '../../styles/components/home.module.scss';
import FeaturedCollection2Master from './FeaturedCollection2/FeaturedCollection2Master';

const HomePageMaster = () => {
  return (
    <>
      <HomeBanner />
      <div className={`row ps-lg-5 pe-lg-5 ${style.backgoundColor}`}>
        <TopCategories />
        <BrandListing />
        <CollectionsMaster />
        <FeaturedCollection2Master />
      </div>
    </>
  );
};

export default HomePageMaster;
