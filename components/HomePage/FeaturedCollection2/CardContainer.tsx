import Carousel from 'react-multi-carousel';
import FeaturedCard from './FeaturedCard';

function CardContainer({ tagData, wishlistData }: any) {
  const responsive: any = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1300 },
      items: 5,
    },
    laptop: {
      breakpoint: { max: 1300, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 768, min: 464 },
      items: 2,
    },
    mobileSmall: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <>
      <div className="slider-container">
        <Carousel responsive={responsive}>
          {tagData?.length > 0 &&
            tagData?.map((cardData: any, cardIndex: number) => <FeaturedCard cardData={cardData} wishlistData={wishlistData} />)}
        </Carousel>
      </div>
    </>
  );
}

export default CardContainer;
