import { waitForDebugger } from "inspector";
import mysql from "mysql2";
import dbConfig from "../config/db-config";
import SQ from "sequelize";

const {
  connectionLimit,
  database,
  host,
  password,
  port,
  user,
  waitForConnections,
} = dbConfig;

export const sequelize = new SQ.Sequelize(database, user, password, {
  host,
  dialect: "mysql",
});

const pool = mysql.createPool({
  connectionLimit,
  waitForConnections,
  host,
  port,
  database,
  user,
  password,
});

export const db = pool.promise();
