import Layout from '../components/common/layout';
import { connectToDatabase } from '../lib/mongodb';
import Banner from '../components/homepage/bannerTop';
import bannerTop from '../assets/images/banner-top.png';
import InfoTop from '../components/homepage/infoTop';
import InfoBottom from '../components/homepage/infoBottom';
import Rema from '../components/homepage/rema';
import ReviewsCarousel from '../components/homepage/reviewsCarousel';
import GoogleMap from '../components/homepage/googleMap';
import { useSession } from 'next-auth/client';
import bcrypt from 'bcryptjs';

export default function Home({ materials, deviceType }) {
  const [session, loading] = useSession();

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
      <section className=" theme-bg-secondary">
        <div className="container py-5">
          <InfoBottom />
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
