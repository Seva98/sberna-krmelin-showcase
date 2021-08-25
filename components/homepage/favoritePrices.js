import ShortInfo from '../common/shortInfo';
import PriceIcon from '../icons/priceIcon';

const FavoritePrices = ({ materials }) => {
  return (
    <ShortInfo icon={<PriceIcon className="mb-4" />} title="Aktuální ceny">
      <table className="table">
        {materials &&
          materials.map(({ name, prices, unit }) => (
            <tr key={name}>
              <th>{name}</th>
              <td>
                {prices[prices.length - 1].price} {unit}
              </td>
            </tr>
          ))}
      </table>
    </ShortInfo>
  );
};

export default FavoritePrices;
