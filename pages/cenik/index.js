import { useState } from 'react';
import EditableMaterialsTable from '../../components/admin/editableMaterialsTable';
import Layout from '../../components/common/layout';
import MainCategoriesSwitcher from '../../components/prices/mainCategoriesSwitcher';
import MaterialsTable from '../../components/prices/materialsTable';
import { connectToDatabase } from '../../lib/mongodb';

const Cenik = ({ mainCategories, categories, materials }) => {
  const [activeMainCategory, setMainCategory] = useState(mainCategories[0]._id);
  return (
    <Layout>
      <MainCategoriesSwitcher mainCategories={mainCategories} activeMainCategory={activeMainCategory} onChange={(c) => setMainCategory(c)} />
      <div className="container">
        <MaterialsTable materials={materials} categories={categories} activeMainCategory={activeMainCategory} />
      </div>
    </Layout>
  );
};

export default Cenik;

export async function getServerSideProps(context) {
  const { db } = await connectToDatabase();
  const mainCatCollection = await db.collection('mainCategories');
  const mainCategories = await mainCatCollection.find({}).toArray();
  const catCollection = await db.collection('categories');
  const categories = await catCollection.find({}).toArray();
  const matCollection = await db.collection('materials');
  const materials = await matCollection.find({}).toArray();

  return {
    props: {
      mainCategories: JSON.parse(JSON.stringify(mainCategories)),
      categories: JSON.parse(JSON.stringify(categories)),
      materials: JSON.parse(JSON.stringify(materials)),
    },
  };
}
