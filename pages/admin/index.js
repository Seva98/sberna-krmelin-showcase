import Layout from '../../components/common/layout';
import Button from '../../components/common/button';
import data from '../../data/data.json';
import { useEffect, useState } from 'react';
import EditableMaterialsTable from '../../components/admin/editableMaterialsTable';

const Admin = ({ data }) => {
  return (
    <Layout className="container">
      <h1>Admin</h1>
      <EditableMaterialsTable data={data} />
    </Layout>
  );
};

export default Admin;

export async function getServerSideProps(context) {
  // const { client } = await connectToDatabase();
  return {
    props: {
      data,
    },
  };
}
