import Layout from '../../components/common/layout';
import EditableMaterialsTable from '../../components/admin/editableMaterialsTable';
import { connectToDatabase } from '../../lib/mongodb';
import EditIcon from '../../components/icons/editIcon';
import { useEffect, useState } from 'react';
import CheckIcon from '../../components/icons/checkIcon';
import { getSession } from 'next-auth/client';

const Admin = ({ email, categories, materials }) => {
  console.log(email, categories, materials);
  useEffect(() => {
    if (!email) window.location = '/api/auth/signin';
  }, []);

  const [editMode, setEditMode] = useState(false);
  if (!email) return <></>;
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
  const { query } = context;
  const session = await getSession(context);
  console.log('SESSION', session);
  if (!session) return { props: {} };
  const {
    user: { email },
  } = session;
  const { role } = query;
  const { ADMIN_USER } = process.env;
  console.log('SESSION 2', ADMIN_USER, role, user);
  if (ADMIN_USER !== email) return { props: {} };

  const { db } = await connectToDatabase();
  const catCollection = await db.collection('categories');
  const categories = await catCollection.find({}).toArray();
  const matCollection = await db.collection('materials');
  const materials = await matCollection.find({}).toArray();

  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
      materials: JSON.parse(JSON.stringify(materials)),
      email,
    },
  };
}
