import ThrashIcon from '../icons/thrashIcon';
import DoubleDownIcon from '../icons/doubleDownIcon';
import DoubleUpIcon from '../icons/doubleUpIcon';
import DownIcon from '../icons/downIcon';
import UpIcon from '../icons/upIcon';

const EditableMaterialsTableHeader = ({ name, id, editMode, loading, onDoubleDown, onDown, onUp, onDoubleUp, onDelete, onTextChange, onTextChanged }) => {
  return (
    <div className="h4">
      {editMode ? (
        <>
          <DoubleDownIcon onClick={onDoubleDown} />
          <DownIcon onClick={onDown} className="mx-2" />
          <UpIcon onClick={onUp} className="mx-2" />
          <DoubleUpIcon onClick={onDoubleUp} />
          <input type="text" value={name} className="mx-2" disabled={loading} name={id} onChange={onTextChange} onBlur={onTextChanged} />
          <ThrashIcon onClick={onDelete} />
        </>
      ) : (
        <div>{name}</div>
      )}
    </div>
  );
};

export default EditableMaterialsTableHeader;
