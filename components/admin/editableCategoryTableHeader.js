import ThrashIcon from '../icons/thrashIcon';
import DoubleDownIcon from '../icons/doubleDownIcon';
import DoubleUpIcon from '../icons/doubleUpIcon';
import DownIcon from '../icons/downIcon';
import UpIcon from '../icons/upIcon';
import { useState } from 'react';

const EditableMaterialsTableHeader = ({ name, id, editMode, loading, onDoubleDown, onDown, onUp, onDoubleUp, onDelete, onTextChange, onTextChanged }) => {
  const [nameCopy, setNameCopy] = useState(name);

  return (
    <div className="h4">
      {editMode ? (
        <>
          <DoubleDownIcon onClick={onDoubleDown} />
          <DownIcon onClick={onDown} className="mx-2" />
          <UpIcon onClick={onUp} className="mx-2" />
          <DoubleUpIcon onClick={onDoubleUp} />
          <input type="text" value={nameCopy} className="mx-2" disabled={loading} name={id} onChange={(e) => setNameCopy(e.target.value)} onBlur={onTextChanged} />
          <ThrashIcon onClick={onDelete} />
        </>
      ) : (
        <div>{name}</div>
      )}
    </div>
  );
};

export default EditableMaterialsTableHeader;
