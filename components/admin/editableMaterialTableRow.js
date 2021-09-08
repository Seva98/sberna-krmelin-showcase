import axios from 'axios';
import DoubleDownIcon from '../icons/doubleDownIcon';
import DoubleUpIcon from '../icons/doubleUpIcon';
import DownIcon from '../icons/downIcon';
import EmptyStarIcon from '../icons/emptyStarIcon';
import StarIcon from '../icons/starIcon';
import ThrashIcon from '../icons/thrashIcon';
import UpIcon from '../icons/upIcon';

const EditableMaterialTableRow = ({ material, loading, onDoubleDown, onDown, onUp, onDoubleUp, onTextChange, onTextChanged, onDelete, onFavorite }) => {
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
          placeholder="Název"
          value={material.name}
          className="mx-2"
          disabled={loading}
          onChange={(e) => onTextChange(e.target.value, material._id, 'name')}
          onBlur={(e) => onTextChanged(e.target.value, material._id, 'name')}
        />
      </td>
      <td>
        <input
          type="text"
          placeholder="Popis"
          value={material.description}
          className="mx-2"
          disabled={loading}
          onChange={(e) => onTextChange(e.target.value, material._id, 'description')}
          onBlur={(e) => onTextChanged(e.target.value, material._id, 'description')}
        />
      </td>
      <td>
        <input
          type="number"
          placeholder="Cena"
          value={material.prices[material.prices.length - 1].price}
          className="mx-2"
          disabled={loading}
          onChange={(e) => onTextChange(e.target.value, material._id, 'price')}
          onBlur={(e) => onTextChanged(e.target.value, material._id, 'price', material.prices[material.prices.length - 1].timestamp)}
        />
      </td>
      <td>
        <input
          type="text"
          placeholder="Popis"
          value={material.unit}
          className="mx-2"
          disabled={loading}
          onChange={(e) => onTextChange(e.target.value, material._id, 'unit')}
          onBlur={(e) => onTextChanged(e.target.value, material._id, 'unit')}
        />
      </td>
      <td>
        <input
          type="text"
          placeholder="URL obrázku"
          value={material.img}
          className="mx-2"
          disabled={loading}
          onChange={(e) => onTextChange(e.target.value, material._id, 'img')}
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
