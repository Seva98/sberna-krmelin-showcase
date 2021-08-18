import { useState } from 'react';

const EditableMaterialsTable = ({ data }) => {
  const [categories, setCategories] = useState(data.categories);
  const [materials, setMaterials] = useState(data.materials);
  const [newMaterial, setNewMaterial] = useState(0);
  const [newCategory, setNewCategory] = useState(0);

  const handleChange = (e) => {
    const { value, name } = e.target;
    const newMaterials = [...materials];
    const idx = materials.findIndex((m) => `${m.id}` === name);
    newMaterials[idx].price = value;
    setMaterials(newMaterials);
  };

  const getChange = (material) => {
    return Number(material.price / 100).toFixed(2);
  };

  return (
    <>
      <div className="btn btn-primary float-end">Uložit nové ceny</div>
      {categories.map((category) => (
        <div key={'cat' + category.id} className="my-2">
          <h2>{category.name}</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Název</th>
                <th>Popis</th>
                <th>Cena</th>
                <th>Rozdíl</th>
                <th>Nová cena</th>
              </tr>
            </thead>
            <tbody>
              {materials
                .filter((m) => m.category === category.id)
                .map((m) => (
                  <tr key={m.id}>
                    <td>{m.name}</td>
                    <td>{m.name + ' popis'}</td>
                    <td>{m.price + ' Kč'}</td>
                    <td className={getChange(m) > 0 ? 'text-success' : 'text-danger'}>{getChange(m)} %</td>
                    <td>
                      <input value={m.price} className="w-100 form-control" name={m.id} onChange={handleChange} />
                    </td>
                  </tr>
                ))}
              {newMaterial === category.id ? (
                <tr>
                  <td>
                    <input value={''} className="w-100 form-control" onChange={handleChange} />
                  </td>
                  <td>
                    <input value={''} className="w-100 form-control" onChange={handleChange} />
                  </td>
                  <td>
                    <input value={''} className="w-100 form-control" onChange={handleChange} />
                  </td>
                  <td colSpan={2}>
                    <div className="btn btn-primary w-100" onClick={() => setNewMaterial(0)}>
                      Uložit materiál
                    </div>
                  </td>
                </tr>
              ) : (
                <tr>
                  <td colSpan="5">
                    <div className="btn btn-primary w-100" onClick={() => setNewMaterial(category.id)}>
                      Přidat materiál
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ))}
      {newCategory ? (
        <div className="row">
          <div className="col">
            <input placeholder="Materiál" value={''} className="w-100 form-control" onChange={handleChange} />
          </div>
          <div className="col">
            <div className="btn btn-primary w-100" onClick={() => setNewCategory(0)}>
              Uložit kategorii
            </div>
          </div>
        </div>
      ) : (
        <div className="btn btn-primary w-100" onClick={() => setNewCategory(1)}>
          Přidat kategorii
        </div>
      )}
    </>
  );
};

export default EditableMaterialsTable;
