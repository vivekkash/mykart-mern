import { Card, Avatar } from 'flowbite-react';
import React from 'react';

const Categories = () => {
  return (
    <div className="relative py-4 mt-4">
      <h2 className="text-sm">Featured Category</h2>
      <div className="flex gap-4 justify-evenly flex-wrap p-4">
        <Card className="max-w-sm">
          <Avatar
            img="https://images.unsplash.com/photo-1467043237213-65f2da53396f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=60"
            size="xl"
          />
          <h5 className="text-xl font-medium tracking-tight text-gray-900 dark:text-white text-center">
            <p>Fashion</p>
          </h5>
        </Card>
        <Card className="max-w-sm">
          <Avatar
            img="https://images.unsplash.com/photo-1542393545-10f5cde2c810?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNvbXB1dGVyfGVufDB8MXwwfHx8MA%3D%3D&auto=format&fit=crop&w=200&q=60"
            size="xl"
          />
          <h5 className="text-xl font-medium tracking-tight text-gray-900 dark:text-white text-center">
            <p>Electronics</p>
          </h5>
        </Card>
        <Card className="max-w-sm">
          <Avatar
            img="https://images.unsplash.com/photo-1589492477829-5e65395b66cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGVsZWN0cm9uaWNzfGVufDB8MXwwfHx8MA%3D%3D&auto=format&fit=crop&w=200&q=60"
            size="xl"
          />
          <h5 className="text-xl font-medium tracking-tight text-gray-900 dark:text-white text-center">
            <p>Mobiles</p>
          </h5>
        </Card>
        <Card className="max-w-sm">
          <Avatar
            img="https://plus.unsplash.com/premium_photo-1678074057896-eee996d4a23e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
            size="xl"
          />
          <h5 className="text-xl font-medium tracking-tight text-gray-900 dark:text-white text-center">
            <p>Home Decor</p>
          </h5>
        </Card>
        <Card className="max-w-sm">
          <Avatar
            img="https://plus.unsplash.com/premium_photo-1678074057896-eee996d4a23e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
            size="xl"
          />
          <h5 className="text-xl font-medium tracking-tight text-gray-900 dark:text-white text-center">
            <p>Home Decor</p>
          </h5>
        </Card>
      </div>
    </div>
  );
};

export default Categories;
