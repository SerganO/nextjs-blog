import ProductController from "server/controllers/ProductController";
import container from "server/di/container";

const productController =
  container.resolve<ProductController>("ProductController");

export default productController
  .prepare()
  .get(productController.findProductsPaginated)
  .handler();