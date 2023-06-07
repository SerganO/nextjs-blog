import container from "server/di/container";

const productController = container.resolve("ProductController");

export default productController
  .prepare()
  .get(productController.getProductFeedbacksIncludedFirstSet)
  .handler();
