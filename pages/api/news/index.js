import { ObjectID } from 'mongodb';
import { isNotAdmin } from '../../../lib/helpers';
import { connectToDatabase } from '../../../lib/mongodb';

export default async function handler(req, res) {
  const { method } = req;
  if (method === 'GET') {
    try {
      const { db } = await connectToDatabase();
      const news = await db.collection('news');
      const response = await news.find({}).toArray();
      res.status(200).json(response);
    } catch (error) {
      res.status(400).json(error);
    }
    return;
  }

  if (await isNotAdmin(req)) {
    res.status(401).json({ error: 'Unauthorized access' });
    return;
  }
  const { db } = await connectToDatabase();
  const news = await db.collection('news');

  switch (method) {
    case 'POST':
      try {
        const { data } = req.body;
        const response = await news.insertOne(data);
        res.status(201).json(response);
      } catch (error) {
        res.status(400).json(error);
      }
      break;

    case 'PUT':
      try {
        const { data } = req.body;
        const { _id, text } = data;
        console.log(_id, text, data);
        const response = await news.updateOne(
          { _id: ObjectID(_id) },
          {
            $set: {
              text,
            },
          },
        );
        res.status(200).json({ response });
      } catch (error) {
        res.status(400).json(error);
      }
      break;

    case 'DELETE':
      try {
        const { _id } = req.body;
        const response = await news.deleteOne({ _id: ObjectID(_id) });
        res.status(200).json({ response });
      } catch (error) {
        res.status(400).json(error);
      }
      break;
    default:
      console.log(method, req.body);
  }
}
