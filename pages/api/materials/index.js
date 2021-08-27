import { ObjectID } from 'mongodb';
import { isNotAdmin } from '../../../lib/helpers';
import { connectToDatabase } from '../../../lib/mongodb';

export default async function handler(req, res) {
  // if (await isNotAdmin(req)) {
  //   res.status(401).json({ error: 'Unauthorized access' });
  //   return;
  // }
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
        if (type === 'new_price') {
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
          await res.status(200).json({ response });
          return;
        } else if (type === 'price') {
          action = data.map(({ _id, value, timestamp }) => ({
            updateOne: {
              filter: {
                _id: ObjectID(_id),
                'prices.timestamp': new Date(timestamp),
              },
              update: {
                $set: {
                  'prices.$.price': value,
                },
              },
            },
          }));
        } else if (type === 'favorite') {
          const { _id, favorite } = data;
          const response = await materials.updateOne(
            { _id: ObjectID(_id) },
            {
              $set: {
                favorite: !favorite,
              },
            },
          );
          await res.status(200).json({ response });
          return;
        } else {
          action = data.map(({ _id, value }) => ({
            updateOne: {
              filter: { _id: ObjectID(_id) },
              update: {
                $set: {
                  [`${type}`]: value,
                },
              },
            },
          }));
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
