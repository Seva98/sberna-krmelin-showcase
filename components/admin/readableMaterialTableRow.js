const ReadableMaterialTableRow = ({ material, loading, onNewPrice }) => {
  const getChange = ({ prices }) => {
    if (prices.length <= 1) return;

    const prevPrice = Number(prices[prices.length - 2].price);
    const newPrice = Number(prices[prices.length - 1].price);
    return ((100 * (newPrice - prevPrice)) / prevPrice).toFixed(2);
  };

  return (
    <tr>
      <td>{material.name}</td>
      <td>{material.description}</td>
      <td>{`${material.prices[material.prices.length - 1].price} ${material.unit}`}</td>
      <td className={getChange(material) > 0 ? 'text-success' : 'text-danger'}>{getChange(material) ? `${getChange(material)}%` : ''}</td>
      <td>
        <input className="w-100 form-control" name={material._id} onBlur={onNewPrice} disabled={loading} />
      </td>
    </tr>
  );
};

export default ReadableMaterialTableRow;
