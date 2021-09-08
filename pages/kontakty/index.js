import Layout from '../../components/common/layout';
import GoogleMap from '../../components/homepage/googleMap';
import ContactsCard from '../../components/contacts/contactsCard';
import sberna from '../../assets/images/sberna.jpeg';
import hrebo from '../../assets/images/hrebo.png';
import marek from '../../assets/images/marek.png';

const Kontakty = () => {
  return (
    <Layout>
      <section className="theme-bg-primary py-4">
        <div className="container">
          <h1>Kontakty</h1>
          <div className="row">
            <div className="col-12">
              <ContactsCard image={sberna} name="LH Store s.r.o." subtitle="Provozovatel Sběrna Krmelín" phone="+420 YYY YYY YYY" email="info@sbernakrmelin.cz">
                <div className="text-center mb-3">
                  Staroveská 567
                  <br />
                  739 24 Krmelín
                </div>
              </ContactsCard>
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <ContactsCard image={hrebo} name="Ing. Lukáš Hrebík" subtitle="Jednatel" phone="+420 736 642 927" email="hrebik@lhstore.cz" />
            </div>
            <div className="col-4">
              <ContactsCard image={marek} name="Marek Elšík" subtitle="Nákupčí" phone="+420 XXX XXX XXX" email="elsik@lhstore.cz" />
            </div>
            <div className="col-4">
              <ContactsCard image={marek} name="Jiří Sýkora" subtitle="Likvidace autovraků" phone="+420 606 577 677" email="autovraky@centrum.cz" />
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
