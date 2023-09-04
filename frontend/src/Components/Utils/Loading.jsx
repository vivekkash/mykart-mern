import { Spinner } from 'flowbite-react';

const Loading = () => {
  return (
    <div className="h-40 flex justify-center items-center">
      <Spinner aria-label="Loading ..." size="lg" />
    </div>
  );
};

const ButtonLoading = ({ size }) => (
  <div className="px-2">
    <Spinner aria-label="Loading ..." size={size} />
  </div>
);

export default Loading;
export { ButtonLoading };
