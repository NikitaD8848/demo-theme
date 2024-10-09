import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { FaCartPlus, FaCircleCheck, FaHeart, FaRegHeart } from 'react-icons/fa6';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { RxCross2 } from 'react-icons/rx';
import useAddToWishlist from '../hooks/WishlistHooks/useAddToWishlistHook';
import noImage from '../public/assets/images/no_image.png';
import ProductCardStyles from '../styles/components/productCard.module.scss';
import { FaCheckCircle } from 'react-icons/fa';

const ProductCard = ({
  data,
  wishlistData,
  cartData,
  addToCartItem,
  getPartyName,
  isSuperAdmin,
  handleDeleteCatalogItem,
  handleShowCatalogModal,
}: any) => {
  const router = useRouter();
  const { handleAddToWishList, handleRemoveFromWishList } = useAddToWishlist();
  const [addToCartLoaderBtn, setAddToCartLoaderBtn] = useState<boolean>(false);
  const imageLoader = ({ src, width, quality }: any) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };
  let wishProducts: any;
  const handleRenderIcon = () => {
    {
      wishlistData?.length > 0 &&
        wishlistData?.map((item: any) => {
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
  let cartProducts: any;
  const handleRenderCartBtnText = () => {
    {
      cartData?.length > 0 &&
        cartData?.map((item: any) => {
          if (item === data?.name) {
            cartProducts = item;
          }
        });
    }
    if (!cartProducts) {
      return (
        <Button
          type="button"
          className={`btn ml-3 fs-6 ${ProductCardStyles.carListingBtn}`}
          onClick={handleAddToProductData}
          disabled={addToCartLoaderBtn}
        >
          {!addToCartLoaderBtn ? (
            <>
              <span>ADD</span>
              <FaCartPlus className={`${ProductCardStyles.cardBtn}`} />
            </>
          ) : (
            <span className="spinner-border spinner-border-sm " role="status" aria-hidden="true"></span>
          )}
        </Button>
      );
    } else {
      return (
        <Button type="button" className={`btn ml-3 fs-6 ${ProductCardStyles.carListingBtn_added}`}>
          {!addToCartLoaderBtn ? (
            <>
              <span>ADDED</span>
              <FaCheckCircle className={`mb-1 ${ProductCardStyles.cardBtn}`} />
            </>
          ) : (
            <span className="spinner-border spinner-border-sm " role="status" aria-hidden="true"></span>
          )}
        </Button>
      );
    }
  };
  const handleAddToProductData = async () => {
    setAddToCartLoaderBtn(true);
    const addToCartParams = {
      currency: 'INR',
      item_list: [{ item_code: data.name, quantity: 1 }],
      party_name: getPartyName,
    };

    try {
      await addToCartItem(addToCartParams, null);
    } catch (error) {
      console.error('Error adding to cart', error);
    } finally {
      setAddToCartLoaderBtn(false);
    }
  };

  const handleRenderAddToCatalogBtn: any = () => {
    if (isSuperAdmin === 'true') {
      return (
        <div className="d-flex justify-content-center">
          {router?.asPath?.startsWith('/catalog') ? (
            <button
              className={`rounded me-2 fs-6 ${ProductCardStyles.carListingBtn}`}
              onClick={() => handleDeleteCatalogItem(router?.query?.category, data?.name)}
            >
              <RiDeleteBin2Fill />
            </button>
          ) : (
            <Button className={`rounded me-2 fs-6 ${ProductCardStyles.carListingBtn}`} onClick={() => handleShowCatalogModal(data?.name)}>
              Add to catalog
            </Button>
          )}
        </div>
      );
    }
  };

  return (
    <Card className={` ${ProductCardStyles.product_card} pt-2`}>
      <div className={` ${ProductCardStyles.product_card_img} `}>
        {handleRenderIcon()}
        <Link href={`${data?.url}`} className="text-decoration-none text-dark">
          <Image
            loader={data.image ? imageLoader : undefined}
            src={data.image ? data.image : noImage}
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
          <Link href={`${data?.url}`} className={`text-dark text-decoration-none ${ProductCardStyles.product_name}`}>
            <Card.Title className={`my-0 ${ProductCardStyles.product_name} mb-0`}>{data?.item_name}</Card.Title>
          </Link>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <Card.Text className={`my-0 py-0 fw-bold ${ProductCardStyles.product_card_text} `}>
                {data?.currency_symbol}
                {data.price}{' '}
                <span className={`text-decoration-line-through ${ProductCardStyles.mrpPrice}`}>
                  {data?.currency_symbol}
                  {data.mrp_price}
                </span>
              </Card.Text>
            </div>
            <div>{handleRenderCartBtnText()}</div>
          </div>
          <div>{isSuperAdmin === 'true' && handleRenderAddToCatalogBtn()}</div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
