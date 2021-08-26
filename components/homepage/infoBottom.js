import Card from '../common/card';
import BurgerIcon from '../icons/burgerIcon';
import BottomMenu from './bottomMenu';
import BookIcon from '../icons/bookIcon';
import BottomAbout from './bottomAbout';
import HouseIcon from '../icons/houseIcon';
import BottomLocation from './bottomLocation';

const InfoBottom = ({ materials }) => {
  return (
    <div className="row">
      <div className="col">
        <Card icon={<BurgerIcon className="me-2 align-top" />} title="Menu">
          <BottomMenu />
        </Card>
      </div>
      <div className="col">
        <Card icon={<BookIcon className="me-2 align-top" />} title="Firemní údaje">
          <BottomAbout />
        </Card>
      </div>
      <div className="col">
        <Card icon={<HouseIcon className="me-2 align-top" />} title="Provozovny">
          <BottomLocation />
        </Card>
      </div>
    </div>
  );
};

export default InfoBottom;
