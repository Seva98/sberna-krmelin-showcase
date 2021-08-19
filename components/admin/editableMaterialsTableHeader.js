import ThrashIcon from '../icons/thrashIcon';
import DoubleDownIcon from '../icons/doubleDownIcon';
import DoubleUpIcon from '../icons/doubleUpIcon';
import DownIcon from '../icons/downIcon';
import UpIcon from '../icons/upIcon';

const EditableMaterialsTableHeader = ({ name, editMode, onDoubleDown, onDown, onUp, onDoubleUp }) => {
  return (
    <div className="h4">
      {editMode ? (
        <>
          <DoubleDownIcon onClick={onDoubleDown} />
          <DownIcon onClick={onDown} className="mx-2" />
          <UpIcon onClick={onUp} className="mx-2" />
          <DoubleUpIcon onClick={onDoubleUp} />
          <input type="text" value={name} className="mx-2" />
          <ThrashIcon />
        </>
      ) : (
        <div>{name}</div>
      )}
    </div>
  );
};

export default EditableMaterialsTableHeader;
