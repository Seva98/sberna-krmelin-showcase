import Layout from '../../components/common/layout';
import EditableMaterialsTable from '../../components/admin/editableMaterialsTable';
import { connectToDatabase } from '../../lib/mongodb';
import EditIcon from '../../components/icons/editIcon';
import { useState } from 'react';
import CheckIcon from '../../components/icons/checkIcon';

const Admin = ({ categories, materials }) => {
  const [editMode, setEditMode] = useState(false);

  return (
    <Layout className="container">
      <h1>
        <span>Admin</span>
        <span className="mx-2">{editMode ? <CheckIcon onClick={() => setEditMode(!editMode)} /> : <EditIcon onClick={() => setEditMode(!editMode)} />}</span>
      </h1>
      <EditableMaterialsTable categories={categories} materials={materials} editMode={editMode} />
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
