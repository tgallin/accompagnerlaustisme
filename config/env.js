import { DB_TYPES } from './dbTypes';

export const HOST = process.env.HOSTNAME || 'localhost';
export const PORT = process.env.PORT || '3000';
export const ENV = process.env.NODE_ENV || 'development';

export const DB_TYPE = process.env.DB_TYPE || DB_TYPES.MONGO;

export const GOOGLE_ANALYTICS_ID = process.env.GOOGLE_ANALYTICS_ID || null;

// private: 0, centralized: 1, both : 2
export const TOY_LIB_MANAGMENT = process.env.TOY_LIB_MANAGMENT || 1;