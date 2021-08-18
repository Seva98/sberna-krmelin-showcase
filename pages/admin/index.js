import Layout from '../../components/common/layout';
import EditableMaterialsTable from '../../components/admin/editableMaterialsTable';
import { connectToDatabase } from '../../lib/mongodb';

const Admin = ({ categories, materials }) => {
  return (
    <Layout className="container">
      <h1>Admin</h1>
      <EditableMaterialsTable categories={categories} materials={materials} />
    </Layout>
  );
};

export default Admin;

export async function getServerSideProps(context) {
  const { db } = await connectToDatabase();
  const collection = await db.collection('categories');
  const categories = await collection.find({}).toArray();

  categories.forEach((cat) => (cat._id = String(cat._id)));
  console.log(categories);
  return {
    props: {
      categories,
    },
  };
}
