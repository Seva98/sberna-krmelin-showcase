const Loader = ({ loading }) => {
  return (
    loading && (
      <div className="position-fixed bottom-0 end-0 m-2">
        <div className="spinner-border text-primary" role="status" />
      </div>
    )
  );
};

export default Loader;
