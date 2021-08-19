import { useState } from 'react';
import NewCategory from './newCategory';

import EditableMaterialsTableHeader from './editableMaterialsTableHeader';
import axios from 'axios';

const EditableMaterialsTable = ({ categories, materials, editMode }) => {
  const [categoriesCopy, setCategoriesCopy] = useState(categories);
  const [newMaterial, setNewMaterial] = useState(0);

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

  const handleCategoryAdded = (data) => {
    console.log(data);
    setCategoriesCopy([...categoriesCopy, data]);
  };

  const handleNewOrder = async (oldOrder, direction, full) => {
    let newOrder = 0;
    if (direction === 'up') {
      const minOrder = 0;
      if (full) {
        newOrder = minOrder;
      } else {
        newOrder = oldOrder - 1 >= minOrder ? oldOrder - 1 : minOrder;
      }
    } else {
      const maxOrder = categories.length - 1;
      if (full) {
        newOrder = maxOrder;
      } else {
        newOrder = oldOrder + 1 <= maxOrder ? oldOrder + 1 : maxOrder;
      }
    }
    const newCategories = [...categoriesCopy];
    const temp = newCategories[oldOrder];
    newCategories[oldOrder].order = newOrder;
    newCategories[oldOrder] = newCategories[newOrder];
    newCategories[newOrder].order = oldOrder;
    newCategories[newOrder] = temp;

    setCategoriesCopy(newCategories);
    await axios.all([
      await axios.put('/api/categories', { name: newCategories[oldOrder].name, order: newCategories[oldOrder].order }),
      await axios.put('/api/categories', { name: newCategories[newOrder].name, order: newCategories[newOrder].order }),
    ]);
  };

  return (
    <>
      <div className="btn btn-primary float-end">Uložit nové ceny</div>
      {categoriesCopy &&
        categoriesCopy.map(({ order: catOrder, name: catName, id: catId }) => (
          <div key={'cat' + catOrder} className="my-2">
            <EditableMaterialsTableHeader
              name={catName}
              editMode={editMode}
              onDoubleDown={() => handleNewOrder(catOrder, 'down', true)}
              onDown={() => handleNewOrder(catOrder, 'down')}
              onUp={() => handleNewOrder(catOrder, 'up')}
              onDoubleUp={() => handleNewOrder(catOrder, 'up', true)}
            />
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
                {materials &&
                  materials
                    .filter((m) => m.category === catId)
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
                {newMaterial === catId ? (
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
                      <div className="btn btn-primary w-100" onClick={() => setNewMaterial(catId)}>
                        Přidat materiál
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ))}
      <NewCategory categories={categoriesCopy} onCategoryAdded={handleCategoryAdded} />
    </>
  );
};

export default EditableMaterialsTable;
