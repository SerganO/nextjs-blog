import { Sequelize } from "sequelize";
import IContextContainer from "./di/interfaces/IContextContainer";
const mysql2 = require("mysql2");

export const createDB = (ctx: IContextContainer) => {
  return new Sequelize(
    ctx.config.db.database,
    ctx.config.db.username,
    ctx.config.db.password,
    {
      dialect: "mysql",
      dialectModule: mysql2,
      /*logging: (sql, queryObject) => {
        console.log("EXEC SQL")
      },*/
    },
    
  );
};