import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useFetch from '../Custom/useFetch';
import Loading from '../Utils/Loading';
import Error from '../Utils/Error';
import { Carousel } from 'flowbite-react';
import { Store } from '../../Store';
import { Accordion } from 'flowbite-react';

const Section = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { slug } = params;

  const { result, error, loading } = useFetch(`/api/v1/product/detail/${slug}`);

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const product = result.data;

  const addToCartHandler = () => {
    // find whether item exists, if yes then increment the quantity
    const existItem = cart.cartItems.find(
      (item) => item.product_internal_id === product.product_internal_id
    );

    const quantity = existItem ? existItem.quantity + 1 : 1;

    //check whether added quantity doesnt exceeds available stocks
    if (product.stock < quantity) {
      console.log('outofstock');
      return;
    }
    //send the payload with updated quantities
    dispatch({
      type: 'CART_ADD_PRODUCT',
      payload: { ...product, quantity },
    });

    navigate('/cart');
  };

  return (
    <div className="relative mt-20">
      {loading ? (
        <Loading />
      ) : error ? (
        <Error message="Oops! failed loading, try reloading..." />
      ) : (
        <div className="flex gap-4 mx-4">
          <div className="h-[500px] flex-1 border-[1px]">
            <Carousel slide={false}>
              {product.images.map((url, i) => {
                return <img key={i} alt="..." src={url} />;
              })}
            </Carousel>
            <div className="flex">
              <button
                onClick={addToCartHandler}
                className="h-14 flex-1 text-white font-semibold bg-orange-500 hover:bg-orange-600"
              >
                Add to cart
              </button>
              <button className="h-14 flex-1 text-white bg-yellow-300 font-semibold hover:bg-yellow-400">
                Wishlist
              </button>
            </div>
          </div>
          <div className="flex-1 bg-white p-4">
            <h2 className="text-md text-gray-400 mb-2">{product.brand}</h2>
            <h1 className="text-xl mb-2">{product.title}</h1>
            <span className="text-[12px] font-semibold bg-green-500 text-white p-1 mt-1 rounded-md">
              {product.rating} ☆
            </span>

            <p className="text-[14px] text-green-600 mt-2">special price</p>
            <h4 className="text-2xl font-semibold dark:text-white mb-2">
              ₹{product.price}
              <span className="line-through text-gray-400 text-[16px] px-2 font-light">
                ₹
                {Math.round(
                  product.price +
                    (product.price * product.discountPercentage) / 100
                )}
              </span>
              <span className="text-green-500 text-sm font-normal">
                {product.discountPercentage}% off
              </span>
            </h4>
            <div className="mt-4">
              <Accordion>
                <Accordion.Panel>
                  <Accordion.Title className="bg-white hover:bg-white">
                    Product Details
                  </Accordion.Title>
                  <Accordion.Content>
                    <div className="flex flex-wrap mb-2 p-2 ">
                      <div className="flex-1">
                        <h4 className="text-sm mb-2">Brand</h4>
                        <p className="text-sm font-thin">{product.brand}</p>
                      </div>
                      <div className="flex-1"></div>
                    </div>
                    <div className="p-2">
                      <h4 className="text-sm mb-2">Description</h4>
                      <p className="text-sm font-thin">{product.description}</p>
                    </div>
                  </Accordion.Content>
                </Accordion.Panel>
              </Accordion>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Section;
