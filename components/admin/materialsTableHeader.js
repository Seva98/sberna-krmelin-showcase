const MaterialsTableHeader = ({ editMode }) => {
  return (
    <thead>
      <tr>
        {editMode && <th></th>}
        <th>Název</th>
        <th>Popis</th>
        <th>Cena</th>
        <th>{editMode ? 'Jednotka' : 'Rozdíl'}</th>
        {editMode && <th>Obrázek</th>}
        <th>{!editMode && 'Nová cena'}</th>
      </tr>
    </thead>
  );
};

export default MaterialsTableHeader;
