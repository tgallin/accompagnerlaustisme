export const db = process.env.MONGOHQ_URL || process.env.MONGODB_URI || 'mongodb://localhost:27017/accompagnerlautisme';

export default {
  db
};
