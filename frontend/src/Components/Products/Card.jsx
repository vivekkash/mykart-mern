import { Link } from 'react-router-dom';

const Card = ({ product }) => {
  return (
    <Link to={`product/${product.slug}`}>
      <div className="w-36 md:w-56 mb-1 bg-white">
        <img
          alt={product.title}
          src={product.thumbnail}
          className="h-40 w-60 p-2"
        />
        <h5 className="text-sm md:text-md h-6 tracking-tight text-gray-900 dark:text-white text-center text-ellipsis overflow-hidden">
          <p>{product.title}</p>
        </h5>
        <div className="flex flex-col items-center justify-between">
          <span className="text-[10px] bg-green-500 text-white p-1 mt-1 rounded-md ">
            {product.rating} ☆
          </span>
          <h4 className="text-lg font-semibold dark:text-white mt-2">
            ₹{product.price}
          </h4>
          <h5 className="">
            <span className="line-through text-gray-400 text-[14px] px-2 font-light">
              ₹{Math.round(product.price + (product.price * 12) / 100)}
            </span>
            <span className="text-green-500 text-sm font-normal">
              {product.discountPercentage}% off
            </span>
          </h5>
          {/* <button className="my-2 rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800">
            Add to cart
          </button> */}
        </div>
      </div>
    </Link>
  );
};

export default Card;
