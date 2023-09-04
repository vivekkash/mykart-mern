const PolicyBanner = () => {
  const data = [
    {
      title: 'Free Shipping & Return',
      image: '',
      description: 'Free shipping & return on order above ₹1500',
    },
    {
      title: 'Customer Support 24/7',
      image: '',
      description: 'Instant access to perfect support',
    },
    {
      title: '100% secure Payment',
      image: '',
      description: 'We ensure secure payment',
    },
  ];

  return (
    <div className="hidden flex flex-wrap relative mt-10">
      {data &&
        data.map(({ title, description }, i) => {
          return (
            <div
              key={i}
              className="flex-1 flex justify-evenly p-2 border-[1px] border-black-500"
            >
              <div className="">IMG</div>
              <div className="flex flex-col px-2">
                <h2 className="text-[12px] font-bold">{title}</h2>
                <p className="text-[10px] text-gray-400">{description}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default PolicyBanner;
