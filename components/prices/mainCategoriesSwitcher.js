const MainCategoriesSwitcher = ({ mainCategories, activeMainCategory, onChange }) => {
  return (
    <div className="row gx-0">
      <div className="col" style={{ borderBottom: '1px solid #526b84' }}></div>
      {mainCategories.map((c) => (
        <div className="col-auto" key={c._id}>
          <button onClick={() => onChange(c._id)} className={`btn btn-${c._id === activeMainCategory ? 'active-table' : 'inactive-table'}`}>
            {c.name}
          </button>
        </div>
      ))}
      <div className="col" style={{ borderBottom: '1px solid #526b84' }}></div>
    </div>
  );
};

export default MainCategoriesSwitcher;
