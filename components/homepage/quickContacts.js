import ShortInfo from '../common/shortInfo';
import PhoneIcon from '../icons/phoneIcon';

const QuickContacts = () => {
  return (
    <ShortInfo icon={<PhoneIcon className="mb-4" />} title="Rychlý kontakt">
      <table className="table">
        <tr>
          <th>Tel.</th>
          <td>
            <a href="tel:736642927">+420 736 642 927</a>
          </td>
        </tr>
        <tr>
          <th>Email</th>
          <td>
            <a href="mailto:info@sbernakrmelin.cz">info@sbernakrmelin.cz</a>
          </td>
        </tr>
      </table>
    </ShortInfo>
  );
};

export default QuickContacts;
