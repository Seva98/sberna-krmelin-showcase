import { ObjectID } from 'mongodb';
import { connectToDatabase } from '../../../lib/mongodb';

export default async function handler(req, res) {
  const { method } = req;
  const { db } = await connectToDatabase();
  const collection = await db.collection('categories');

  switch (method) {
    case 'POST':
      try {
        const { name, order } = req.body;
        const response = await collection.insertOne({ name, order });
        res.status(201).json(response);
      } catch (error) {
        res.status(400).json(error);
      }
      break;

    case 'GET':
      try {
        const response = await collection.find({}).toArray();
        res.status(200).json(response);
      } catch (error) {
        res.status(400).json(error);
      }
      break;

    case 'PUT':
      try {
        const { data, type } = req.body;
        let action;
        switch (type) {
          case 'ORDER':
            action = data.map(({ _id, order }) => ({
              updateOne: {
                filter: { _id: ObjectID(_id) },
                update: { $set: { order } },
              },
            }));
            break;
          case 'NAME':
            action = data.map(({ _id, name }) => ({
              updateOne: {
                filter: { _id: ObjectID(_id) },
                update: { $set: { name } },
              },
            }));
            break;
        }

        const response = await collection.bulkWrite(action);
        res.status(200).json({ response });
      } catch (error) {
        res.status(400).json(error);
      }
      break;

    case 'DELETE':
      try {
        const { _id } = req.body;
        // TODO delete from materials DB
        const response = await collection.deleteOne({ _id: ObjectID(_id) });
        res.status(200).json({ response });
      } catch (error) {
        res.status(400).json(error);
      }
      break;
    default:
      console.log(method, req.body);
  }
}
