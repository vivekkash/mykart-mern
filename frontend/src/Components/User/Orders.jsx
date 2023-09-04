import { Table } from 'flowbite-react';
import useFetch from '../Custom/useFetch';
import Loading from '../Utils/Loading';
import Error from '../Utils/Error';
import { useContext } from 'react';
import { Store } from '../../Store';

const Orders = () => {
  const {
    state: { user },
  } = useContext(Store);

  const { result, error, loading } = useFetch(
    'http://localhost:3000/api/v1/order/all/user',
    {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }
  );

  const data = result?.data || [];

  return (
    <div className="relative mt-20">
      <div className="flex justify-center">
        {loading ? (
          <Loading />
        ) : error ? (
          <Error message="Oops! failed loading, try reloading..." />
        ) : (
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Order ID</Table.HeadCell>
              <Table.HeadCell>Product</Table.HeadCell>
              <Table.HeadCell>Qty</Table.HeadCell>
              <Table.HeadCell>Price</Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">View</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {result && data.length === 0 ? (
                <Table.row>
                  <Table.Cell>No Orders found</Table.Cell>
                </Table.row>
              ) : (
                result &&
                data.map((order, i) => {
                  return (
                    <Table.Row
                      key={i}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {order._id}
                      </Table.Cell>
                      <Table.Cell>
                        {order.orderedProducts.map((product, i) => {
                          return (
                            <div key={i} className="text-[12px] text-black">
                              {i + 1}. {product.title}
                            </div>
                          );
                        })}
                      </Table.Cell>
                      <Table.Cell>{order.totalProducts}</Table.Cell>
                      <Table.Cell>₹{order.totalAmount}</Table.Cell>
                      <Table.Cell>
                        <p>View</p>
                      </Table.Cell>
                    </Table.Row>
                  );
                })
              )}
            </Table.Body>
          </Table>
        )}
      </div>
    </div>
  );
};

export default Orders;
