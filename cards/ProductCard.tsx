import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Card } from 'react-bootstrap';
import { FaHeart, FaRegHeart } from 'react-icons/fa6';
import { IoCart } from 'react-icons/io5';
import noImage from '../public/assets/images/no_image.png';
import { RxCross2 } from 'react-icons/rx';
import ProductCardStyles from '../styles/components/productCard.module.scss';
import useAddToWishlist from '../hooks/WishlistHooks/useAddToWishlistHook';
import { useRouter } from 'next/router';
import { CONSTANTS } from '../services/config/app-config';

const ProductCard = ({ data, handleShow, wishlistData, btnAction, cartData }: any) => {
  const router = useRouter();
  const { handleAddToWishList, handleRemoveFromWishList } = useAddToWishlist();
  const imageLoader = ({ src, width, quality }: any) => {
    return `${CONSTANTS.API_BASE_URL}${src}?w=${width}&q=${quality || 75}`;
  };
  let wishProducts: any;
  const handleRenderIcon = () => {
    {
      wishlistData?.length > 0 &&
        wishlistData?.map((item: any, index: number) => {
          if (item.name === data?.name) {
            wishProducts = item?.name;
          }
        });
    }
    if (!wishProducts) {
      return (
        <span className={`${ProductCardStyles.wishlist_icon} text-danger `}>
          <FaRegHeart onClick={() => handleAddToWishList(data)} />
        </span>
      );
    } else {
      if (router?.asPath?.startsWith('/wishlist')) {
        return (
          <span className={`${ProductCardStyles.wishlist_icon} text-secondary `}>
            <RxCross2 onClick={() => handleRemoveFromWishList(data?.name)} />
          </span>
        );
      } else {
        return (
          <span className={`${ProductCardStyles.wishlist_icon} text-danger `}>
            <FaHeart onClick={() => handleRemoveFromWishList(data?.name)} />
          </span>
        );
      }
    }
  };

  const handleRenderAddToCartBtn: any = () => {
    <button type="button" className={` btn btn-primary ml-3 cart_btn_gtag listing-cartbtn`}>
      <i className="fa fa-shopping-cart d-flex justify-content-center" aria-hidden="true"></i>
    </button>;
  };
  return (
    <Card className={` ${ProductCardStyles.product_card} pt-2`}>
      <div className={` ${ProductCardStyles.product_card_img} `}>
        {handleRenderIcon()}
        <Link href={`${data?.url}`} target="_blank" className="text-decoration-none text-dark">
          <Image
            loader={data.image !== null ? imageLoader : undefined}
            src={data.image !== null ? data.image : noImage}
            width={1200}
            height={900}
            alt="Item Image"
            className={`${ProductCardStyles.product_code_img}`}
            style={{ width: '100%', height: '100%' }}
            priority={true}
          />
        </Link>
      </div>
      <Card.Body className={`${ProductCardStyles.content_wrap}`}>
        <div className={`${ProductCardStyles.product_content_wrap}`}>
          <Link href={`${data?.url}`} target="_blank" className={`text-dark text-decoration-none ${ProductCardStyles.product_name}`}>
            <Card.Title className={`my-0 ${ProductCardStyles.product_name} mb-0`}> {data?.item_name}</Card.Title>
          </Link>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              {data?.bom_factory_code ? (
                <Card.Text className={`my-0 ${ProductCardStyles.product_card_text}`}>{data?.bom_factory_code}</Card.Text>
              ) : null}

              <Card.Text className={`my-0 py-0 fw-bold ${ProductCardStyles.product_card_text} `}>Price: {data.price}</Card.Text>
              <Card.Text className={`my-0 py-0 fw-bold ${ProductCardStyles.product_card_text} `}>Brand: {data.brand}</Card.Text>
            </div>
            <div>{handleRenderAddToCartBtn()}</div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
