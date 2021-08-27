import Card from '../../components/common/card';
import Layout from '../../components/common/layout';
import BottomAbout from '../../components/homepage/bottomAbout';
import BottomLocation from '../../components/homepage/bottomLocation';
import GoogleMap from '../../components/homepage/googleMap';
import PhoneIcon from '../../components/icons/phoneIcon';
import BookIcon from '../../components/icons/bookIcon';
import HouseIcon from '../../components/icons/houseIcon';

const Kontakty = () => {
  return (
    <Layout>
      <section className="theme-bg-primary py-4">
        <div className="container">
          <h1>Kontakty</h1>
          <div className="row">
            <div className="col">
              <Card icon={<PhoneIcon className="me-2 align-top" style={{ width: '24px', height: '24px' }} />} title="Menu">
                <table className="table">
                  <tbody>
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
                  </tbody>
                </table>
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
        </div>
      </section>
      <section>
        <div className="pt-4">
          <GoogleMap />
        </div>
      </section>
    </Layout>
  );
};

export default Kontakty;
