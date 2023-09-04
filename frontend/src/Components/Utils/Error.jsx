const Error = ({ message }) => {
  return (
    <div className="h-40 flex justify-center items-center md:text-xl font-medium text-slate-400 ">
      {message}
    </div>
  );
};

export default Error;
