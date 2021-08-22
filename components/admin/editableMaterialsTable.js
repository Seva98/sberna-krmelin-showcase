import { useState, useEffect } from 'react';
import NewCategory from './newCategory';

import EditableMaterialsTableHeader from './editableMaterialsTableHeader';
import axios from 'axios';
import Loader from '../common/loader';

const EditableMaterialsTable = ({ categories, materials, editMode }) => {
  const [loading, setLoading] = useState(false);
  const [categoriesCopy, setCategoriesCopy] = useState(categories.sort((a, b) => a.order - b.order));
  const [newMaterial, setNewMaterial] = useState(0);

  const handleChange = (e) => {
    const { value, name } = e.target;
    console.log(value, name);
    // const newMaterials = [...materials];
    // const idx = materials.findIndex((m) => `${m.id}` === name);
    // newMaterials[idx].price = value;
    // setMaterials(newMaterials);
  };

  const getChange = (material) => {
    return Number(material.price / 100).toFixed(2);
  };

  const handleCategoryAdded = (data) => {
    setCategoriesCopy([...categoriesCopy, data]);
  };

  const handleNewOrder = async (oldOrder, direction, full) => {
    if (loading) return;
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
    setLoading(true);
    try {
      const newCategories = [...categoriesCopy];
      if (full) {
        const filteredArr = newCategories.filter((c) => c.order !== oldOrder);
        const itemToMove = newCategories.find((c) => c.order === oldOrder);
        if (direction === 'up') {
          const orderedArr = [{ ...itemToMove }, ...filteredArr].map((item, i) => ({ ...item, order: i }));
          await axios.put('/api/categories', { data: orderedArr, type: 'ORDER' });
          setCategoriesCopy(orderedArr);
        } else {
          const orderedArr = [...filteredArr, { ...itemToMove }].map((item, i) => ({ ...item, order: i }));
          await axios.put('/api/categories', { data: orderedArr, type: 'ORDER' });
          setCategoriesCopy(orderedArr);
        }
      } else {
        const temp = newCategories[oldOrder];
        newCategories[oldOrder].order = newOrder;
        newCategories[oldOrder] = newCategories[newOrder];
        newCategories[newOrder].order = oldOrder;
        newCategories[newOrder] = temp;
        await axios.put('/api/categories', { data: [newCategories[oldOrder], newCategories[newOrder]], type: 'ORDER' });
        setCategoriesCopy(newCategories);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleHeaderTextChange = async (e) => {
    const { value, name } = e.target;
    const newCategories = [...categoriesCopy].map((c) => {
      if (c._id === name) c.name = value;
      return c;
    });
    setCategoriesCopy(newCategories);
  };

  const handleHeaderTextChanged = async (e) => {
    const { value, name } = e.target;
    setLoading(true);
    try {
      await axios.put('/api/categories', { data: [{ _id: name, name: value }], type: 'NAME' });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleCategoryDelete = async (catName, catId) => {
    if (loading) return;
    setLoading(true);
    if (confirm(`Hrebo? Opravdu chceš smazat kategorii ${catName}?`)) {
      try {
        console.log(catName, catId);
        await axios.delete(`/api/categories`, { data: { _id: catId } });
        const filteredArr = [...categoriesCopy].filter((c) => c._id !== catId);
        const orderedArr = filteredArr.map((item, i) => ({ ...item, order: i }));
        await axios.put('/api/categories', { data: orderedArr, type: 'ORDER' });
        setCategoriesCopy(orderedArr);
      } catch (error) {
        console.log(error);
      }
    }
    setLoading(false);
  };

  return (
    <>
      <Loader loading={loading} />
      <div className="btn btn-primary float-end">Uložit nové ceny</div>
      {categoriesCopy &&
        categoriesCopy.map(({ order: catOrder, name: catName, _id: catId }) => (
          <div key={'cat' + catOrder} className="my-2">
            <EditableMaterialsTableHeader
              id={catId}
              name={catName}
              editMode={editMode}
              loading={loading}
              onDoubleDown={() => handleNewOrder(catOrder, 'down', true)}
              onDown={() => handleNewOrder(catOrder, 'down')}
              onUp={() => handleNewOrder(catOrder, 'up')}
              onDoubleUp={() => handleNewOrder(catOrder, 'up', true)}
              onTextChange={handleHeaderTextChange}
              onTextChanged={handleHeaderTextChanged}
              onDelete={() => handleCategoryDelete(catName, catId)}
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
