import { getSession } from 'next-auth/client';
const { ADMIN_USERS } = process.env;

export async function isNotAdmin(req) {
  const session = await getSession({ req });
  return !session || (ADMIN_USERS !== session.user.email && session.user.role !== 'hrebo');
}
