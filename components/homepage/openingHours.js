import ClockIcon from '../icons/clockIcon';
import ShortInfo from '../common/shortInfo';

const OpeningHours = () => {
  return (
    <ShortInfo icon={<ClockIcon className="mb-4" />} title="Otevírací doba">
      <table className="table">
        <tbody>
          <tr>
            <th className="text-end">Pondělí</th>
            <td>8:00-11:30</td>
            <td>12:30-17:00</td>
          </tr>
          <tr>
            <th className="text-end">Úterý</th>
            <td>8:00-11:30</td>
            <td>12:30-17:00</td>
          </tr>
          <tr>
            <th className="text-end">Středa</th>
            <td>8:00-11:30</td>
            <td>12:30-17:00</td>
          </tr>
          <tr>
            <th className="text-end">Čtvrtek</th>
            <td>8:00-11:30</td>
            <td>12:30-17:00</td>
          </tr>
          <tr>
            <th className="text-end">Pátek</th>
            <td>8:00-11:30</td>
            <td>12:30-17:00</td>
          </tr>
          <tr>
            <th className="text-end">Sobota</th>
            <td colSpan="2">9:00-11:00</td>
          </tr>
          <tr>
            <th className="text-end">Neděle</th>
            <td colSpan="2">Zavřeno</td>
          </tr>
        </tbody>
      </table>
    </ShortInfo>
  );
};

export default OpeningHours;
