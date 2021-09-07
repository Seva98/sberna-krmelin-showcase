import Layout from '../../components/common/layout';
import ServicesIntro from '../../components/services/servicesIntro';
import Service from '../../components/services/service';
import vzv from '../../assets/images/vzv.jpeg';
import kontejner from '../../assets/images/kontejner.jpeg';
import doprava6 from '../../assets/images/doprava6.jpeg';
import doprava12 from '../../assets/images/doprava12.jpeg';

const Sluzby = () => {
  return (
    <Layout>
      <ServicesIntro />
      <Service image={vzv} title="Obsluha na provoze" text="K obsluze na provoze využíváme 2.5t vysokozdvižné vozíky s nosností do 5t." />
      <Service image={kontejner} title="Zapůjčení odběrných nádob" text="Možnost zapůjčení 1000l plastového kontejnéru a železné bedny MARS." leftImg />
      <Service image={doprava6} title="Nákladní doprava 6t" text="Nabízíme nákladní dopravu s možností půjčení kontejnéru 5 - 15 ccm s nosností do 6t." />
      <Service image={doprava12} title="Nákladní doprava 12t" text="K dispozici je také nákladní doprava s rukou a nosností do 12t." leftImg />
    </Layout>
  );
};

export default Sluzby;
