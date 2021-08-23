const MaterialsTableHeader = ({ editMode }) => {
  return (
    <thead>
      <tr>
        {editMode && <th></th>}
        <th>Název</th>
        <th>Popis</th>
        <th>Cena</th>
        <th>{editMode ? 'Jednotka' : 'Rozdíl'}</th>
        <th>{!editMode && 'Nová cena'}</th>
      </tr>
    </thead>
  );
};

export default MaterialsTableHeader;
