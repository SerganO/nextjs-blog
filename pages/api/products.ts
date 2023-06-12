import ProductController from "server/controllers/ProductController";
import container from "server/di/container";

const productController =
  container.resolve<ProductController>("ProductController");

productController.handler("api/products");
