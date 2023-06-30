import { Sequelize } from "sequelize";
import IContextContainer from "./di/interfaces/IContextContainer";
import { config } from "coreConfig";
import { trace } from "console";
import container from "./di/container";

const mysql2 = require("mysql2");

//const config = container.resolve("config");

/*export function createDB() {
    return new Sequelize(config.db.database,config.db.username, config.db.password, {
        host: config.db.host,
        dialect: "mysql"
      });
}*/

export const createDB = (ctx: IContextContainer) => {
  return new Sequelize(
    ctx.config.db.database,
    ctx.config.db.username,
    ctx.config.db.password,
    {
      dialect: "mysql",
      dialectModule: mysql2,
      logging: (sql, queryObject) => {
        console.log("EXEC SQL")
      },
    },
    
  );
};

/*export const createDB = (ctx: IContextContainer) => {
  console.log("ctx: ", ctx);
  trace();
  return new Sequelize(
    ctx.config.db.database,
    ctx.config.db.username,
    ctx.config.db.password,
    {
      host: ctx.config.db.host,
      dialect: "mysql",
    }
  );
};*/