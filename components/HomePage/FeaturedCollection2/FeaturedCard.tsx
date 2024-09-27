import Image from 'next/image';
import { FaCartShopping, FaHeart, FaRegHeart } from 'react-icons/fa6';
import NoImage from '../../../public/assets/images/no_image.png';
import styles from '../../../styles/components/featuredCard.module.scss';
import { CONSTANTS } from '../../../services/config/app-config';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useAddToWishlist from '../../../hooks/WishlistHooks/useAddToWishlistHook';
import useAddToCartHook from '../../../hooks/CartPageHook/useAddToCart';

function FeaturedCard({ cardData, wishlistData }: any) {
  const router = useRouter();
  const { handleAddToWishList, handleRemoveFromWishList } = useAddToWishlist();
  const { addToCartItem, getPartyName } = useAddToCartHook();
  const imageLoader = ({ src, width, quality }: any) => {
    return `${CONSTANTS.API_BASE_URL}${src}?w=${width}&q=${quality || 75}`;
  };
  const handleAddToProductData = async () => {
    const addToCartParams = {
      currency: 'INR',
      item_list: [{ item_code: cardData?.name, quantity: cardData?.min_order_qty !== 0 ? cardData?.min_order_qty : 1 }],
      party_name: getPartyName,
    };

    try {
      await addToCartItem(addToCartParams, null);
    } catch (error) {
      console.error('Error adding to cart', error);
    }
  };
  let wishProducts: any;
  const handleRenderHeartIcon = () => {
    {
      wishlistData?.length > 0 &&
        wishlistData?.map((item: any) => {
          if (item.name === cardData?.name) {
            wishProducts = item?.name;
          }
        });
    }
    if (!wishProducts) {
      return (
        <div className={`${styles.icon} ${styles.heart_icon}  d-flex align-items-center justify-content-center`}>
          <FaRegHeart className=" text-center" onClick={() => handleAddToWishList(cardData)} />
        </div>
      );
    } else {
      if (router?.asPath?.startsWith('/wishlist')) {
        return (
          <div className={`${styles.icon} ${styles.heart_icon}  d-flex align-items-center justify-content-center`}>
            <FaRegHeart className=" text-center" onClick={() => handleRemoveFromWishList(cardData?.name)} />
          </div>
        );
      } else {
        return (
          <div className={`${styles.icon} ${styles.heart_icon}  d-flex align-items-center justify-content-center`}>
            <FaHeart className=" text-center" onClick={() => handleRemoveFromWishList(cardData?.name)} />
          </div>
        );
      }
    }
  };
  return (
    <div className={`${styles.card} mx-2`}>
      <div className="card cursor-pointer">
        <div className="position-relative">
          <div className={`${styles.img_container} text-center`}>
            <Link href={cardData?.url ? cardData?.url : ''} className="text-decoration-none text-dark">
              {cardData?.image ? (
                <Image
                  src={cardData?.image}
                  loader={imageLoader}
                  alt="product-img"
                  width={1200}
                  height={900}
                  style={{ width: '100%', height: '100%' }}
                  priority={true}
                  className={`${styles.product_img} `}
                />
              ) : (
                <Image
                  src={NoImage}
                  alt="product-img"
                  width={1200}
                  height={900}
                  style={{ width: '100%', height: '100%' }}
                  priority={true}
                  className={`${styles.product_img}`}
                />
              )}
            </Link>
          </div>
          {handleRenderHeartIcon()}
          <div className={`${styles.icon} ${styles.cart_icon}  d-flex align-items-center justify-content-center`}>
            <FaCartShopping className="text-center" onClick={handleAddToProductData} />
          </div>
        </div>
        <div className="card-body rounded-0">
          <h6 className={styles.product_details}>
            <b className="w-100">{cardData?.item_name}</b>
          </h6>
          <div className="d-flex justify-content-between">
            <p className={`${styles?.product_name} m-0`}>{cardData?.category}</p>
            <p className={`${styles?.product_name} m-0`}>
              {cardData?.currency_symbol} {cardData?.price}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeaturedCard;
