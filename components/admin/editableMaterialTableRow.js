import axios from 'axios';
import { useState } from 'react';
import DoubleDownIcon from '../icons/doubleDownIcon';
import DoubleUpIcon from '../icons/doubleUpIcon';
import DownIcon from '../icons/downIcon';
import EmptyStarIcon from '../icons/emptyStarIcon';
import StarIcon from '../icons/starIcon';
import ThrashIcon from '../icons/thrashIcon';
import UpIcon from '../icons/upIcon';

const EditableMaterialTableRow = ({ material, loading, onDoubleDown, onDown, onUp, onDoubleUp, onTextChanged, onDelete, onFavorite }) => {
  const [name, setName] = useState(material.name);
  const [description, setDescription] = useState(material.description);
  const [price, setPrice] = useState(material.prices[material.prices.length - 1].price);
  const [unit, setUnit] = useState(material.unit);
  const [img, setImg] = useState(material.img);

  const [materialCopy, setMaterialCopy] = useState({
    name: material.name,
    description: material.description,
    price: material.prices[material.prices.length - 1].price,
    unit: material.unit,
    img: material.img,
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'description':
        setDescription(value);
        break;
      case 'price': {
        if (isNaN(value)) return;
        setPrice(value);
        break;
      }
      case 'unit':
        setUnit(value);
        break;
      case 'img':
        setImg(value);
        break;
    }
  };

  return (
    <tr>
      <td style={{ minWidth: '175px' }}>
        <DoubleDownIcon onClick={onDoubleDown} />
        <DownIcon onClick={onDown} className="mx-2" />
        <UpIcon onClick={onUp} className="mx-2" />
        <DoubleUpIcon onClick={onDoubleUp} className="mx-2" />
        {material.favorite ? <StarIcon onClick={onFavorite} /> : <EmptyStarIcon onClick={onFavorite} />}
      </td>
      <td>
        <input
          type="text"
          name="name"
          placeholder="Název"
          value={name}
          className="mx-2"
          disabled={loading}
          onChange={handleChange}
          onBlur={(e) => onTextChanged(e.target.value, material._id, 'name')}
        />
      </td>
      <td>
        <input
          type="text"
          name="description"
          placeholder="Popis"
          value={description}
          className="mx-2"
          disabled={loading}
          onChange={handleChange}
          onBlur={(e) => onTextChanged(e.target.value, material._id, 'description')}
        />
      </td>
      <td>
        <input
          type="number"
          name="price"
          placeholder="Cena"
          value={price}
          className="mx-2"
          disabled={loading}
          onChange={handleChange}
          onBlur={(e) => onTextChanged(e.target.value, material._id, 'price', material.prices[material.prices.length - 1].timestamp)}
        />
      </td>
      <td>
        <input
          type="text"
          name="unit"
          placeholder="Popis"
          value={unit}
          className="mx-2"
          disabled={loading}
          onChange={handleChange}
          onBlur={(e) => onTextChanged(e.target.value, material._id, 'unit')}
        />
      </td>
      <td>
        <input
          type="text"
          name="img"
          placeholder="URL obrázku"
          value={img}
          className="mx-2"
          disabled={loading}
          onChange={handleChange}
          onBlur={(e) => onTextChanged(e.target.value, material._id, 'img')}
        />
      </td>
      <td>
        <ThrashIcon onClick={onDelete} />
      </td>
    </tr>
  );
};

export default EditableMaterialTableRow;
