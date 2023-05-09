import { NextApiRequest, NextApiResponse } from 'next'
import { Sequelize } from "sequelize";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const sequelize = new Sequelize("my_db_dev", "my_db_user", "mydbpass", {
        host: "127.0.0.1",
        dialect: "mysql",
      });
      
      const userId = req.query["user"]
      const productId = req.query["product"]

      if(userId) {
        const [results, metadata] = await sequelize.query("SELECT * FROM feedbacks WHERE user_id = " + userId);

        if(results.length > 0) {
          res.status(200).json(results)
        } else {
          res.status(404).send({error: "not found"});
        }
      } else if(productId) {
        const [results, metadata] = await sequelize.query("SELECT * FROM feedbacks WHERE product_id = " + productId);

        if(results.length > 0) {
          res.status(200).json(results)
        } else {
          res.status(404).send({error: "not found"});
        }
      } else {
        const [results, metadata] = await sequelize.query("SELECT * FROM feedbacks");

        if(results.length > 0) {
          res.status(200).json(results)
        } else {
          res.status(404).send({error: "not found"});
        }
      }

      sequelize.close();
}