import { NextApiRequest, NextApiResponse } from 'next'
import { Sequelize } from "sequelize";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const id = req.query["id"]
    const sequelize = new Sequelize("my_db_dev", "my_db_user", "mydbpass", {
        host: "127.0.0.1",
        dialect: "mysql",
      });

      
      
      const [results, metadata] = await sequelize.query("SELECT * FROM products WHERE id = " + id);
      
      if(results.length > 0) {
        res.status(200).json(results)
      } else {
        res.status(404).send({error: "not found"});
      }

       sequelize.close();
 
}

