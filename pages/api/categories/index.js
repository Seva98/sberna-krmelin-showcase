import { connectToDatabase } from '../../../lib/mongodb';

export default async function handler(req, res) {
  const { method } = req;
  const { db } = await connectToDatabase();
  const collection = await db.collection('categories');

  switch (method) {
    case 'POST':
      try {
      } catch (error) {
        res.status(400).json(error);
      }
      break;

    case 'GET':
      try {
        res.status(201).json({ message: 'success' });
      } catch (error) {
        res.status(400).json(error);
      }
      break;

    case 'UPDATE':
      try {
      } catch (error) {
        res.status(400).json(error);
      }
      break;

    case 'DELETE':
      try {
      } catch (error) {
        res.status(400).json(error);
      }
      break;
  }
}
