import Layout from '../../components/common/layout';
import EditableMaterialsTable from '../../components/admin/editableMaterialsTable';
import { connectToDatabase } from '../../lib/mongodb';
import EditIcon from '../../components/icons/editIcon';
import { useEffect, useState } from 'react';
import CheckIcon from '../../components/icons/checkIcon';
import { getSession } from 'next-auth/client';
import CategoriesSwitcher from '../../components/common/categoriesSwitcher';
import HomepageEditor from '../../components/admin/homepageEditor';

const Admin = ({ email, categories, materials, news }) => {
  useEffect(() => {
    if (!email) window.location = '/api/auth/signin';
  }, []);
  const mainCategories = ['Ceník', 'Úvodní strana'];
  const [activeMainCategory, setMainCategory] = useState(mainCategories[0]);

  const [editMode, setEditMode] = useState(false);
  if (!email) return <></>;

  return (
    <Layout className="container">
      <CategoriesSwitcher mainCategories={mainCategories} activeMainCategory={activeMainCategory} onChange={(c) => setMainCategory(c)} />
      <div className="container mt-2" />
      <h1>
        <span>{activeMainCategory}</span>
        {activeMainCategory === 'Ceník' && <span className="mx-2">{editMode ? <CheckIcon onClick={() => setEditMode(!editMode)} /> : <EditIcon onClick={() => setEditMode(!editMode)} />}</span>}
      </h1>
      {activeMainCategory === 'Ceník' ? (
        <EditableMaterialsTable categories={categories} materials={materials} editMode={editMode} />
      ) : (
        activeMainCategory === 'Úvodní strana' && <HomepageEditor news={news} />
      )}
    </Layout>
  );
};

export default Admin;

export async function getServerSideProps(context) {
  const { query } = context;
  const session = await getSession(context);
  if (!session) return { props: {} };
  const {
    user: { email },
  } = session;
  const { role } = query;
  const { ADMIN_USER } = process.env;
  if (ADMIN_USER !== email) return { props: {} };

  const { db } = await connectToDatabase();
  const catCollection = await db.collection('categories');
  const categories = await catCollection.find({}).toArray();
  const matCollection = await db.collection('materials');
  const materials = await matCollection.find({}).toArray();
  const newsCollection = await db.collection('news');
  const news = await newsCollection.find({}).toArray();

  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
      materials: JSON.parse(JSON.stringify(materials)),
      news: JSON.parse(JSON.stringify(news)),
      email,
    },
  };
}
