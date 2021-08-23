import axios from 'axios';
import { useState } from 'react';
import CrossIcon from '../icons/crossIcon';

const NewMaterial = ({ materials, category, onSave, onCancel }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [unit, setUnit] = useState('Kč/kg');

  const handlePriceChange = (e) => {
    const { value } = e.target;
    if (isNaN(value)) return;
    setPrice(value);
  };

  const saveNewMaterial = () => {
    try {
      const data = {
        name,
        description,
        category,
        unit,
        prices: [
          {
            timestamp: new Date(),
            price,
          },
        ],
        order: materials ? materials.filter((m) => m.category === category).length : 0,
      };
      axios.post('/api/materials', { data });
      onSave(data);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <tr>
      <td>
        <input name="name" placeholder="Název" value={name} className="w-100 form-control" onChange={({ target: { value } }) => setName(value)} />
      </td>
      <td>
        <input name="description" placeholder="Popis" value={description} className="w-100 form-control" onChange={({ target: { value } }) => setDescription(value)} />
      </td>
      <td>
        <input name="price" placeholder="Cena" value={price} className="w-100 form-control" onChange={handlePriceChange} />
      </td>
      <td>
        <input name="unit" placeholder="Jednotka" value={unit} className="w-100 form-control" onChange={({ target: { value } }) => setUnit(value)} />
      </td>
      <td>
        <button className="btn btn-primary w-100" onClick={() => saveNewMaterial()} disabled={!name || !description || !price}>
          Uložit materiál
        </button>
      </td>
      <td className="align-middle">
        <CrossIcon onClick={onCancel} />
      </td>
    </tr>
  );
};

export default NewMaterial;
