import { useNavigate, useParams } from 'react-router';
import { Button, Card, Alert } from 'flowbite-react';
import { FaCircleInfo } from 'react-icons/fa6';

const Section = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const redirectTohome = () => {
    navigate('/');
  };

  setTimeout(redirectTohome, 10000);

  return (
    <div className="relative mt-20">
      <div className="flex flex-col justify-center items-center gap-10">
        <Alert color="success">
          <span>
            <p className="px-2 text-md">
              <span className="inline-block">
                <FaCircleInfo />
              </span>{' '}
              This page will be automatically redirected to the home page!!!
            </p>
          </span>
        </Alert>
        <Card className="max-w-sm">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            <p>Thank you</p>
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            <p>Your Order no. {id} is successfully placed.</p>
          </p>
          <Button
            className="bg-orange-400 hover:bg-orange-500"
            onClick={redirectTohome}
          >
            continue shopping
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Section;
