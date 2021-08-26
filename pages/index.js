import Layout from '../components/common/layout';
import { connectToDatabase } from '../lib/mongodb';
import Banner from '../components/homepage/bannerTop';
import bannerTop from '../assets/images/banner-top.png';
import InfoTop from '../components/homepage/infoTop';
import Rema from '../components/homepage/rema';
import ReviewsCarousel from '../components/homepage/reviewsCarousel';
import GoogleMap from '../components/homepage/googleMap';

export default function Home({ materials, deviceType }) {
  return (
    <Layout>
      <section>
        <div className="container">
          <Banner src={bannerTop} />
          <InfoTop materials={materials} />
        </div>
      </section>
      <section>
        <div className="theme-bg-secondary py-5">
          <Rema />
        </div>
      </section>
      <section>
        <div className="my-5">
          <ReviewsCarousel deviceType={deviceType} />
        </div>
      </section>
      <section>
        <div className="theme-bg-primary py-4">
          <GoogleMap />
        </div>
      </section>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { db } = await connectToDatabase();
  const matCollection = await db.collection('materials');
  const materials = await matCollection.find({ favorite: true }).toArray();

  return {
    props: { materials: JSON.parse(JSON.stringify(materials)) },
  };
}
