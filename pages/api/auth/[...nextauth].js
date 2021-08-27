import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { connectToDatabase } from '../../../lib/mongodb';
import bcrypt from 'bcryptjs';

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options

const options = {
  providers: [
    Providers.Credentials({
      name: 'Credentials',
      theme: 'dark',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'example@email.com' },
        password: { label: 'Heslo', type: 'password', placeholder: '********' },
      },
      async authorize(credenetials) {
        const { email, password } = credenetials;
        const { db } = await connectToDatabase();
        const collection = await db.collection('users');
        const user = await collection.findOne({ email });
        if (user) {
          return bcrypt.compareSync(password, user.password) ? { email: user.email, role: user.role } : null;
        } else {
          return null;
        }
      },
    }),
  ],
  database: process.env.MONGO_URI_AUTH,
  secret: process.env.SECRET,
  session: {
    jwt: true,
  },
  jwt: {},
  callbacks: {
    async session(session, user) {
      const { email } = user;
      const { db } = await connectToDatabase();
      const collection = await db.collection('users');
      const { role, _id } = await collection.findOne({ email });
      console.log(_id, role);
      return {
        ...session,
        user: {
          ...session.user,
          role,
          _id,
        },
      };
    },
  },
  events: {},
  debug: true,
};

const response = (req, res) => {
  //setNextAuthUrl(req);
  NextAuth(req, res, options);
  res.status(200);
};
export default response;
