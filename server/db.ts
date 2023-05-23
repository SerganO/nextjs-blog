import { Sequelize } from "sequelize";
import { env } from "process"
import mysql from "mysql2";


export function createDB() {
    return new Sequelize(process.env.DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        dialect: "mysql"
      });
}