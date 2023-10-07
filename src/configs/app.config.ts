import 'dotenv/config';

export const API_PREFIX_PATH = process.env.API_PREFIX_PATH;

// Server
export const PORT = process.env.PORT;

// Database
export const DB_NAME = process.env.DB_NAME;
export const DB_HOST = process.env.DB_HOST;
export const DB_PORT = +process.env.DB_PORT;
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_LOGGING = process.env.DB_LOGGING === 'true' ? true : false;

// CRYPTO
export const CIPHER_MODE = process.env.CIPHER_MODE;
export const CIPHER_KEY = process.env.CIPHER_KEY;
export const CIPHER_IV = process.env.CIPHER_IV;

// AUTH
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
export const JWT_EXPIRED_TIME_TOKEN = process.env.JWT_EXPIRED_TIME_TOKEN;

// URL FILE
export const URL_FILE = process.env.URL_FILE;
