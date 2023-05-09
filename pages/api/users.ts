import { NextApiRequest, NextApiResponse } from 'next'
import { Sequelize } from "sequelize";

export default async (_: NextApiRequest, res: NextApiResponse) => {
    const sequelize = new Sequelize("my_db_dev", "my_db_user", "mydbpass", {
        host: "127.0.0.1",
        dialect: "mysql",
      });
      
      const [results, metadata] = await sequelize.query("SELECT * FROM users");

      if(results.length > 0) {
        res.status(200).json(results)
      } else {
        res.status(404).send({error: "not found"});
      }

      sequelize.close();
}