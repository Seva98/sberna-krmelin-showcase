import { connectToDatabase } from '../../../lib/mongodb';

export default async function handler(req, res) {
  const { method } = req;
  const { db } = await connectToDatabase();
  const collection = await db.collection('categories');

  switch (method) {
    case 'POST':
      try {
        const { name, order } = req.body;
        const data = await collection.insertOne({ name, order });
        res.status(201).json(data);
      } catch (error) {
        res.status(400).json(error);
      }
      break;

    case 'GET':
      try {
        const data = await collection.find({}).toArray();
        res.status(200).json(data);
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
