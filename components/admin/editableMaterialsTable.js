import { useState, useEffect } from 'react';
import NewCategory from './newCategory';

import EditableCategoryTableHeader from './editableCategoryTableHeader';
import axios from 'axios';
import Loader from '../common/loader';
import NewMaterial from './newMaterial';
import NewMaterialButton from './newMaterialButton';
import MaterialsTableHeader from './materialsTableHeader';
import ReadableMaterialTableRow from './readableMaterialTableRow';
import EditableMaterialTableRow from './editableMaterialTableRow';

const EditableMaterialsTable = ({ categories, materials, editMode }) => {
  const [loading, setLoading] = useState(false);

  // CATEGORY
  const [categoriesCopy, setCategoriesCopy] = useState(categories.sort((a, b) => a.order - b.order));

  const handleCategoryAdded = (data) => {
    setCategoriesCopy([...categoriesCopy, data]);
  };

  const handleNewCategoryOrder = async (oldOrder, direction, full) => {
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
      const maxOrder = categoriesCopy.length - 1;
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

  const handleCategoryTextChanged = async (e) => {
    const { value, name } = e.target;
    setLoading(true);
    try {
      await axios.put('/api/categories', { data: [{ _id: name, name: value }], type: 'NAME' });
      const newCategories = [...categoriesCopy].map((c) => {
        if (c._id === name) c.name = value;
        return c;
      });
      setCategoriesCopy(newCategories);
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

  // MATERIAL

  const [materialsCopy, setMaterialsCopy] = useState(materials.sort((a, b) => a.order - b.order));
  const [newMaterialCatId, setNewMaterialCatId] = useState(0);

  const handleNewMaterial = async (data) => {
    setMaterialsCopy([...materialsCopy, data]);
    setNewMaterialCatId(0);
  };

  const handleNewPrice = async (e) => {
    const { value, name } = e.target;
    if (!value) return;
    if (isNaN(value)) {
      alert('Zadaná hodnota není číslo, použij tečku místo čárky');
      return;
    }
    setLoading(true);
    try {
      await axios.put('/api/materials', { data: { _id: name, newPrice: value }, type: 'new_price' });
    } catch (error) {
      console.log(error);
    }
    const newMaterials = [...materialsCopy].map((m) => {
      if (m._id === name) m.prices.push({ timestamp: String(new Date()), price: value });
      return m;
    });
    setMaterialsCopy(newMaterials);
    e.target.value = '';
    setLoading(false);
  };

  const handleNewMaterialOrder = async (category, oldOrder, direction, full) => {
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
      const maxOrder = materialsCopy.filter((m) => m.category === category).length - 1;
      if (full) {
        newOrder = maxOrder;
      } else {
        newOrder = oldOrder + 1 <= maxOrder ? oldOrder + 1 : maxOrder;
      }
    }
    setLoading(true);
    try {
      const newMaterials = [...materialsCopy].filter((m) => m.category === category).sort((a, b) => a.order - b.order);
      if (full) {
        const filteredArr = newMaterials.filter((m) => m.order !== oldOrder);
        const itemToMove = newMaterials.find((m) => m.order === oldOrder);
        if (direction === 'up') {
          const orderedArr = [{ ...itemToMove }, ...filteredArr].map((item, i) => ({ ...item, order: i, value: i }));
          await axios.put('/api/materials', { data: orderedArr, type: 'order' });
          const newMaterialsCopy = [...materialsCopy].map((m) => {
            orderedArr.forEach((newM) => {
              if (newM._id === m._id) m.order = newM.order;
            });
            return m;
          });
          setMaterialsCopy(newMaterialsCopy);
        } else {
          const orderedArr = [...filteredArr, { ...itemToMove }].map((item, i) => ({ ...item, order: i, value: i }));
          await axios.put('/api/materials', { data: orderedArr, type: 'order' });
          const newMaterialsCopy = [...materialsCopy].map((m) => {
            orderedArr.forEach((newM) => {
              if (newM._id === m._id) m.order = newM.order;
            });
            return m;
          });
          setMaterialsCopy(newMaterialsCopy);
        }
      } else {
        const temp = newMaterials[oldOrder];
        newMaterials[oldOrder].order = newOrder;
        newMaterials[oldOrder] = newMaterials[newOrder];
        newMaterials[newOrder].order = oldOrder;
        newMaterials[newOrder] = temp;
        await axios.put('/api/materials', {
          data: [
            { ...newMaterials[oldOrder], value: newMaterials[oldOrder].order },
            { ...newMaterials[newOrder], value: newMaterials[newOrder].order },
          ],
          type: 'order',
        });
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleFavorite = async (material) => {
    setLoading(true);
    try {
      await axios.put('/api/materials', { data: material, type: 'favorite' });
      const updatedArr = [...materialsCopy].map((m) => {
        if (m._id === material._id) m.favorite = !m.favorite;
        return m;
      });
      setMaterialsCopy(updatedArr);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleMaterialTextChanged = async (value, _id, type, timestamp) => {
    if (type === 'price' && (isNaN(value) || !value)) return;
    setLoading(true);
    try {
      await axios.put('/api/materials', { data: [{ _id, value, timestamp }], type });
      const newMaterials = [...materialsCopy].map((m) => {
        if (m._id === _id) {
          if (type === 'price') {
            if (isNaN(value)) return m;
            m.prices[m.prices.length - 1].price = value;
          } else {
            m[type] = value;
          }
        }
        return m;
      });
      setMaterialsCopy(newMaterials);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleMaterialDelete = async (name, _id, category) => {
    if (loading) return;
    setLoading(true);
    if (confirm(`Hrebo? Opravdu chceš smazat materiál ${name}?`)) {
      try {
        await axios.delete(`/api/materials`, { data: { _id } });
        const filteredArr = [...materialsCopy].filter((m) => m._id !== _id && m.category === category);
        const orderedArr = filteredArr.map((item, i) => ({ ...item, order: i, value: i }));
        await axios.put('/api/materials', { data: orderedArr, type: 'order' });
        const newMaterialsCopy = [...materialsCopy]
          .filter((m) => m._id !== _id)
          .map((m) => {
            orderedArr.forEach((newM) => {
              if (newM._id === m._id) m.order = newM.order;
            });
            return m;
          });
        setMaterialsCopy(newMaterialsCopy);
      } catch (error) {
        console.log(error);
      }
    }
    setLoading(false);
  };

  return (
    <>
      <Loader loading={loading} />
      {categoriesCopy &&
        categoriesCopy.map(({ order: catOrder, name: catName, _id: catId }) => (
          <div key={catId + catName} className="my-2">
            <EditableCategoryTableHeader
              id={catId}
              name={catName}
              editMode={editMode}
              loading={loading}
              onDoubleDown={() => handleNewCategoryOrder(catOrder, 'down', true)}
              onDown={() => handleNewCategoryOrder(catOrder, 'down')}
              onUp={() => handleNewCategoryOrder(catOrder, 'up')}
              onDoubleUp={() => handleNewCategoryOrder(catOrder, 'up', true)}
              onTextChanged={handleCategoryTextChanged}
              onDelete={() => handleCategoryDelete(catName, catId)}
            />
            <table className="table table-striped price-list">
              <MaterialsTableHeader editMode={editMode} />
              <tbody>
                {materialsCopy &&
                  materialsCopy
                    .filter(({ category }) => category === catId)
                    .sort((a, b) => a.order - b.order)
                    .map((material) =>
                      editMode ? (
                        <EditableMaterialTableRow
                          key={material._id + material.name}
                          material={material}
                          onDoubleDown={() => handleNewMaterialOrder(material.category, material.order, 'down', true)}
                          onDown={() => handleNewMaterialOrder(material.category, material.order, 'down')}
                          onUp={() => handleNewMaterialOrder(material.category, material.order, 'up')}
                          onDoubleUp={() => handleNewMaterialOrder(material.category, material.order, 'up', true)}
                          onTextChanged={handleMaterialTextChanged}
                          onDelete={() => handleMaterialDelete(material.name, material._id, material.category)}
                          onFavorite={() => handleFavorite(material)}
                          loading={loading}
                        />
                      ) : (
                        <ReadableMaterialTableRow key={material._id} material={material} onNewPrice={handleNewPrice} loading={loading} />
                      ),
                    )}
                {newMaterialCatId === catId ? (
                  <NewMaterial materials={materialsCopy} category={newMaterialCatId} onSave={handleNewMaterial} onCancel={() => setNewMaterialCatId(0)} />
                ) : (
                  <NewMaterialButton onClick={() => setNewMaterialCatId(catId)} />
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
