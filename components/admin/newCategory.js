import axios from 'axios';
import { useState } from 'react';

const NewCategory = ({ categories, onCategoryAdded }) => {
  const [addingCategory, setAddingCategory] = useState(false);
  const [newCategory, setNewCategory] = useState('');

  const saveNewCategory = () => {
    if (!newCategory) {
      alert('Missing category name');
      return;
    }
    try {
      const data = { name: newCategory, order: categories ? categories.length : 0 };
      axios.post('/api/categories', data);
      setAddingCategory(false);
      setNewCategory('');
      console.log(categories);
      onCategoryAdded(data);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      {addingCategory ? (
        <div className="row">
          <div className="col">
            <input placeholder="Kategorie" value={newCategory} className="w-100 form-control" onChange={({ target: { value } }) => setNewCategory(value)} />
          </div>
          <div className="col">
            <div className="btn btn-primary w-100" onClick={() => saveNewCategory()}>
              Uložit kategorii
            </div>
          </div>
        </div>
      ) : (
        <div className="btn btn-primary w-100" onClick={() => setAddingCategory(true)}>
          Přidat kategorii
        </div>
      )}
    </>
  );
};

export default NewCategory;
