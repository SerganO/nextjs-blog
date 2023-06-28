import ProductController from "server/controllers/ProductController";
import container from "server/di/container";

const productController =
  container.resolve<ProductController>("ProductController");

  /*export default (req, res) => {
    const { id } = req.query;
    res.status(200).json({ id, extendedData: '...' });
  };*/

export default productController.handler("api/products/[id]/extended");
