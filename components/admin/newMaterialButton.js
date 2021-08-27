const NewMaterialButton = ({ catId, onClick }) => {
  return (
    <tr>
      <td colSpan="5" className="p-0">
        <button className="btn btn-primary w-100" onClick={onClick}>
          Přidat materiál
        </button>
      </td>
    </tr>
  );
};

export default NewMaterialButton;
