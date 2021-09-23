const CategoriesSwitcher = ({ mainCategories, activeMainCategory, onChange }) => {
  return (
    <div className="row gx-0">
      <div className="col" style={{ borderBottom: '1px solid #526b84' }}></div>
      {mainCategories.map((c) => (
        <div className="col-auto" key={c}>
          <button onClick={() => onChange(c)} className={`btn btn-${c === activeMainCategory ? 'active-table' : 'inactive-table'}`}>
            {c}
          </button>
        </div>
      ))}
      <div className="col" style={{ borderBottom: '1px solid #526b84' }}></div>
    </div>
  );
};

export default CategoriesSwitcher;
