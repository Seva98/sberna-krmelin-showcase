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
      <Service
        image={vzv}
        title="Obsluha na provoze"
        text={`K obsluze na provoze využíváme 2.5t vysokozdvižné vozíky s nosností do 5t.
Pro pohodlné zvážení Vašeho kovového odpadu jsme vybaveni digitální váhou do 5t a digitální váhou do 600 kg
Stačí přijet a naší zaměstnanci Vám pomůžou Vámi dovezený kov vyložit a hned nahlásí jeho hmotnost.
Obě váhy mají viditelně umístěný display, takže váhu vidíte na vlastní oči.
K obsluze na provoze využíváme 2.5t vysokozdvižné vozíky s nosností do 5t.`}
      />
      <Service
        image={kontejner}
        title="Zapůjčení odběrných nádob"
        text={`Pokud nemáte v čem Váš kovový odpad převézt, nabízíme (bezplatně) možnost zapůjčení 1000l plastového kontejneru a železné bedny MARS.`}
        leftImg
      />
      <Service
        image={doprava6}
        title="Nákladní doprava 6t"
        text={`V případě většího množství kovového odpadu jsme schopni po předchozí domluvě firmám i jednotlivcům nabídnout nákladní dopravu s možností zapůjčení kontejneru 5 - 15 ccm s nosností do 6t.`}
      />
      <Service
        image={doprava12}
        title="Nákladní doprava 12t"
        text={`K dispozici je také nákladní doprava s rukou a nosností do 12t.
V domluvený den přijedeme, kovový odpad naložíme a odvezeme ke zvážení a dalšímu zpracování`}
        leftImg
      />
    </Layout>
  );
};

export default Sluzby;
