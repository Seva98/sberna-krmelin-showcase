const NewMaterialButton = ({ catId, onClick }) => {
  return (
    <tr>
      <td colSpan="5" className="p-0">
        <button className="btn btn-secondary w-100" onClick={onClick}>
          Přidat materiál
        </button>
      </td>
    </tr>
  );
};

export default NewMaterialButton;
