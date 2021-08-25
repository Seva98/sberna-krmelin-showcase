import FavoritePrices from './favoritePrices';
import OpeningHours from './openingHours';
import QuickContacts from './quickContacts';

const InfoTop = ({ materials }) => {
  return (
    <div className="row">
      <OpeningHours />
      <FavoritePrices materials={materials} />
      <QuickContacts />
    </div>
  );
};

export default InfoTop;
