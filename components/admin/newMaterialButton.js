const NewMaterialButton = ({ catId, onClick }) => {
  return (
    <tr>
      <td colSpan="5">
        <div className="btn btn-primary w-100" onClick={onClick}>
          Přidat materiál
        </div>
      </td>
    </tr>
  );
};

export default NewMaterialButton;
