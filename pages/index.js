import Layout from '../components/common/layout';
import { connectToDatabase } from '../lib/mongodb';

export default function Home() {
  return <Layout>TEST</Layout>;
}

export async function getServerSideProps(context) {
  const { client } = await connectToDatabase();

  const isConnected = await client.isConnected();

  return {
    props: { isConnected },
  };
}
