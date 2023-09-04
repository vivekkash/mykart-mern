import DeliveryAddress from './DeliveryAddress';
import OrderSummary from './OrderSummary';
import PaymentOptions from './PaymentOptions';
import PriceDetails from './PriceDetails';
import Login from './Login';

const Section = () => {
  return (
    <div className="relative mt-20">
      <div className="flex flex-wrap justify-center gap-2">
        <div className="h-auto w-full md:w-[60%]">
          <Login />
          <DeliveryAddress />
          <OrderSummary />
          <PaymentOptions />
        </div>
        <div className="h-auto w-full md:w-[28%]">
          <PriceDetails />
        </div>
      </div>
    </div>
  );
};

export default Section;
