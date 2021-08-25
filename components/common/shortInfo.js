const ShortInfo = ({ icon, title, children }) => {
  return (
    <div className="item col-12 col-lg-4">
      <div className="text-center p-1 p-lg-5">
        {icon}
        <div className="h4">{title}</div>
        {children}
      </div>
    </div>
  );
};

export default ShortInfo;
