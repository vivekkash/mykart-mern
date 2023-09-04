import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useFetch from '../Custom/useFetch';
import Loading from '../Utils/Loading';
import Error from '../Utils/Error';
import { Carousel } from 'flowbite-react';
import { Store } from '../../Store';

const Section = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { slug } = params;

  const { result, error, loading } = useFetch(
    `http://localhost:3000/api/v1/product/${slug}`
  );

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
                Buy Now
              </button>
            </div>
          </div>
          <div className="flex-1">
            <h1 className="text-xl text-center">{product.title}</h1>
            <span className="text-[10px] bg-green-500 text-white p-1 mt-1 rounded-md ">
              {product.rating} ☆
            </span>
            <h4 className="text-lg font-semibold dark:text-white mt-2">
              ₹{product.price}
            </h4>
            <h5 className="">
              <span className="line-through text-gray-400 text-[14px] px-2 font-light">
                ₹{product.price + (product.price * 12) / 100}
              </span>
              <span className="text-green-500 text-sm font-normal">
                {product.discountPercentage}% off
              </span>
            </h5>
            <p>{product.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Section;
