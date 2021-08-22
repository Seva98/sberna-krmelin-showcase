import { ObjectID } from 'mongodb';
import { connectToDatabase } from '../../../lib/mongodb';

export default async function handler(req, res) {
  const { method } = req;
  const { db } = await connectToDatabase();
  const materials = await db.collection('materials');

  switch (method) {
    case 'GET':
      try {
        const response = await materials.find({}).toArray();
        res.status(200).json(response);
      } catch (error) {
        res.status(400).json(error);
      }
      break;

    case 'POST':
      try {
        const { data } = req.body;
        const response = await materials.insertOne(data);
        res.status(201).json(response);
      } catch (error) {
        res.status(400).json(error);
      }
      break;

    case 'PUT':
      try {
        const { data, type } = req.body;
        let action;
        switch (type) {
          case 'NEW_PRICE':
            const { _id, newPrice } = data;
            const response = await materials.updateOne(
              { _id: ObjectID(_id) },
              {
                $push: {
                  prices: {
                    timestamp: new Date(),
                    price: newPrice,
                  },
                },
              },
            );
            res.status(200).json({ response });
            return;
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

        const response = await materials.bulkWrite(action);
        res.status(200).json({ response });
      } catch (error) {
        res.status(400).json(error);
      }
      break;

    case 'DELETE':
      try {
        const { _id } = req.body;
        // TODO delete from materials DB
        const response = await materials.deleteOne({ _id: ObjectID(_id) });
        res.status(200).json({ response });
      } catch (error) {
        res.status(400).json(error);
      }
      break;
    default:
      console.log(method, req.body);
  }
}
